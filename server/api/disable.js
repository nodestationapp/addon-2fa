import speakeasy from "speakeasy";
import { knex } from "@nstation/db";

export default async (req, res) => {
  const { token } = req.body;

  try {
    const user = await knex("nodestation_2fa")
      .where({
        user: req?.user?.id,
      })
      .first();

    const verified = speakeasy.totp.verify({
      secret: user?.secret,
      encoding: "base32",
      token: token,
      window: 1,
    });

    if (!verified) {
      return res.status(400).json({ error: "Invalid token" });
    }

    await knex("nodestation_2fa")
      .where({
        user: req?.user?.id,
      })
      .del();

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
