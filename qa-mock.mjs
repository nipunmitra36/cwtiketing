import { createServer } from "node:http";

const server = createServer((req, res) => {
  if (req.method !== "POST") {
    res.writeHead(405, { "Content-Type": "application/json" });
    return res.end("{}");
  }
  let raw = "";
  req.on("data", (c) => (raw += c));
  req.on("end", () => {
    const ct = req.headers["content-type"] || "";
    const send = (code, obj) => {
      res.writeHead(code, { "Content-Type": "application/json" });
      res.end(JSON.stringify(obj));
    };
    if (!ct.includes("x-www-form-urlencoded")) {
      return send(422, {
        message: "The full name field is required. (and 3 more errors)",
        errors: { full_name: ["body was not form-encoded"] },
      });
    }
    const p = new URLSearchParams(raw);
    const errors = {};
    for (const k of ["full_name", "email", "topic", "message"]) {
      if (!p.get(k)) errors[k] = [`The ${k} field is required.`];
    }
    const token = p.get("cf-turnstile-response") || "";
    if (!token) errors["cf-turnstile-response"] = ["The cf-turnstile-response field is required."];
    else if (token.startsWith("BAD")) errors["cf-turnstile-response"] = ["Please confirm you are not a robot."];
    if (Object.keys(errors).length) return send(422, { message: "validation failed", errors });
    console.log("ACCEPTED " + JSON.stringify(Object.fromEntries(p)));
    send(201, { id: 1 });
  });
});

server.listen(8099, () => console.log("mock upstream on 8099"));
