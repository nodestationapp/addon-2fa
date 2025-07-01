import speakeasy from "speakeasy";
import { knex } from "@nstation/db";

export default async (req, res) => {
  const { secret, token } = req.body;

  try {
    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: "base32",
      token: token,
      window: 1,
    });

    if (!verified) {
      return res.status(400).json({ error: "Invalid token" });
    }

    const settings = await knex("nodestation_2fa")
      .where({
        user: req.user.id,
      })
      .first();

    if (!settings) {
      await knex("nodestation_2fa").insert({
        user: req.user.id,
        secret: secret,
      });
    } else {
      await knex("nodestation_2fa")
        .update({
          secret: secret,
        })
        .where({
          user: req.user.id,
        });
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
