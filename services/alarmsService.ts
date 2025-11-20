import * as Sentry from "@sentry/react-native";
import { AlarmProps, Weekday } from "../types";
import { getDeviceId } from "../utils/getDeviceId";
import { handleError } from "../utils/handleError";
import api from "./api";

export const postAlarm = async (
    title: string, weekdays: Weekday[], timeStr: string, imageUri: string, alarm?: AlarmProps
) => {
    try {
        const id: string = await getDeviceId()
        const formData: FormData = new FormData()
        formData.append("title", title)
        formData.append("weekdays", JSON.stringify(weekdays))
        formData.append("time", timeStr)
        const imageFile = {
            uri: imageUri,
            name: imageUri.split("/").pop(),
            type: "image/jpeg", 
        }
        // @ts-ignore
        formData.append("image", imageFile)

        // If no alarm is retrieved from the params, create a new one
        if (!alarm) {
            const response = await api.post("/alarms/alarm/", 
                formData, 
                {
                    headers: {
                        "Device-ID": id,
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            return response
        } else {
            const response = await api.put(`/alarms/alarm/${alarm.id}/`, 
                formData, 
                {
                    headers: {
                        "Device-ID": id,
                        "Content-Type": "multipart/form-data"
                    }
                }
            ) 
            return response
        }
    } catch (err) {
        throw new Error(err)
    }
}

export const fetchAlarms = async (): Promise<AlarmProps[]> => {
    try {
        const id: string = await getDeviceId();
        const response = await api.get("/alarms/alarm/", {
            headers: {
                "Device-ID": id
            }
        });
        
        const data = response.data
        return data
    } catch (err) {
        Sentry.captureException(err);
        handleError(err, "Failed to fetch alarms");
    } 
}