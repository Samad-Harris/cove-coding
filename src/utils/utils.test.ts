import { describe, expect, test } from "vitest";
import { isScheduleConflict, createTimeSlot } from "./utils";

describe("isScheduleConflict", () => {
  test("should return false for empty or single reservation lists", () => {
    expect(isScheduleConflict([])).toBe(false);
    expect(isScheduleConflict([createTimeSlot("10:00", "11:00")])).toBe(false);
  });

  test("should return false for non-overlapping reservations", () => {
    const reservations = [
      createTimeSlot("09:00", "10:00"),
      createTimeSlot("12:00", "13:00"),
    ];
    expect(isScheduleConflict(reservations)).toBe(false);
  });

  test("should return false for back-to-back reservations", () => {
    const reservations = [
      createTimeSlot("10:00", "11:00"),
      createTimeSlot("11:00", "12:00"),
    ];
    expect(isScheduleConflict(reservations)).toBe(false);
  });

  describe("Basic Conflict Cases", () => {
    test("should return true for overlapping reservations", () => {
      const reservations = [
        createTimeSlot("09:00", "11:00"),
        createTimeSlot("10:00", "12:00"),
      ];
      expect(isScheduleConflict(reservations)).toBe(true);
    });

    test("should return true for identical time slots", () => {
      const reservations = [
        createTimeSlot("10:00", "11:00"),
        createTimeSlot("10:00", "11:00"),
      ];
      expect(isScheduleConflict(reservations)).toBe(true);
    });
  });

  // For sorting
  test("should handle unsorted input correctly", () => {
    const reservations = [
      createTimeSlot("12:00", "13:00"),
      createTimeSlot("08:00", "09:00"),
    ];
    expect(isScheduleConflict(reservations)).toBe(false);
  });
});
