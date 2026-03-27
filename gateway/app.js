require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const services = require("./config/services");

const app = express();

const proxyOptions = (target, serviceBasePath) => ({
  target,
  changeOrigin: true,
  pathRewrite: (path) => `${serviceBasePath}${path}`,
  on: {
    error(err, req, res) {
      if (!res.headersSent) {
        res.status(502).json({
          success: false,
          message: "Upstream service unavailable",
          detail: err.message,
        });
      }
    },
  },
});

app.get("/", (req, res) => {
  res.json({
    service: "API Gateway",
    routes: {
      users: "/users → user-service",
      menu: "/menu → menu-service",
      orders: "/orders → order-service",
      payments: "/payments → payment-service",
    },
    note: "Start all microservices before calling proxied routes. Swagger: each service at http://localhost:<port>/api-docs",
  });
});

app.get("/health", (req, res) => {
  res.json({ success: true, gateway: "ok" });
});

app.use("/users", createProxyMiddleware(proxyOptions(services.user, "/users")));
app.use("/menu", createProxyMiddleware(proxyOptions(services.menu, "/menu")));
app.use("/orders", createProxyMiddleware(proxyOptions(services.order, "/orders")));
app.use("/payments", createProxyMiddleware(proxyOptions(services.payment, "/payments")));

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway listening on http://localhost:${PORT}`);
  console.log("Proxies: /users, /menu, /orders, /payments");
});
