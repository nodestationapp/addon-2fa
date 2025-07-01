import speakeasy from "speakeasy";
import qrcode from "qrcode";

export default async (req, res) => {
  try {
    const secret = speakeasy.generateSecret({
      name: `Nodestation: ${req.user.email}`,
    });

    const qrCode = await qrcode.toDataURL(secret.otpauth_url);

    return res.status(200).json({ secret, qrCode });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
