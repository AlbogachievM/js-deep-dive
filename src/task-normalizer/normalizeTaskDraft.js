const errorObjects = [
  {
    ok: false,
    errors: [
      {
        field: "root",
        message: "Данные должны быть объектом",
      },
    ],
  },
  {
    ok: false,
    errors: [
      {
        field: "title",
        message: "Название должно быть строкой",
      },
    ],
  },
  {
    ok: false,
    errors: [
      {
        field: "title",
        message: "Название не должно быть пустым",
      },
    ],
  },
  {
    ok: false,
    errors: [
      {
        field: "priority",
        message: "Приоритет должен быть числом",
      },
    ],
  },
  {
    ok: false,
    errors: [
      {
        field: "priority",
        message: "Приоритет должен быть конечным числом",
      },
    ],
  },
  {
    ok: false,
    errors: [
      {
        field: "priority",
        message: "Приоритет должен быть целым числом",
      },
    ],
  },
  {
    ok: false,
    errors: [
      {
        field: "priority",
        message: "Приоритет должен быть числом от 1 до 5",
      },
    ],
  },
  {
    ok: false,
    errors: [
      {
        field: "estimateHours",
        message: "Оценка времени должна быть конечным неотрицательным числом",
      },
    ],
  },
];

export function normalizeTaskDraft(raw) {
  const isObject =
    typeof raw === "object" && raw !== null && !Array.isArray(raw);
  if (!isObject) return errorObjects[0];

  const titleIsString = typeof raw.title === "string";
  if (!titleIsString) return errorObjects[1];

  const normalizedTitle = raw.title.trim();
  if (!normalizedTitle) return errorObjects[2];

  const priorityIsNumber = typeof raw.priority === "number";
  if (!priorityIsNumber) return errorObjects[3];

  const priorityIsFinite = Number.isFinite(raw.priority);
  if (!priorityIsFinite) return errorObjects[4];

  const priorityIsInteger = Number.isInteger(raw.priority);
  if (!priorityIsInteger) return errorObjects[5];

  const priorityIsInRange = raw.priority >= 1 && raw.priority <= 5;
  if (!priorityIsInRange) return errorObjects[6];

  let normalizedEstimateHours;

  if (raw.estimateHours === undefined || raw.estimateHours === null) {
    normalizedEstimateHours = null;
  } else {
    const estimateHoursIsValid =
      Number.isFinite(raw.estimateHours) && raw.estimateHours >= 0;

    if (!estimateHoursIsValid) return errorObjects[7];

    normalizedEstimateHours = raw.estimateHours;
  }
  return {
    ok: true,
    value: {
      title: normalizedTitle,
      priority: raw.priority,
      estimateHours: normalizedEstimateHours,
    },
  };
}
