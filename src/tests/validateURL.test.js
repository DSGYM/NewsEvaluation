import { validateURL } from "../client/js/validateURL";

describe("check the URL Validation", () => {
  it("Valid URL", () => {
    expect(validateURL("https://www.google.com/")).toBe(true);
  });

  it("Returns false on invalid url", () => {
    expect(validateURL("hxtps://www.google.com")).toBe(false);
  });
});
