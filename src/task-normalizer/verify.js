import { normalizeTaskDraft } from "./normalizeTaskDraft.js";

console.log(
  normalizeTaskDraft({
    title: 123,
    priority: 8,
    estimateHours: -2,
  }),
);
console.log(
  normalizeTaskDraft({
    title: "  Task  ",
    priority: 3,
    estimateHours: 1.5,
  }),
);
console.log(
  normalizeTaskDraft({
    title: "   ",
    priority: NaN,
    estimateHours: Infinity,
  }),
);
console.log(
  normalizeTaskDraft({
    title: 123,
    priority: "3",
    estimateHours: -1,
  }),
);
