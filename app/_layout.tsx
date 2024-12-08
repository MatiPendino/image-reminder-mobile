import { Slot } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import { StatusBar } from "expo-status-bar";
import mobileAds from 'react-native-google-mobile-ads'

export default function Layout () {
    mobileAds()
        .initialize()
        .then(adapterStatuses => {
            console.log("Initialization complete!")
        });

    return (
        <ToastProvider>
            <Slot />
            <StatusBar style="dark" />
        </ToastProvider>
    )
}