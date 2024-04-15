import { describe, expect, it } from "vitest";
import { handler } from "..";

describe("format specification", () => {
    const TEST_DATE = "2024-01-02T12:34:56.123Z";

    it("default", async () => {
        const result = await handler({
            date: TEST_DATE,
            expressions: {
                output: {},
            },
        });
        expect(result.output).toEqual("2024-01-02T12:34:56.123Z");
    });

    it("YYYY-DD-MM", async () => {
        const result = await handler({
            date: TEST_DATE,
            expressions: {
                output: {
                    format: "YYYY-DD-MM",
                },
            },
        });
        expect(result.output).toEqual("2024-02-01");
    });

    it("HH:mm", async () => {
        const result = await handler({
            date: TEST_DATE,
            expressions: {
                output: {
                    format: "HH:mm",
                },
            },
        });
        expect(result.output).toEqual("12:34");
    });

    it("separate date and time", async () => {
        const result = await handler({
            date: TEST_DATE,
            expressions: {
                date: {
                    format: "YYYY-MM-DD",
                },
                time: {
                    format: "HH:mm:ss",
                },
            },
        });
        expect(result.date).toEqual("2024-01-02");
        expect(result.time).toEqual("12:34:56");
    });
});
