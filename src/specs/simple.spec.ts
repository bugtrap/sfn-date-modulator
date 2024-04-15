import { describe, expect, it } from "vitest";
import { handler } from "..";
import { TaskEvent } from "../interfaces";

describe("simple pattern", () => {
    const ISO8601_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    it("date NOW", async () => {
        // Arrange
        const event = {
            date: "NOW",
            expressions: {
                out0: {},
            },
        };

        // Act
        const result = await handler(event);

        // Assert
        expect(result).toEqual({
            out0: expect.stringMatching(ISO8601_PATTERN),
        });
    });

    it("format convert", async () => {
        // Arrange
        const event = {
            date: "2024-01-02T12:34:56.123Z",
            expressions: {
                out0: {
                    format: "YYYY/MM/DD",
                },
            },
        };

        // Act
        const result = await handler(event);

        // Assert
        expect(result).toEqual({
            out0: "2024/01/02",
        });
    });
});

describe("Invalid pattern", () => {
    const asTaskEvent = (event: unknown): TaskEvent => event as TaskEvent;

    it("Invalid date 1", async () => {
        // Arrange
        const event = asTaskEvent({
            date: "invalid",
            expressions: {
                out0: {},
            },
        });

        // Act & Assert
        await expect(handler(event)).rejects.toThrow("Invalid date parameter");
    });

    it("Invalid date 2", async () => {
        // Arrange
        const event = asTaskEvent({
            date: "",
            expressions: {
                out0: {},
            },
        });

        // Act & Assert
        await expect(handler(event)).rejects.toThrow("Invalid date parameter");
    });

    it("Invalid date 3", async () => {
        // Arrange
        // Epoch time is invalid now.
        const event = asTaskEvent({
            date: 1704198896123,
            expressions: {
                out0: {},
            },
        });

        // Act & Assert
        await expect(handler(event)).rejects.toThrow("Invalid date parameter");
    });

    it("Invalid expressions 1", async () => {
        // Arrange
        const event = asTaskEvent({
            date: "2024-01-02T12:34:56.123Z",
            expressions: undefined,
        });

        // Act & Assert
        await expect(handler(event)).rejects.toThrow("Invalid expressions parameter");
    });

    it("Invalid expressions 2", async () => {
        // Arrange
        const event = asTaskEvent({
            date: "2024-01-02T12:34:56.123Z",
            expressions: null,
        });

        // Act & Assert
        await expect(handler(event)).rejects.toThrow("Invalid expressions parameter");
    });

    it("Invalid expressions 3", async () => {
        // Arrange
        const event = asTaskEvent({
            date: "2024-01-02T12:34:56.123Z",
            expressions: [],
        });

        // Act & Assert
        await expect(handler(event)).rejects.toThrow("Invalid expressions parameter");
    });
});
