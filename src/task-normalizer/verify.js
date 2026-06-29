import { normalizeTaskDraft } from "./normalizeTaskDraft.js";

console.log(normalizeTaskDraft(null));
console.log(normalizeTaskDraft(undefined));
console.log(normalizeTaskDraft("task"));
console.log(normalizeTaskDraft(42));
console.log(normalizeTaskDraft(true));
console.log(normalizeTaskDraft([]));
console.log(normalizeTaskDraft({}));

console.log(normalizeTaskDraft({ title: 123, priority: 3 }));
console.log(normalizeTaskDraft({ title: "   ", priority: 3 }));
console.log(normalizeTaskDraft({ title: "Task", priority: NaN }));
console.log(normalizeTaskDraft({ title: "Task", priority: Infinity }));
console.log(normalizeTaskDraft({ title: "Task", priority: 2.5 }));
console.log(normalizeTaskDraft({ title: "Task", priority: 6 }));
console.log(normalizeTaskDraft({ title: "Task", priority: 3 }));
console.log(normalizeTaskDraft({ title: "Task", priority: -3 }));
console.log(
  normalizeTaskDraft({ title: "Task", priority: 3, estimateHours: 0 }),
);
console.log(
  normalizeTaskDraft({ title: "Task", priority: 3, estimateHours: -1 }),
);
