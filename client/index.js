import App from "./app.js";
import Login from "./pages/login.js";
import Settings from "./pages/settings/index.js";
import Verify from "./pages/verify.js";

import TwoFactorAuthMiddleware from "./contexts/TwoFactorAuthMiddleware.js";

export default {
  register(app) {
    app.addMenuLink({
      Component: App,
      hidden: true,
    });

    app.addHook("auth.public-routes.add", [
      {
        path: "/login",
        Component: () => <Login />,
      },
      {
        path: "/2fa-verify",
        Component: () => <Verify />,
      },
    ]);

    app.addHook("auth.settings.security", [
      {
        label: "2-Factor Authentication",
        component: <Settings />,
      },
    ]);

    app.addMiddleware({
      Component: (children) => (
        <TwoFactorAuthMiddleware>{children}</TwoFactorAuthMiddleware>
      ),
    });
  },
};
