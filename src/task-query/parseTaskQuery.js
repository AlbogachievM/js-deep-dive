export function parseTaskQuery(rawQuery) {
  const isObject =
    typeof rawQuery === "object" &&
    rawQuery !== null &&
    !Array.isArray(rawQuery);

  if (!isObject) {
    return {
      ok: false,
      errors: [
        {
          field: "root",
          message: "Query-параметры должны быть объектом",
        },
      ],
    };
  }

  const { priority, errPriority } = priorityFun(rawQuery.priority);
  const { completed, errCompleted } = completedFun(rawQuery.completed);
  const { estimateHours, errEstimateHours } = estimateHoursFun(
    rawQuery.estimateHours,
  );
  const { search, errSearch } = searchFun(rawQuery.search);

  const errors = [
    ...errPriority,
    ...errCompleted,
    ...errEstimateHours,
    ...errSearch,
  ];

  if (errors.length > 0) {
    return {
      ok: false,
      errors,
    };
  }

  return {
    ok: true,
    value: {
      priority,
      completed,
      estimateHours,
      search,
    },
  };
}

function priorityFun(value) {
  const errPriority = [];
  let priority = null;

  if (value === undefined || value === null || value === "") {
    return { priority, errPriority };
  }

  if (typeof value !== "string") {
    errPriority.push({
      field: "priority",
      message: "Приоритет должен быть строкой",
    });

    return { priority, errPriority };
  }

  if (value.trim() === "") {
    return { priority, errPriority };
  }

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    errPriority.push({
      field: "priority",
      message: "Приоритет должен быть числовой строкой",
    });
  } else if (!Number.isInteger(numberValue)) {
    errPriority.push({
      field: "priority",
      message: "Приоритет должен быть целым числом",
    });
  } else if (numberValue < 1 || numberValue > 5) {
    errPriority.push({
      field: "priority",
      message: "Приоритет должен быть числом от 1 до 5",
    });
  } else {
    priority = numberValue;
  }

  return { priority, errPriority };
}

function completedFun(value) {
  const errCompleted = [];
  let completed = null;

  if (value === undefined || value === null || value === "") {
    return { completed, errCompleted };
  }

  if (typeof value !== "string") {
    errCompleted.push({
      field: "completed",
      message: "Статус выполнения должен быть строкой",
    });
  } else if (value === "true") {
    completed = true;
  } else if (value === "false") {
    completed = false;
  } else {
    errCompleted.push({
      field: "completed",
      message: 'Допустимы только значения "true" или "false"',
    });
  }

  return { completed, errCompleted };
}

function estimateHoursFun(value) {
  const errEstimateHours = [];
  let estimateHours = null;

  if (value === undefined || value === null || value === "") {
    return { estimateHours, errEstimateHours };
  }

  if (typeof value !== "string") {
    errEstimateHours.push({
      field: "estimateHours",
      message: "Оценка времени должна быть строкой",
    });

    return { estimateHours, errEstimateHours };
  }

  if (value.trim() === "") {
    return { estimateHours, errEstimateHours };
  }

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue) || numberValue < 0) {
    errEstimateHours.push({
      field: "estimateHours",
      message: "Оценка времени должна быть конечным неотрицательным числом",
    });
  } else {
    estimateHours = numberValue;
  }

  return { estimateHours, errEstimateHours };
}

function searchFun(value) {
  const errSearch = [];
  let search = null;

  if (value === undefined || value === null) {
    return { search, errSearch };
  }

  if (typeof value !== "string") {
    errSearch.push({
      field: "search",
      message: "Поисковый запрос должен быть строкой",
    });

    return { search, errSearch };
  }

  const normalizedSearch = value.trim();

  if (normalizedSearch !== "") {
    search = normalizedSearch;
  }

  return { search, errSearch };
}