const request = require("supertest");
const server = require("../server/index");

describe('Test path "/test"', () => {
  test("Test the API endpoint to be OK", async () => {
    const response = await request(server).get("/test");
    expect(response.statusCode).toBe(200);
  });
});
