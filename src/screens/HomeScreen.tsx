import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { apiClient } from "../config/api";
import type { WaterPlantsResponse } from "../services/api";

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [timerDuration, setTimerDuration] = useState("2");

  const handleWaterPlants = async (timer_seconds: number) => {
    setLoading(true);
    try {
      const response = await apiClient.waterPlants(timer_seconds);

      if (response.success && response.data) {
        const { message, device_name, timer_seconds }: WaterPlantsResponse =
          response.data;
        Alert.alert(
          "Success! 🌱💧",
          `${message}\n\nDevice: ${device_name}\nDuration: ${timer_seconds} seconds`
        );
      } else {
        Alert.alert("Error", response.error || "Failed to water plants");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to connect to the watering system");
    } finally {
      setLoading(false);
    }
  };

  const onWaterPress = () => {
    const duration = parseInt(timerDuration);
    if (isNaN(duration) || duration <= 0) {
      Alert.alert(
        "Invalid Duration",
        "Please enter a valid number of seconds (greater than 0)"
      );
      return;
    }
    if (duration > 60) {
      Alert.alert(
        "Duration Too Long",
        "Please enter a duration of 60 seconds or less for safety"
      );
      return;
    }
    handleWaterPlants(duration);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Smart IoT</Text>
        <Text style={styles.subtitle}>API request for Raspberry Pi</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🌱</Text>
          <Text style={styles.sectionTitle}>Plant Care</Text>
        </View>

        <View style={styles.durationContainer}>
          <Text style={styles.durationLabel}>Watering Duration (seconds)</Text>
          <TextInput
            style={styles.durationInput}
            value={timerDuration}
            onChangeText={setTimerDuration}
            placeholder="Enter seconds"
            placeholderTextColor="#666"
            keyboardType="numeric"
            maxLength={2}
          />
        </View>

        <TouchableOpacity
          style={[styles.waterButton, loading && styles.waterButtonLoading]}
          onPress={onWaterPress}
          activeOpacity={0.7}
          disabled={loading}
        >
          <View style={styles.waterButtonContent}>
            <Text style={styles.waterIcon}>💧</Text>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.waterButtonText}>Water Plants</Text>
            )}
          </View>
          <Text style={styles.waterButtonSubtext}>
            {loading
              ? "Watering plants..."
              : `Tap to water for ${timerDuration} seconds`}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>⏱️</Text>
          <Text style={styles.infoTitle}>Duration</Text>
          <Text style={styles.infoValue}>{timerDuration} seconds</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>🔧</Text>
          <Text style={styles.infoTitle}>Device</Text>
          <Text style={styles.infoValue}>SwitchBot Pump</Text>
        </View>
      </View>

      <View style={styles.bottomPadding} />
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
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
    marginBottom: 16,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    flex: 1,
  },
  durationContainer: {
    marginBottom: 20,
  },
  durationLabel: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  durationInput: {
    backgroundColor: "#111",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#222",
  },
  waterButton: {
    backgroundColor: "#34C759",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(52, 199, 89, 0.3)",
    shadowColor: "#34C759",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  waterButtonLoading: {
    backgroundColor: "rgba(52, 199, 89, 0.7)",
  },
  waterButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  waterIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  waterButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  waterButtonSubtext: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    textAlign: "center",
  },
  infoSection: {
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    width: "48%",
    borderWidth: 1,
    borderColor: "#222",
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  bottomPadding: {
    height: 40,
  },
});
