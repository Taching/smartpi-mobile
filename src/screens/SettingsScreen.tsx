import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "../config/api";

interface Settings {
  enableNotifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
}

const DEFAULT_SETTINGS: Settings = {
  enableNotifications: true,
  autoRefresh: true,
  refreshInterval: 30,
};

export default function SettingsScreen() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem("app_settings");
      if (savedSettings) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem("app_settings", JSON.stringify(settings));
      Alert.alert("Success", "Settings saved successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to save settings");
    }
    setLoading(false);
  };

  const resetSettings = () => {
    Alert.alert(
      "Reset Settings",
      "Are you sure you want to reset all settings to default?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => setSettings(DEFAULT_SETTINGS),
        },
      ]
    );
  };

  const updateSetting = (key: keyof Settings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const testApiHealth = async () => {
    setLoading(true);
    try {
      const response = await apiClient.healthCheck();
      
      if (response.success) {
        Alert.alert("✅ API Health Check", "Connection successful! Your Raspberry Pi API is responding.", [
          { text: "OK" }
        ]);
      } else {
        Alert.alert("❌ API Health Check", `Connection failed: ${response.error || "Unknown error"}`, [
          { text: "OK" }
        ]);
      }
    } catch (error: any) {
      Alert.alert("❌ API Health Check", `Network error: ${error.message || "Failed to connect"}`, [
        { text: "OK" }
      ]);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure your Smart Pi Mobile app</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>⚙️</Text>
          <Text style={styles.sectionTitle}>App Preferences</Text>
        </View>

        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={styles.switchLabel}>Push Notifications</Text>
            <Text style={styles.switchDescription}>
              Get notified about device status changes
            </Text>
          </View>
          <Switch
            value={settings.enableNotifications}
            onValueChange={(value) =>
              updateSetting("enableNotifications", value)
            }
            trackColor={{ false: "#333", true: "#007AFF" }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={styles.switchLabel}>Auto Refresh</Text>
            <Text style={styles.switchDescription}>
              Automatically refresh device data
            </Text>
          </View>
          <Switch
            value={settings.autoRefresh}
            onValueChange={(value) => updateSetting("autoRefresh", value)}
            trackColor={{ false: "#333", true: "#007AFF" }}
            thumbColor="#fff"
          />
        </View>

        {settings.autoRefresh && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Refresh Interval</Text>
            <TextInput
              style={styles.textInput}
              value={settings.refreshInterval.toString()}
              onChangeText={(value) =>
                updateSetting("refreshInterval", parseInt(value) || 30)
              }
              placeholder="30"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
            <Text style={styles.helperText}>
              How often to refresh data (in seconds)
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🔗</Text>
          <Text style={styles.sectionTitle}>API Connection</Text>
        </View>

        <TouchableOpacity
          style={[styles.healthCheckButton, loading && styles.disabledButton]}
          onPress={testApiHealth}
          disabled={loading}
          activeOpacity={0.7}
        >
          <Text style={styles.healthCheckIcon}>🏥</Text>
          <View style={styles.healthCheckContent}>
            <Text style={styles.healthCheckText}>
              {loading ? "Testing API Health..." : "Test API Health"}
            </Text>
            <Text style={styles.healthCheckSubtext}>
              Check connection to /health endpoint
            </Text>
          </View>
          <Text style={styles.healthCheckArrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>ℹ️</Text>
          <Text style={styles.sectionTitle}>About</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Device</Text>
          <Text style={styles.infoValue}>iPhone 15 Pro</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Theme</Text>
          <Text style={styles.infoValue}>Dark Mode</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.saveButton,
            loading && styles.disabledButton,
          ]}
          onPress={saveSettings}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>💾 Save Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.resetButton]}
          onPress={resetSettings}
        >
          <Text style={styles.resetButtonText}>🔄 Reset to Default</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Smart Pi Mobile v1.0.0</Text>
        <Text style={styles.footerText}>Designed for iPhone 15 Pro</Text>
        <Text style={styles.footerSubtext}>
          Modern iOS Dark Mode Experience
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#111",
    padding: 24,
    paddingTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 17,
    color: "#888",
  },
  section: {
    backgroundColor: "#111",
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingBottom: 16,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  inputGroup: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
    fontWeight: "500",
  },
  textInput: {
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  helperText: {
    fontSize: 13,
    color: "#666",
    fontStyle: "italic",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#222",
  },
  switchInfo: {
    flex: 1,
    marginRight: 16,
  },
  switchLabel: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    marginBottom: 2,
  },
  switchDescription: {
    fontSize: 13,
    color: "#666",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#222",
  },
  infoLabel: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  actionButtons: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  actionButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#34C759",
  },
  resetButton: {
    backgroundColor: "#FF3B30",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#333",
    opacity: 0.6,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 2,
  },
  footerSubtext: {
    fontSize: 12,
    color: "#444",
    textAlign: "center",
    marginTop: 4,
  },
  healthCheckButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  healthCheckIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  healthCheckContent: {
    flex: 1,
  },
  healthCheckText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    marginBottom: 2,
  },
  healthCheckSubtext: {
    fontSize: 13,
    color: "#666",
  },
  healthCheckArrow: {
    fontSize: 20,
    color: "#666",
    fontWeight: "300",
  },
});
