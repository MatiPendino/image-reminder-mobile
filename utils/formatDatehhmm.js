
export const formatDate = (date) => {
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    // Combine components
    let timeString = `${hours}:${minutes}`;

    // Include seconds and milliseconds if they are greater than zero
    if (seconds > 0 || milliseconds > 0) {
        timeString += `:${seconds}`;
        if (milliseconds > 0) {
        // Convert milliseconds to microseconds (multiply by 1000) and ensure it's 6 digits
        const microseconds = String(Number(milliseconds) * 1000).padStart(6, '0');
        timeString += `.${microseconds}`;
        }
    }

    return timeString
} 