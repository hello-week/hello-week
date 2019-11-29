import { cssClasses, cssStates, daysWeek, formatDate } from "../../src/scripts/shared/constants";

it("cssClasses should be a object", () => {
    expect(typeof cssClasses).toBe("object");
});

it("cssStates should be a object", () => {
    expect(typeof cssStates).toBe("object");
});

it("daysWeek should be a object", () => {
    expect(typeof daysWeek).toBe("object");
});

it("formatDate should be a object", () => {
    expect(typeof formatDate).toBe("object");
});
