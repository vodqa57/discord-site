import { useRouter } from 'next/router';

export default function Panel() {
  const router = useRouter();
  const { username, id, avatar, error } = router.query;

  if (error === "not_in_guild") {
    return <h1 style={{ color: "red", textAlign: "center" }}>Bu sunucuda değilsin.</h1>;
  }

  if (error === "no_permission") {
    return <h1 style={{ color: "red", textAlign: "center" }}>Gerekli yetkiye sahip değilsin.</h1>;
  }

  if (!username || !id) {
    return <h1 style={{ textAlign: "center" }}>Giriş yapmadan panel görüntülenemez.</h1>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1>Merhaba, {username}!</h1>
      <img src={`https://cdn.discordapp.com/avatars/${id}/${avatar}.png`} alt="avatar" width={100} style={{ borderRadius: '50%' }} />
      <p>Discord ID: {id}</p>
      <p>Panelin burası 🎛️</p>
    </div>
  );
}
