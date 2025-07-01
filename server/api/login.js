import login from "@nstation/auth/utils/login.js";
import { knex } from "@nstation/db";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  const { email, password } = req.body;

  try {
    const { access_token } = await login({ email, password });

    const user = await knex("nodestation_users")
      .where({
        email: email,
      })
      .select("id")
      .first();

    const result = await knex("nodestation_2fa")
      .where({
        user: user?.id,
      })
      .first();

    let response;
    if (!!result) {
      const twoFAToken = jwt.sign(
        { user: user.id, type: "2fa" },
        process.env.TOKEN_SECRET,
        { expiresIn: "10m" }
      );

      response = { id: twoFAToken };
    } else {
      response = { access_token };
    }

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
