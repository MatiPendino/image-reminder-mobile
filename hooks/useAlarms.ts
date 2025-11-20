import { useQuery } from "@tanstack/react-query";
import { AlarmProps } from "../types";
import { fetchAlarms } from "../services/alarmsService";

export const useAlarms = () => {
    return useQuery<AlarmProps[], Error>({
        queryKey: ["alarms"],
        queryFn: fetchAlarms
    });
};