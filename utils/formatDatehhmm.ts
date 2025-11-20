
export const formatDate = (date: Date): string => {
    const hours: number = date.getUTCHours()
    const minutes: number = date.getMinutes()
    const seconds: number = date.getSeconds()
    const milliseconds: number = date.getMilliseconds()

    // Combine components
    let time: string = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    // Include seconds and milliseconds if they are greater than zero
    if (seconds > 0 || milliseconds > 0) {
        time += `:${String(seconds).padStart(2, "0")}`;
        if (milliseconds > 0) {
            // Convert milliseconds to microseconds (multiply by 1000) and ensure it is 6 digits
            const microseconds = String(Number(milliseconds) * 1000).padStart(6, "0");
            time += `.${microseconds.padStart(2, "0")}`;
        }
    }

    return time
} 