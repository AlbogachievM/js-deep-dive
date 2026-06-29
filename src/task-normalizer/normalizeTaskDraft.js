export function normalizeTaskDraft(raw) {
  const isObject =
    typeof raw === "object" &&
    raw !== null &&
    !Array.isArray(raw);

  if (!isObject) {
    return {
      ok: false,
      errors: [
        {
          field: "root",
          message: "Данные должны быть объектом",
        },
      ],
    };
  }

  const errors = [];

  let normalizedTitle;

  if (typeof raw.title !== "string") {
    errors.push({
      field: "title",
      message: "Название должно быть строкой",
    });
  } else {
    normalizedTitle = raw.title.trim();

    if (!normalizedTitle) {
      errors.push({
        field: "title",
        message: "Название не должно быть пустым",
      });
    }
  }

  if (typeof raw.priority !== "number") {
    errors.push({
      field: "priority",
      message: "Приоритет должен быть числом",
    });
  } else if (!Number.isFinite(raw.priority)) {
    errors.push({
      field: "priority",
      message: "Приоритет должен быть конечным числом",
    });
  } else if (!Number.isInteger(raw.priority)) {
    errors.push({
      field: "priority",
      message: "Приоритет должен быть целым числом",
    });
  } else if (raw.priority < 1 || raw.priority > 5) {
    errors.push({
      field: "priority",
      message: "Приоритет должен быть числом от 1 до 5",
    });
  }

  let normalizedEstimateHours;

  if (raw.estimateHours === undefined || raw.estimateHours === null) {
    normalizedEstimateHours = null;
  } else if (
    !Number.isFinite(raw.estimateHours) ||
    raw.estimateHours < 0
  ) {
    errors.push({
      field: "estimateHours",
      message: "Оценка времени должна быть конечным неотрицательным числом",
    });
  } else {
    normalizedEstimateHours = raw.estimateHours;
  }

  if (errors.length > 0) {
    return {
      ok: false,
      errors,
    };
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