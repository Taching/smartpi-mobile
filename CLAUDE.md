# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo React Native mobile app to control a Raspberry Pi voice automation system via API. The app supports SwitchBot integration, IR device control, and real-time smart home control functionality.

## Architecture

- **Framework**: Expo React Native with TypeScript
- **Navigation**: React Navigation with bottom tabs (Home, Devices, Settings)
- **API Client**: Axios-based service in `src/services/api.ts`
- **State Management**: Local state with AsyncStorage for settings
- **Screens**: 
  - HomeScreen: Dashboard with device overview and system info
  - DevicesScreen: Detailed device control with custom commands
  - SettingsScreen: Configuration for Pi connection and app preferences

## Development Commands

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web

# Install dependencies
npm install

# Reset Metro bundler cache
npx expo start --clear
```

## API Integration

The app expects a Raspberry Pi API server with these endpoints:
- `GET /api/devices` - List all devices
- `GET /api/device/{id}/status` - Get device status
- `POST /api/device/command` - Send device command
- `POST /api/ir/send` - Send IR command
- `POST /api/switchbot/command` - Send SwitchBot command
- `GET /api/system/info` - Get Pi system information

Configure the Pi IP address in the Settings screen or update `src/config/api.ts`.

## Key Features

- Real-time device status monitoring
- Support for SwitchBot, IR, and GPIO devices
- Custom command interface for advanced control
- Connection testing and configuration
- Persistent settings storage