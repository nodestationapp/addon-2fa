import jwt from "jsonwebtoken";

export default async (req, res) => {
  const { id } = req.body;

  try {
    jwt.verify(id, process.env.TOKEN_SECRET);

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
