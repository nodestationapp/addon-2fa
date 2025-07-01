import { knex } from "@nstation/db";

export default async (req, res) => {
  try {
    const user = await knex("nodestation_2fa")
      .where({
        user: req?.user?.id,
      })
      .first();

    return res.status(200).json({ hasTwoFactorAuth: !!user });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
