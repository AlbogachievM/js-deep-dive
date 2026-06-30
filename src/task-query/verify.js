import { parseTaskQuery } from "./parseTaskQuery.js";

console.log(
  parseTaskQuery({
    priority: "3",
    completed: "false",
    estimateHours: "2",
    search: "Hello World",
  }),
);

console.log(
  parseTaskQuery({
    priority: "3",
    completed: "false",
    estimateHours: "1.5",
    search: "  javascript  ",
  }),
);

console.log(
  parseTaskQuery({
    priority: "3",
    completed: "false",
    estimateHours: "0",
    search: "  javascript  ",
  }),
);

console.log(
  parseTaskQuery({
    priority: "3",
    completed: "false",
    estimateHours: "",
    search: "  javascript  ",
  }),
);

console.log(
  parseTaskQuery({
    priority: "3",
    completed: "false",
    estimateHours: "-2",
    search: "  javascript  ",
  }),
);

console.log(
  parseTaskQuery({
    priority: "3",
    completed: "false",
    estimateHours: "Infinity",
    search: "  javascript  ",
  }),
);

console.log(
  parseTaskQuery({
    priority: "3",
    completed: "false",
    estimateHours: "abc",
    search: "  javascript  ",
  }),
);
