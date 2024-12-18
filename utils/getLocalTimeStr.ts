// Converts the time retrieved from the server to local time
export const getLocalTimeStr = (alarmTime: string): string => {
    const date = new Date()
    const hours = alarmTime.substring(0, 2)
    const minutes = alarmTime.substring(3, 5)
    const localHours = Number(hours) - (date.getTimezoneOffset() / 60)
    date.setHours(localHours)
    date.setMinutes(Number(minutes))

    return `${date.getHours()}:${date.getMinutes()}`
}