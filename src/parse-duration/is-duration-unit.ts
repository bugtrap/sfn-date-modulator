import { DurationUnitType } from "dayjs/plugin/duration";

const SUPPORT_UNITS: DurationUnitType[] = [
    "millisecond",
    "milliseconds",
    "second",
    "seconds",
    "minute",
    "minutes",
    "hour",
    "hours",
    "day",
    "days",
    "week",
    "weeks",
    "month",
    "months",
    "year",
    "years",
];

export const isDurationUnit = (unit: string): unit is DurationUnitType => {
    return SUPPORT_UNITS.includes(unit as DurationUnitType);
};
