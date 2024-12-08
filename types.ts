export type URL = string

export interface Weekday {
    full: string
    abbreviation: string
}

export interface AlarmProps {
    title: string
    time: string
    weekdays: Weekday[]
    image: URL
    id: number
    alarm_user: number
}