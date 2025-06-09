export default function Home() {
  const loginUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URI)}&response_type=code&scope=identify%20guilds%20guilds.members.read`;

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Discord Paneline Giriş</h1>
      <a href={loginUrl}>
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>
          Discord ile Giriş Yap
        </button>
      </a>
    </div>
  );
}
