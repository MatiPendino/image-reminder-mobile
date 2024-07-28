import { Slot } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import { StatusBar } from "expo-status-bar";

export default function Layout () {
    return (
        <ToastProvider>
            <Slot />
            <StatusBar style="dark" />
        </ToastProvider>
    )
}