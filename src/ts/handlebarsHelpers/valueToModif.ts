import { StatHelpers } from "../apps/helpers/StatHelpers";

export const valueToModif = function (a: number) {
  const result = StatHelpers.valueToModifier(a);
  return result > 0 ? "+" + result : result;
};
