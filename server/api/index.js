import get from "./get.js";
import login from "./login.js";
import setup from "./setup.js";
import verify from "./verify.js";
import jwtVerify from "./jwtVerify.js";
import setupVerify from "./setupVerify.js";
import disable from "./disable.js";
import authMiddleware from "@nstation/auth/utils/authMiddleware.js";

export default [
  {
    method: "POST",
    path: "/admin-api/auth/login",
    handler: login,
  },
  {
    method: "GET",
    path: "/admin-api/auth/2fa/setup",
    handler: setup,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "POST",
    path: "/admin-api/auth/2fa/verify",
    handler: verify,
  },
  {
    method: "POST",
    path: "/admin-api/auth/2fa/jwtVerify",
    handler: jwtVerify,
  },
  {
    method: "POST",
    path: "/admin-api/auth/2fa/setup/verify",
    handler: setupVerify,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "GET",
    path: "/admin-api/auth/2fa",
    handler: get,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "POST",
    path: "/admin-api/auth/2fa/disable",
    handler: disable,
    middlewares: [authMiddleware(["admin"])],
  },
];
