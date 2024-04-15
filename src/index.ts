import dayjs from "./dayjs-extras";
import { TaskHandler, TaskResult } from "./interfaces";
import { modulateDate } from "./modulate-date";

export const handler: TaskHandler = async (event) => {
    const timezone = event.timezone || "UTC";

    if (typeof event.date !== "string" || event.date === "") {
        throw new Error("Invalid date parameter");
    }

    const date = event.date === "NOW" ? dayjs() : dayjs(event.date, timezone);

    if (!date.isValid()) {
        throw new Error("Invalid date parameter");
    }

    const baseDate = date.toDate();

    if (typeof event.expressions !== "object" || event.expressions === null || Array.isArray(event.expressions)) {
        throw new Error("Invalid expressions parameter");
    }

    const payload: TaskResult = {};
    for (const key in event.expressions) {
        payload[key] = modulateDate(baseDate, event.expressions[key]);
    }

    return payload;
};
