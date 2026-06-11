# Waygood Study Abroad App

A premium, interactive React Native mobile application for exploring pathway programs, universities, and student application journeys. Built with custom animated slide transitions, light and dark themes, interactive visa probability estimation, and a product-style university explorer dashboard.

---

## ✨ Features

- **Premium Educational Dashboard**: Kartik Murali style profile header, filter settings, tag metrics, and search portals.
- **Dynamic Product-Style Cards**: University items displaying flags, dynamic local tuition price tags, overlapping applicant avatars, ratings counts, and interactive tactile micro-animations.
- **Active Pathways Progress**: Visual tracking list of student applications showing statuses and custom completion progress indicators.
- **Modal Slide Transitions**: The details view slides up smoothly from the bottom as an overlay sheet, and slides back down when dismissed, maintaining back button state navigation.
- **Theme Toggling**: Seamless switching between light (default) and dark mode interfaces.
- **Visa Success Calculator**: Calculates approval chances using academic GPA and IELTS scores.

---

## 🛠️ System Prerequisites

Ensure you have the following installed on your machine:

1. **Node.js** (v22.11.0 or higher recommended)
2. **NPM** (packaged with Node.js) or **Yarn**
3. **Java Development Kit (JDK 17)** (required for Android builds)
4. **Android SDK & Studio** (for Android emulator and SDK tools)
5. **macOS with Xcode & CocoaPods** (only if building for iOS)

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install the dependencies from the project root:
```sh
npm install
```

### 2. Start the Metro Bundler
Start the Metro development server in a separate terminal:
```sh
npm start
```

---

## 📱 Running on Android

### A. Using the Android Emulator
1. Open Android Studio and launch your virtual device (AVD Manager).
2. Run the build command in the project root:
   ```sh
   npm run android
   ```

### B. Using a Physical Android Device (Wireless Debugging via Wi-Fi)
Useful for testing physical device behaviors directly.
1. Connect your laptop and phone to the **same Wi-Fi network** (e.g., your phone's personal hotspot).
2. On your phone, enable **Developer Options** and turn on **Wireless Debugging**.
3. Under Wireless Debugging, tap **Pair device with pairing code**. Note the IP, Port, and Pairing Code.
4. From your laptop terminal, run:
   ```sh
   adb pair <IP>:<PORT> <PAIRING_CODE>
   ```
5. Go back to Wireless Debugging on your phone, find the device port, and connect:
   ```sh
   adb connect <IP>:<DEVICE_PORT>
   ```
6. Verify connection via `adb devices`.
7. Configure the device to fetch bundle from Metro:
   - Shake the phone or run `adb shell input keyevent 82` to open the Developer Menu.
   - Go to **Settings** -> **Debug server host & port for device** and enter `<YOUR_LAPTOP_IP>:8081`.
   - Reload the app.

---

## 🍏 Running on iOS (macOS only)

### A. Install CocoaPods Dependencies
```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

### B. Launching the Simulator
Run the iOS build command:
```sh
npm run ios
```

### C. Running on Physical iOS Device
1. Open the project folder `ios/WaygoodApp.xcworkspace` in **Xcode**.
2. Select your team under **Signing & Capabilities** to configure code signing.
3. Select your connected iPhone from the scheme selector and click **Run** (Play button).

---

## 🔧 Troubleshooting & Performance Tips

### 1. Metro File Watcher Crash (Windows)
If Metro crashes with `ENOENT` while watching native directory builds, the project contains ignore rules in `metro.config.js` to bypass `android/` and `ios/` folders:
```javascript
resolver: {
  blockList: [
    /.*\/android\/.*/,
    /.*\\android\\.*/,
    /.*\/ios\/.*/,
    /.*\\ios\\.*/
  ]
}
```

### 2. Gradle Path Trailing Spaces (Windows)
When declaring Gradle environment variables in PowerShell or CMD, avoid trailing spaces:
* **Incorrect**: `set ANDROID_HOME=C:\Android\Sdk ` (appends trailing space, causing Gradle execution to fail).
* **Correct**: `set ANDROID_HOME=C:\Android\Sdk`

### 3. Windows Firewall Blocks
If your physical Android device fails to load the bundle over Wi-Fi, ensure your laptop Wi-Fi profile is set to **Private**, or allow incoming port `8081` access in your firewall settings.
