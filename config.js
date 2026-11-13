// =====================================================================
//  ATÖLYE — ayarlar
//  SUPABASE_ANON_KEY: Supabase → Project Settings → API Keys →
//  "Publishable key" (sb_publishable_...) ya da "anon public" anahtarı.
//  Bu anahtar herkese açık olacak şekilde tasarlanmıştır; asıl koruma
//  veritabanındaki güvenlik kurallarıdır. "secret" / "service_role"
//  anahtarını ASLA buraya koyma.
// =====================================================================
window.ATOLYE_AYAR = {
  SUPABASE_URL: "https://vlmwyraqdklzrgaowqaa.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_aw-NF-Wx53JGPFjUSvZWjg_9bLg5-Nb",

  // Telefon bildirimleri için (sonra eklenecek). Boşsa bildirim düğmesi gizlenir.
  VAPID_PUBLIC_KEY: "",
};
