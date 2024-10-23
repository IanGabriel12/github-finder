import { useEffect } from "react";

const DEBOUNCE_TIME_IN_MS = 500;

export function useDebounce(action: () => any, value: any) {
    let timeout : number;

    useEffect(() => {
        clearTimeout(timeout);
        timeout = setTimeout(action, DEBOUNCE_TIME_IN_MS);
        return () => clearTimeout(timeout);
    }, [value])
}