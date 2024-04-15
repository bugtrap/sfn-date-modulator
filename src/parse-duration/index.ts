import dayjs from "../dayjs-extras";
import { Duration } from "../interfaces";
import { parseStringFormat } from "./parse-string-format";

export const parseDuration = (duration?: Duration) => {
    if (duration === undefined || duration === null) {
        return;
    }

    if (typeof duration === "object") {
        // transform the object into a dayjs duration
        return dayjs.duration({
            milliseconds: duration.milliseconds,
            seconds: duration.seconds,
            minutes: duration.minutes,
            hours: duration.hours,
            days: duration.days,
            months: duration.months,
            years: duration.years,
            weeks: duration.weeks,
        });
    }

    // duration is a number, it is seconds
    if (typeof duration === "number") {
        return dayjs.duration({
            seconds: duration,
        });
    }

    // duration is a string, it is a human-readable duration. ex: '2 days'
    if (typeof duration === "string") {
        const args = parseStringFormat(duration);
        return dayjs.duration(args.time, args.unit);
    }

    throw new Error("Invalid duration");
};
