import type { Condition, QuestionNode, AssessmentAnswers } from "./types";
import { questionBank } from "./config";

/* ═══════════════════════════════════════════
   Condition Evaluation
   ═══════════════════════════════════════════ */

function getValue(field: string, answers: AssessmentAnswers): unknown {
  return answers[field];
}

export function evaluateCondition(condition: Condition, answers: AssessmentAnswers): boolean {
  switch (condition.operator) {
    case "equals": {
      const val = getValue(condition.field!, answers);
      return val === condition.value;
    }
    case "notEquals": {
      const val = getValue(condition.field!, answers);
      return val !== condition.value;
    }
    case "includes": {
      const val = getValue(condition.field!, answers);
      if (Array.isArray(val)) return val.includes(condition.value);
      return val === condition.value;
    }
    case "includesAny": {
      const val = getValue(condition.field!, answers);
      if (!Array.isArray(val)) return false;
      return (condition.values as unknown[])!.some((v) => val.includes(v));
    }
    case "includesAll": {
      const val = getValue(condition.field!, answers);
      if (!Array.isArray(val)) return false;
      return (condition.values as unknown[])!.every((v) => val.includes(v));
    }
    case "exists": {
      const val = getValue(condition.field!, answers);
      return val !== undefined && val !== null && val !== "";
    }
    case "greaterThan": {
      const val = getValue(condition.field!, answers);
      return typeof val === "number" && val > (condition.value as number);
    }
    case "lessThan": {
      const val = getValue(condition.field!, answers);
      return typeof val === "number" && val < (condition.value as number);
    }
    case "and": {
      return (condition.conditions || []).every((c) => evaluateCondition(c, answers));
    }
    case "or": {
      return (condition.conditions || []).some((c) => evaluateCondition(c, answers));
    }
    case "not": {
      return !evaluateCondition(condition.condition!, answers);
    }
    default:
      return true;
  }
}

/* ═══════════════════════════════════════════
   Flow Resolution
   ═══════════════════════════════════════════ */

export function resolveVisibleQuestions(answers: AssessmentAnswers): QuestionNode[] {
  return questionBank.filter((q) => {
    if (q.showWhen) {
      return evaluateCondition(q.showWhen, answers);
    }
    return true;
  });
}

export function getQuestionsByStage(visibleQuestions: QuestionNode[]): Map<number, QuestionNode[]> {
  const map = new Map<number, QuestionNode[]>();
  for (const q of visibleQuestions) {
    if (!map.has(q.macroStage)) {
      map.set(q.macroStage, []);
    }
    map.get(q.macroStage)!.push(q);
  }
  return map;
}

export function getCurrentStage(stageQuestions: Map<number, QuestionNode[]>, currentQuestionId: string): number {
  for (const [stage, questions] of stageQuestions) {
    if (questions.some((q) => q.id === currentQuestionId)) {
      return stage;
    }
  }
  return 1;
}

/* ═══════════════════════════════════════════
   Answer Invalidation
   ═══════════════════════════════════════════ */

export function invalidateDependentAnswers(
  changedQuestionId: string,
  answers: AssessmentAnswers,
  visibleQuestions: QuestionNode[],
): AssessmentAnswers {
  const changedQuestion = questionBank.find((q) => q.id === changedQuestionId);
  if (!changedQuestion?.invalidatesOnChange) return answers;

  const toInvalidate = changedQuestion.invalidatesOnChange;
  const next = { ...answers };

  for (const id of toInvalidate) {
    if (id in next) {
      delete next[id];
    }
  }

  return next;
}

export function removeStaleAnswers(
  answers: AssessmentAnswers,
  visibleQuestions: QuestionNode[],
): AssessmentAnswers {
  const visibleIds = new Set(visibleQuestions.map((q) => q.id));
  const next = { ...answers };
  for (const key of Object.keys(next)) {
    if (!visibleIds.has(key)) {
      delete next[key];
    }
  }
  return next;
}

/* ═══════════════════════════════════════════
   Progress Calculation
   ═══════════════════════════════════════════ */

export function calculateProgress(
  visibleQuestions: QuestionNode[],
  answers: AssessmentAnswers,
): { completed: number; total: number; percent: number; requiredCompleted: number; requiredTotal: number } {
  const required = visibleQuestions.filter((q) => q.required);
  const requiredDone = required.filter((q) => {
    const val = answers[q.id];
    if (q.type === "multiSelect") return Array.isArray(val) && val.length > 0;
    if (q.type === "boolean") return val === true || val === false;
    return val !== undefined && val !== null && val !== "";
  });

  const total = visibleQuestions.length;
  const answered = visibleQuestions.filter((q) => {
    const val = answers[q.id];
    if (q.type === "multiSelect") return Array.isArray(val) && val.length > 0;
    if (q.type === "boolean") return val === true || val === false;
    return val !== undefined && val !== null && val !== "";
  });

  const percent = required.length > 0
    ? Math.round((requiredDone.length / required.length) * 100)
    : 0;

  return {
    completed: answered.length,
    total,
    percent: Math.min(percent, 100),
    requiredCompleted: requiredDone.length,
    requiredTotal: required.length,
  };
}

/* ═══════════════════════════════════════════
   Question Validation
   ═══════════════════════════════════════════ */

export function isQuestionAnswered(question: QuestionNode, answers: AssessmentAnswers): boolean {
  if (!question.required) return true;

  if (question.allowSkip) {
    const val = answers[question.id];
    if (val === undefined || val === null || val === "") return true;
  }

  const val = answers[question.id];

  if (val === true || val === false) return true;

  switch (question.type) {
    case "multiSelect":
      return Array.isArray(val) && val.length > 0;
    case "boolean":
      return val === true || val === false;
    default:
      return val !== undefined && val !== null && val !== "";
  }
}

export function validateQuestion(
  question: QuestionNode,
  answers: AssessmentAnswers,
): string | null {
  if (!question.required) return null;

  if (question.allowSkip) {
    const val = answers[question.id];
    if (val === undefined || val === null || val === "" || val === "skipped") return null;
  }

  if (question.validate) {
    return question.validate(answers[question.id], answers);
  }

  const val = answers[question.id];
  switch (question.type) {
    case "multiSelect":
      if (!Array.isArray(val) || val.length === 0) return "Choose at least one option.";
      return null;
    case "boolean":
      if (val !== true && val !== false) return "Please select yes or no.";
      return null;
    case "email":
      if (typeof val !== "string" || !val.includes("@")) return "Enter a valid email address.";
      return null;
    case "phone":
      if (val && typeof val === "string" && val.length > 0 && val.length < 5) return "Enter a valid phone number.";
      return null;
    case "text":
    case "url":
      if (!val || (typeof val === "string" && val.trim().length === 0)) return "This field is required.";
      return null;
    case "singleSelect":
      if (!val) return "Please select an option.";
      return null;
    case "slider":
      if (val === undefined || val === null) return "Please select a value.";
      return null;
    default:
      return null;
  }
}
