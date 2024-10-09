import { useEffect } from "react";
import { useState } from "react";

export default (value, delay) => {
    // state and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        // cancle the timeout if value changes (also on delay change or unmount
        // this is how we prevent debounced value from updating if value is changed within the delay period. timeout gets cleared and restarted.
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};
