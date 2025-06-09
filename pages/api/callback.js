import axios from "axios";

export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) return res.status(400).send("Kod eksik.");

  try {
    const tokenRes = await axios.post(`https://discord.com/api/oauth2/token`, new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      scope: 'identify guilds guilds.members.read'
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const access_token = tokenRes.data.access_token;

    // Kullanıcı bilgileri
    const userRes = await axios.get("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    // Sunucu üyeliği kontrol
    const memberRes = await axios.get(`https://discord.com/api/users/@me/guilds/${process.env.GUILD_ID}/member`, {
      headers: { Authorization: `Bearer ${access_token}` }
    }).catch(() => null);

    if (!memberRes || !memberRes.data || !memberRes.data.roles) {
      return res.redirect(`/panel?error=not_in_guild`);
    }

    const hasRole = memberRes.data.roles.includes(process.env.REQUIRED_ROLE_ID);

    if (!hasRole) {
      return res.redirect(`/panel?error=no_permission`);
    }

    const user = userRes.data;
    res.redirect(`/panel?username=${encodeURIComponent(user.username)}&id=${user.id}&avatar=${user.avatar}`);

  } catch (err) {
    console.error("HATA:", err);
    res.status(500).send("Hata oluştu.");
  }
}
