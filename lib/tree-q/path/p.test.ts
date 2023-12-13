import { p } from "./p";

describe("p", () => {
  const data = {
    id: "1",
    children: [
      {
        id: "2",
        children: [
          {
            id: "3",
            children: [],
          },
        ],
      },
    ],
  };

  test("returns the correct path", () => {
    expect(p("3", { data })).toEqual(["1", "2", "3"]);
  });

  test("returns the correct path", () => {
    expect(p("2", { data })).toEqual(["1", "2"]);
  });

  test("returns an empty array if id is not found", () => {
    expect(p("4", { data })).toEqual([]);
  });
});
