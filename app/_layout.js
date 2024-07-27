import { useState, useEffect } from "react";
import { Slot } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { getDeviceId } from "../utils/getDeviceId";

export default function Layout () {

    // Get the unique device ID
    useEffect(() => {
        const getAlarms = async () => {
            try {
                const id = await getDeviceId();
                const response = await axios.get('http://127.0.0.1:8000/alarms/', {
                    headers: {
                        'Device-ID': id
                    }
                })
                console.log(response)
                console.log("wfe")
            } catch (err) {
                console.log(err)
            }
        }

        getAlarms()
    }, [])

    return (
        <ToastProvider>
            <Slot />
            <StatusBar style="dark" />
        </ToastProvider>
    )
}