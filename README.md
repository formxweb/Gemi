# Denden Luxury Yachts — web sitesi tasarım önerisi

Denden Luxury Yachts (DenDen Denizcilik A.Ş.) için hazırlanmış marka ve web sitesi vizyonu demosu.
Statik site olarak üretilir ([Astro](https://astro.build)), her ortamda sunucusuz yayınlanabilir.

## Sayfalar

| EN | TR | İçerik |
| --- | --- | --- |
| `/` | `/tr/` | Ana sayfa: atmosfer, marka mesajı, filo, rakamlarla flagship, Boğaz, deneyimler, concierge, talep, hakkımızda |
| `/yachts/denden-istanbul/` | `/tr/yachts/denden-istanbul/` | DenDen İstanbul detay sayfası (atmosfer → detay → teknik bilgiler → teknede bir akşam → talep) |
| `/private-charter/` | `/tr/private-charter/` | Özel kiralama talep akışı — talep özeti WhatsApp mesajı olarak hazırlanır |

Menüdeki Yachts / Experiences / Concierge / Bosphorus / About bağlantıları ana sayfadaki bölümlere, Contact ise talep sayfasına gider.

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # çıktı: dist/
npm run preview
npm run check:site # build sonrası: linkler, anchor'lar, konsol hataları, kırık görseller, WhatsApp formu
npm run build:single # tüm siteyi tek HTML dosyasına paketler: dist-single/Denden-Luxury-Yachts.html
```

`build:single` çıktısı sunucu gerektirmez: dosyaya çift tıklayınca açılır, e-posta ya da WhatsApp ile gönderilebilir.

Yayın: `dist/` klasörü Vercel, Netlify, Cloudflare Pages veya herhangi bir statik sunucuya olduğu gibi yüklenebilir.
Yayın adresi belli olunca `astro.config.mjs` içindeki `site` değerini güncelleyin (canonical / OG etiketleri için).

## İçeriği düzenleme (CMS'e hazır yapı)

- `src/data/site.js` — WhatsApp numarası, telefon, adres, Instagram, menü metinleri (EN/TR)
- `src/data/fleet.js` — yatlar ve teknik bilgiler. Boş bırakılan alanlar sitede gösterilmez; yeni yat eklemek için bir kayıt eklemek yeterli
- `src/components/Wordmark.astro` — geçici tipografik logo; Denden'in resmi logo SVG'si geldiğinde burası değiştirilir

## Yayından önce Denden ile teyit edilecekler

Bu demoda hiçbir bilgi uydurulmadı; ancak aşağıdakiler kamuya açık kaynaklardan derlendi ve **teyit gerektirir**:

- **WhatsApp / telefon:** +90 549 447 10 47 (dizinlerde ayrıca 0532 055 81 37 geçiyor)
- **Adres:** Cihannüma Mah., Barbaros Blv. No:67, Gökman Apt., Beşiktaş (firma rehberi kaydı)
- **DenDen İstanbul:** 35 m, 60 misafir, 1 ana kabin, 2 × 1.000 hp, 29 Nisan 2023'te hizmete girdi (adayacht.com ilanı, kiraliktekneler.com). Bazı aracı sitelerde 32 m / 80 misafir gibi farklı değerler de geçiyor.
- **DenDen 5:** 21 m, 12 misafir, 2 kabin, 2018 / refit 2020 — **DenDen 7:** 19 m, 20 misafir, 2 kabin, 2016 / refit 2019 (adayacht.com)
- **DenDen 9:** 22 m, 25 misafir (faroutyachting.com)
- Kuruluş 2005, kurucu Tamer Köseoğlu (şirketin kendi "Hakkımızda" metni)

Ödül, müşteri yorumu, istatistik gibi doğrulanamayan hiçbir içerik kullanılmadı.

## Görseller

Ayrıntılar `CREDITS.md` dosyasında. Kısaca: atmosfer fotoğrafları Unsplash lisanslı; DenDen İstanbul, DenDen 5 ve DenDen 7 fotoğrafları
Denden teknelerinin aracı sitelerdeki kamuya açık ilanlarından alındı ve yalnızca bu sunum içindir. Yayından önce Denden'in orijinal
dosyalarıyla ya da yeni bir profesyonel çekimle değiştirilmeleri önerilir (DenDen 5 ve 7 fotoğrafları düşük çözünürlüklü).
