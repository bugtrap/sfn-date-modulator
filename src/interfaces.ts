type DurationComplex = Partial<{
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    months: number;
    years: number;
    weeks: number;
}>;

type DurationSeconds = number;

// ex: "2 days"
type DurationStringFormat = string;

export type Duration = DurationComplex | DurationSeconds | DurationStringFormat;

export type FormattedDateString = string;

export interface ExpressionProps {
    duration?: Duration;
    // @see https://day.js.org/docs/en/display/format
    format?: string;
    timezone?: string;
}

export interface TaskEvent {
    date: string;
    timezone?: string;
    expressions: {
        [outputKey: string]: ExpressionProps;
    };
}

export interface TaskResult {
    [outputKey: string]: FormattedDateString;
}

export type TaskHandler = (event: TaskEvent) => Promise<TaskResult>;
