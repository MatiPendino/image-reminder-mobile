// Converts the time retrieved from the server to local time
export const getLocalTimeStr = (alarmTime: string): string => {
    const date = new Date();
    const hoursServer: string = alarmTime.substring(0, 2);
    const minutesServer: string = alarmTime.substring(3, 5);

    const localHours: number = Number(hoursServer) - (date.getTimezoneOffset() / 60);
    date.setHours(localHours);
    date.setMinutes(Number(minutesServer));

    const hours: string = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours().toString();
    const minutes: string = (
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes().toString()
    );
    
    return `${hours}:${minutes}`;
}