import rs from "resemblejs";
type ImageInput = Parameters<typeof rs>[0];

export async function resemble(
  a: ImageInput,
  b: ImageInput
): Promise<rs.ComparisonResult> {
  // return promise
  return new Promise((resolve, reject) => {
    rs(a)
      .compareTo(b)
      // ignore colors
      .ignoreColors()
      .useOriginalSize()
      .outputSettings({
        // pink
        errorColor: {
          red: 255,
          green: 0,
          blue: 255,
        },
        errorType: "movement",
      })
      .onComplete((data) => {
        resolve(data);
      });
  });
}
