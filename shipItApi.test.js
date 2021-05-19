"use strict";

const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);

const {
  shipProduct, SHIPIT_SHIP_URL
} = require("./shipItApi");


test("shipProduct", async function () {
  console.log("SHIPIT SHIP URL--->", SHIPIT_SHIP_URL)
  axiosMock.onPost()
    .reply(200, {
      receipt: {
        name: "Test Tester",
        addr: "100 Test St",
        zip: "12345-6789",
        shipId: 6247,
        itemId: 1000
      }
    });
  const res = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(res).toEqual(6247);
});
