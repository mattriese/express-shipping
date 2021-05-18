"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("invalid json data (one field)", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 100,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });
    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance.productId must be greater than or equal to 1000"
        ],
        "status": 400
      }
    });
  });

    test("invalid json data (all fields)", async function () {
      const resp = await request(app).post("/shipments").send({
        productId: 100,
        name: "",
        addr: 100
      });
      expect(resp.body).toEqual({
        "error": {
          "message": [
            "instance.productId must be greater than or equal to 1000",
            "instance.name does not meet minimum length of 1",
            "instance.addr is not of a type(s) string",
            "instance requires property \"zip\""
          ],
          "status": 400
        }
      });
  });

});
