import { ToastProvider } from "react-native-toast-notifications";
import mobileAds from "react-native-google-mobile-ads"
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import * as Sentry from "@sentry/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

Sentry.init({
  dsn: `https://${process.env.SENTRY_URL}.ingest.us.sentry.io/${process.env.SENTRY_KEY}`,
  sendDefaultPii: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],
});

const queryClient: QueryClient = new QueryClient();

export default function Layout() {
    try {
        mobileAds().initialize();
    } catch (error) {
        Sentry.captureException(error);
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <Slot />
                <StatusBar style="dark" />
            </ToastProvider>    
        </QueryClientProvider>
    )
}