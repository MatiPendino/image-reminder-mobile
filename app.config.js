export default {
  expo: {
    name: 'image-reminder-mobile',
    slug: 'photo-reminder',
    scheme: 'com.image-reminder-mobile.image-reminder-mobile',
    version: '1.0.3',
    orientation: 'portrait',
    notification: {
      icon: './assets/img/favicon.png',
      color: '#ffffff',
      iosDisplayInForeground: true,
      androidMode: 'default',
      androidCollapsedTitle: '#{unread_notifications} new notifications',
    },
    icon: './assets/img/favicon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/img/adaptive-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#cfedf7',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.image-reminder-mobile.image-reminder-mobile',
      infoPlist: {
        NSPhotoLibraryUsageDescription: 'This app requires access to your photo library to select and save photos.',
        NSCameraUsageDescription: 'This app requires access to your camera to take photos.',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/img/adaptive-icon.png',
        backgroundColor: '#cfedf7',
      },
      permissions: [
        'READ_EXTERNAL_STORAGE',
        'WRITE_EXTERNAL_STORAGE',
        'CAMERA',
        'POST_NOTIFICATIONS',
        'INTERNET', 
        'ACCESS_NETWORK_STATE',
      ],
      googleServicesFile: './google-services.json',
      package: 'com.matipendino2001.imagereminder',
      versionCode: 7,
      manifestPlaceholders: {
        googleMobileAdsDelayAppMeasurementInit: true,
      },
    },
    web: {
      favicon: './assets/img/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'react-native-google-mobile-ads',
        {
          androidAppId: process.env.admobId,
          iosAppId: process.env.admobId,
        },
      ],
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ],
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: process.env.expoProjectId,
      },
    },
    owner: 'matipendino2001',
  },
};
