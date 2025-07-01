import get from "./get.js";
import login from "./login.js";
import setup from "./setup.js";
import verify from "./verify.js";
import jwtVerify from "./jwtVerify.js";
import setupVerify from "./setupVerify.js";

import authMiddleware from "@nstation/auth/utils/authMiddleware.js";

export default [
  {
    method: "POST",
    path: "/auth/login",
    handler: login,
    type: "admin",
  },
  {
    method: "GET",
    path: "/auth/2fa/setup",
    handler: setup,
    type: "admin",
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "POST",
    path: "/auth/2fa/verify",
    handler: verify,
    type: "admin",
  },
  {
    method: "POST",
    path: "/auth/2fa/jwtVerify",
    handler: jwtVerify,
    type: "admin",
  },
  {
    method: "POST",
    path: "/auth/2fa/setup/verify",
    handler: setupVerify,
    type: "admin",
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "GET",
    path: "/auth/2fa",
    handler: get,
    type: "admin",
    middlewares: [authMiddleware(["admin"])],
  },
];
