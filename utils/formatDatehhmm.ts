
export const formatDate = (date: Date): string => {
    const hours = date.getUTCHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const milliseconds = date.getMilliseconds()

    // Combine components
    let timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    // Include seconds and milliseconds if they are greater than zero
    if (seconds > 0 || milliseconds > 0) {
        timeString += `:${String(seconds).padStart(2, '0')}`;
        if (milliseconds > 0) {
            // Convert milliseconds to microseconds (multiply by 1000) and ensure it's 6 digits
            const microseconds = String(Number(milliseconds) * 1000).padStart(6, '0');
            timeString += `.${microseconds.padStart(2, '0')}`;
        }
    }

    return timeString
} 