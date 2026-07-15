import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import app from "../app.js";

function request(server, options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        let parsed;
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }
        resolve({ status: res.statusCode, body: parsed });
      });
    });
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

test("POST /api/inquiry rejects invalid payload (missing fields)", async (t) => {
  const server = app.listen(0);
  const { port } = server.address();

  const { status, body } = await request(
    server,
    {
      hostname: "localhost",
      port,
      path: "/api/inquiry",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    { fullName: "A" }
  );

  assert.equal(status, 400);
  assert.equal(body.success, false);
  assert.ok(Array.isArray(body.errors));
  server.close();
});

test("POST /api/inquiry rejects invalid email format", async (t) => {
  const server = app.listen(0);
  const { port } = server.address();

  const payload = {
    fullName: "Jane Doe",
    companyName: "Acme Inc",
    email: "not-an-email",
    phone: "+1 555 123 4567",
    country: "United States",
    industry: "Technology",
    companySize: "11-50",
    message: "We are interested in learning more about Orbit CRM.",
  };

  const { status, body } = await request(
    server,
    {
      hostname: "localhost",
      port,
      path: "/api/inquiry",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    payload
  );

  assert.equal(status, 400);
  assert.equal(body.success, false);
  server.close();
});

test("GET /api/health returns ok status", async (t) => {
  const server = app.listen(0);
  const { port } = server.address();

  const { status, body } = await request(server, {
    hostname: "localhost",
    port,
    path: "/api/health",
    method: "GET",
  });

  assert.equal(status, 200);
  assert.equal(body.status, "ok");
  server.close();
});
