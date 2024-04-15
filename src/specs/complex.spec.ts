import { describe, expect, it } from "vitest";
import { handler } from "..";

describe("task handle", () => {
    it("complex calculate", async () => {
        // Arrange
        const event = {
            date: "2024-01-02T12:34:56.123Z",
            expressions: {
                out0: {},
                out1: {
                    duration: "1 day",
                },
                out2: {
                    duration: {
                        months: 1,
                        days: 27,
                    },
                },
                out3: {
                    duration: 60,
                },
            },
        };

        // Act
        const result = await handler(event);

        // Assert
        expect(result).toEqual({
            out0: "2024-01-02T12:34:56.123Z",
            out1: "2024-01-03T12:34:56.123Z",
            out2: "2024-02-29T12:34:56.123Z", // Leap year !
            out3: "2024-01-02T12:35:56.123Z",
        });
    });

    it("complex negative calculate", async () => {
        // Arrange
        const event = {
            date: "2024-01-02T12:34:56.123Z",
            expressions: {
                out0: {},
                out1: {
                    duration: "-1 day",
                },
                out2: {
                    duration: {
                        months: -1,
                        days: -2,
                    },
                },
                out3: {
                    // 60 seconds before
                    duration: -60,
                },
            },
        };

        // Act
        const result = await handler(event);

        // Assert
        expect(result).toEqual({
            out0: "2024-01-02T12:34:56.123Z",
            out1: "2024-01-01T12:34:56.123Z",
            out2: "2023-11-30T12:34:56.123Z",
            out3: "2024-01-02T12:33:56.123Z",
        });
    });
});
