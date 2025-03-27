const { test, expect } = require("@jest/globals");
const { getUrlsFromHTML } = require("./dom-parser.js");

describe("getUrlsFromHTML module", () => {
  test("getUrlsFromHTML returns an array of URLs", () => {
    const htmlbody = `
    <html>
      <body>
        <a href="https://www.yahoo.com">Yahoo</a>
        <a href="/about">About</a>
        <a href="http://pets.com">Pets</a>
      </body>
    </html>
  `;
    const baseUrl = "https://www.pets.com";
    const urls = getUrlsFromHTML(htmlbody, baseUrl);
    expect(urls).toEqual([
      "https://www.yahoo.com/",
      "https://www.pets.com/about",
      "http://pets.com/",
    ]);
  });

  test("getUrlsFromHTML ignores invalid URLs", () => {
    const htmlbody = `
    <html>
      <body>
        <a href="https://www.yahoo.com">Yahoo</a>
        <a href="/about">About</a>
        <a href="javascript:alert('Hello, world!')">Click me!</a>
      </body>
    </html>
  `;
    const baseUrl = "https://pets.com";
    const urls = getUrlsFromHTML(htmlbody, baseUrl);
    expect(urls).toEqual([
      "https://www.yahoo.com/",
      "https://pets.com/about",
    ]);
  });

  test("getUrlsFromHTML handles relative URLs", () => {
    const htmlbody = `
    <html>
      <body>
        <a href="/about">About</a>
        <a href="about">About</a>
        <a href="../about">About</a>
      </body>
    </html>
  `;
    const baseUrl = "https://pets.com";
    const urls = getUrlsFromHTML(htmlbody, baseUrl);
    expect(urls).toEqual([
      "https://pets.com/about",
    ]);
  });
});