// =====================================================================
//  ATÖLYE — ayarlar
//  Supabase panelinde: Project Settings → API (Data API) bölümünden al.
//  Bu iki değer "herkese açık" olacak şekilde tasarlanmıştır; asıl
//  koruma veritabanındaki güvenlik kurallarıdır (kurulum.sql).
//  Boş bırakırsan uygulama DEMO modunda açılır (sahte verilerle).
// =====================================================================
window.ATOLYE_AYAR = {
  SUPABASE_URL: "",          // örn: "https://abcdxyz.supabase.co"
  SUPABASE_ANON_KEY: "",     // "anon public" ya da "publishable" anahtar

  // Telefon bildirimleri için (KURULUM.md → 5. adım). Boşsa bildirim düğmesi gizlenir.
  VAPID_PUBLIC_KEY: "",
};
