# Smart IoT Raspberry Pi Mobile App 🌱💧

A React Native mobile application built with Expo that connects to your Raspberry Pi IoT system for smart home automation. Control your SwitchBot devices, monitor plant watering systems, and manage your IoT devices remotely.

![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.79.5-61dafb)
![Expo](https://img.shields.io/badge/Expo-~53.0.20-000020)
![TypeScript](https://img.shields.io/badge/TypeScript-~5.8.3-3178c6)

## 🚀 Features

### 🌱 Plant Care System
- **Smart Watering**: Control SwitchBot pumps with customizable timer duration (1-60 seconds)
- **Real-time Feedback**: Instant success/error notifications with device status
- **Safety Controls**: Built-in duration limits and validation for safe operation

### 📱 Mobile Interface
- **Dark Mode UI**: Modern iOS-inspired dark theme design
- **Intuitive Navigation**: Bottom tab navigation between Home and Settings
- **Responsive Design**: Optimized for iPhone and Android devices
- **Loading States**: Visual feedback during API requests

### 🔗 API Integration
- **Health Monitoring**: Real-time API health checks with `/health` endpoint
- **Secure Authentication**: API key-based authorization
- **Error Handling**: Comprehensive error management and user feedback
- **Network Resilience**: Automatic redirect handling and timeout management

### ⚙️ Settings Management
- **Persistent Storage**: App preferences saved locally with AsyncStorage
- **Connection Testing**: Built-in API health check functionality
- **Configuration**: Easy setup for different environments

## 📁 Project Structure

```
smartpi-mobile/
├── src/
│   ├── components/           # Reusable UI components
│   ├── config/
│   │   └── api.ts           # API configuration and client setup
│   ├── screens/
│   │   ├── HomeScreen.tsx   # Main plant watering interface
│   │   └── SettingsScreen.tsx # App settings and API testing
│   └── services/
│       └── api.ts           # API service layer with typed responses
├── App.tsx                  # Root component with navigation
├── package.json            # Dependencies and scripts
├── app.json               # Expo configuration
└── CLAUDE.md             # AI assistant guidance
```

## 🛠️ Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v7 (Bottom Tabs)
- **HTTP Client**: Axios for API requests
- **Storage**: AsyncStorage for persistent data
- **Styling**: React Native StyleSheet (iOS Dark Mode theme)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator or Android Emulator (optional)
- Expo Go app on your mobile device

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smartpi-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_API_URL=http://your-raspberry-pi-ip:8000
   EXPO_PUBLIC_API_KEY=your-api-key-here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device**
   - Scan the QR code with Expo Go app
   - Or run `npm run ios` / `npm run android` for simulators

## 🔧 Configuration

### API Configuration

The app connects to your Raspberry Pi API server. Update the configuration in `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.EXPO_PUBLIC_API_KEY,
  },
};
```

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `EXPO_PUBLIC_API_URL` | Your Raspberry Pi API base URL | `http://iot.takatoshiwada.com:8000` |
| `EXPO_PUBLIC_API_KEY` | API authentication key | `3db6c2fbe69e4b8d8e59d707f8aee25e...` |

## 📡 API Endpoints

The app expects your Raspberry Pi server to provide these endpoints:

### Health Check
```http
GET /api/health/
Authorization: {API_KEY}
```
**Response:**
```json
{
  "status": "ok"
}
```

### Water Plants
```http
POST /api/switchbot/turn-on-timer
Content-Type: application/json
Authorization: {API_KEY}

{
  "device_name": "pump",
  "timer_seconds": 2
}
```
**Response:**
```json
{
  "status": "success",
  "message": "Watering started successfully",
  "device_id": "device123",
  "device_name": "pump",
  "timer_seconds": 2
}
```

## 🎨 UI Design

The app features a modern dark mode interface inspired by iOS design principles:

- **Color Scheme**: Dark backgrounds (#000, #111) with accent colors
- **Typography**: San Francisco-style system fonts
- **Components**: Rounded corners, subtle shadows, and smooth animations
- **Icons**: Emoji-based icons for universal recognition

### Key UI Elements

- **Plant Care Interface**: Large, prominent watering button with visual feedback
- **Duration Input**: Number input with validation and safety limits
- **Status Cards**: Information display with device status and timer info
- **Settings Panel**: Clean, organized configuration interface

## 🔒 Security

- **API Key Authentication**: Secure authorization for all requests
- **Input Validation**: Client-side validation for duration limits
- **Error Handling**: Safe error reporting without exposing sensitive data
- **Network Security**: HTTPS support and proper header management

## 🧪 Testing

Test the API connection using the built-in health check:

1. Open the **Settings** tab
2. Tap **"Test API Health"** 
3. Verify successful connection to your Raspberry Pi

## 🚀 Deployment

### Development
```bash
npm start
```

### Production Build
```bash
expo build:android  # For Android APK
expo build:ios      # For iOS (requires Apple Developer account)
```

### EAS Build (Recommended)
```bash
npx eas build --platform all
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/) for rapid mobile development
- Designed for [Raspberry Pi](https://www.raspberrypi.org/) IoT systems
- Integrates with [SwitchBot](https://www.switchbot.jp/) smart devices

## 📞 Support

If you have questions or need help:

1. Check the **Settings > Test API Health** feature first
2. Verify your environment variables are correctly set
3. Ensure your Raspberry Pi server is running and accessible
4. Check the console logs for detailed error messages

---

**Made with ❤️ for Smart IoT automation**