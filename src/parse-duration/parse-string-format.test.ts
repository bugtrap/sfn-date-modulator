import { describe, expect, it } from "vitest";
import { parseStringFormat } from "./parse-string-format";

describe("parseStringFormat", () => {
    it("should parse string format", () => {
        // Arrange
        const duration = "1 day";

        // Act
        const result = parseStringFormat(duration);

        // Assert
        expect(result).toEqual({
            time: 1,
            unit: "day",
        });
    });

    it("should throw error if duration format is invalid", () => {
        // Arrange
        const duration = "1";

        // Assert
        expect(() => parseStringFormat(duration)).toThrowError("Invalid duration format [number unit]");
    });

    it("should throw error if duration unit is invalid", () => {
        // Arrange
        const duration = "1 invalid";

        // Assert
        expect(() => parseStringFormat(duration)).toThrowError("Invalid duration unit");
    });

    it("should throw error if duration number is invalid", () => {
        // Arrange
        const duration = "xx hours";

        // Assert
        expect(() => parseStringFormat(duration)).toThrowError("Invalid duration number");
    });
});
