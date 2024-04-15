import { describe, expect, it } from "vitest";
import dayjs from "./dayjs-extras";

describe("dayjs-extras", () => {
    it("create default dayjs object", () => {
        // Arrange
        const now = dayjs();

        // Assert
        expect(now).toBeDefined();
        expect(now.isValid()).toBe(true);
    });
});
