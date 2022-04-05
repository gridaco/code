import { is_matching_name } from "./name-matcher";

test("is_matching_name", () => {
  expect(
    is_matching_name("a", "a", [
      "exact",
      "suffix-number",
      "suffix-separator-number",
    ])
  ).toBe(true);

  expect(
    is_matching_name("Rectangle826", "Rectangle827", ["suffix-number"])
  ).toBe(true);
});
