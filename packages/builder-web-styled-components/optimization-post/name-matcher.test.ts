import { is_matching_name } from "./name-matcher";

test("is_matching_name", () => {
  expect(
    is_matching_name("a", "a", [
      "exact",
      "suffix-number",
      "suffix-separator-number",
    ])[0]
  ).toBe(true);

  expect(
    is_matching_name("Rectangle826", "Rectangle827", ["suffix-number"])[0]
  ).toBe(true);
});
