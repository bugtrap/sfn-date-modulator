import { DurationUnitType } from "dayjs/plugin/duration";
import { isDurationUnit } from "./is-duration-unit";

export const parseStringFormat = (duration: string): { time: number; unit: DurationUnitType } => {
    const params = duration.split(" ");

    if (params.length !== 2) {
        throw new Error("Invalid duration format [number unit]");
    }

    const [value, unit] = params;

    if (!isDurationUnit(unit)) {
        throw new Error("Invalid duration unit");
    }

    const time = parseInt(value, 10);
    if (Number.isNaN(time)) {
        throw new Error("Invalid duration number");
    }

    return {
        time,
        unit,
    };
};
