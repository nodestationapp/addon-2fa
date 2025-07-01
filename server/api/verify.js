import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";
import { knex } from "@nstation/db";

export default async (req, res) => {
  const { id, token } = req.body;

  try {
    const jwtData = jwt.verify(id, process.env.TOKEN_SECRET);

    const user = await knex("nodestation_2fa")
      .where({
        user: jwtData?.user,
      })
      .first();

    if (!user) {
      return res.status(400).json({ error: "Something went wrong" });
    }

    const verified = speakeasy.totp.verify({
      secret: user?.secret,
      encoding: "base32",
      token: token,
      window: 1,
    });

    if (!verified) {
      return res.status(400).json({ error: "Invalid token" });
    }

    const access_token = jwt.sign(
      {
        id: jwtData?.user,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
      },
      process.env.TOKEN_SECRET
    );

    return res.status(200).json({ access_token });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
