import fs from "fs";
import path from "path";
import qrcode from "qrcode";
import speakeasy from "speakeasy";
import { rootPath } from "@nstation/utils";
import requireFromString from "require-from-string";

export default async (req, res) => {
  try {
    let config = fs.readFileSync(
      path.join(rootPath, "nodestation.config.js"),
      "utf-8"
    );

    const parsedConfig = requireFromString(config);

    const title = parsedConfig?.site?.title || "Nodestation";

    const secret = speakeasy.generateSecret({
      name: `${title}: ${req.user.email}`,
    });

    const qrCode = await qrcode.toDataURL(secret.otpauth_url);

    return res.status(200).json({ secret, qrCode });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
