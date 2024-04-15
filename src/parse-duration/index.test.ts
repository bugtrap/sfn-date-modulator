import { describe, expect, it } from "vitest";
import { parseDuration } from ".";

describe("parse-duration", () => {
    it("should return undefined - undefined", () => {
        // Act
        const result = parseDuration();

        // Assert
        expect(result).toBeUndefined();
    });

    it("should return undefined - null", () => {
        // Act
        const result = parseDuration(null as unknown as {});

        // Assert
        expect(result).toBeUndefined();
    });
});

describe("parse-duration - object", () => {
    it("should parse object duration", () => {
        // Act
        const result = parseDuration({
            days: 1,
        });

        // Assert
        expect(result).toBeDefined();
        expect(result?.days()).toBe(1);
    });

    it("should parse object duration with multiple units", () => {
        // Act
        const result = parseDuration({
            days: 1,
            hours: 2,
            minutes: 3,
            seconds: 4,
        });

        // Assert
        expect(result).toBeDefined();
        expect(result?.days()).toBe(1);
        expect(result?.hours()).toBe(2);
        expect(result?.minutes()).toBe(3);
        expect(result?.seconds()).toBe(4);
    });

    it("should parse empty object duration", () => {
        // Act
        const result = parseDuration({});

        // Assert
        expect(result).toBeDefined();
        expect(result?.days()).toBe(0);
        expect(result?.hours()).toBe(0);
        expect(result?.minutes()).toBe(0);
        expect(result?.seconds()).toBe(0);
    });
});

describe("parse-duration - number", () => {
    it("should parse number duration", () => {
        // Act
        const result = parseDuration(1);

        // Assert
        expect(result).toBeDefined();
        expect(result?.seconds()).toBe(1);
    });

    it("should parse 0 duration", () => {
        // Act
        const result = parseDuration(0);

        // Assert
        expect(result).toBeDefined();
        expect(result?.seconds()).toBe(0);
    });

    it("should parse number duration with multiple units", () => {
        // Act
        const result = parseDuration(1.5);

        // Assert
        expect(result).toBeDefined();
        expect(result?.seconds()).toBe(1.5);
    });

    it("should parse negative number duration", () => {
        // Act
        const result = parseDuration(-1);

        // Assert
        expect(result).toBeDefined();
        expect(result?.seconds()).toBe(-1);
    });
});

describe("parse-duration - string", () => {
    it("should parse string duration", () => {
        // Act
        const result = parseDuration("1 days");

        // Assert
        expect(result).toBeDefined();
        expect(result?.days()).toBe(1);
    });
});
