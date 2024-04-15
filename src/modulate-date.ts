import dayjs from "./dayjs-extras";
import { ExpressionProps } from "./interfaces";
import { parseDuration } from "./parse-duration";

const DEFAULT_FORMAT = "ISO8601";

export const modulateDate = (date: Date, props: ExpressionProps): string => {
    const baseDay = dayjs(date);

    // Modulate the date
    const duration = parseDuration(props.duration);
    const day = duration ? baseDay.add(duration) : baseDay;

    // Format the date
    const format = props.format || DEFAULT_FORMAT;

    // ISO 8601 format
    if (format === DEFAULT_FORMAT) {
        return day.toISOString();
    }

    const timezone = props.timezone || "UTC";

    return day.tz(timezone).format(format);
};
