import { describe, expect, it } from "vitest";
import { handler } from "..";

describe("timezone", () => {
    it("convert from UTC to local", async () => {
        // Arrange
        const event = {
            date: "2024-01-02T00:00:00.000Z",
            expressions: {
                out0: {
                    format: "YYYY-MM-DD HH:mm:ss",
                    timezone: "Asia/Tokyo",
                },
            },
        };

        // Act
        const result = await handler(event);

        // Assert
        expect(result).toEqual({
            out0: "2024-01-02 09:00:00",
        });
    });

    it("convert from local to UTC", async () => {
        // Arrange
        const event = {
            date: "2024-01-02 09:00:00",
            timezone: "Asia/Tokyo",
            expressions: {
                out0: {
                    timezone: "UTC",
                },
            },
        };

        // Act
        const result = await handler(event);

        // Assert
        expect(result).toEqual({
            out0: "2024-01-02T00:00:00.000Z",
        });
    });

    it("convert from local to another local", async () => {
        // Arrange
        const event = {
            date: "2024-01-02 00:00:00",
            // UTC+9
            timezone: "Asia/Tokyo",
            expressions: {
                out0: {
                    format: "YYYY-MM-DD HH:mm:ss",
                    // UTC-5
                    timezone: "America/New_York",
                },
            },
        };

        // Act
        const result = await handler(event);

        // Assert
        // Difference between Tokyo and New York is 14 hours
        expect(result).toEqual({
            out0: "2024-01-01 10:00:00",
        });
    });
});
