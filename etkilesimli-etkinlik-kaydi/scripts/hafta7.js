document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("workshopForm");
    const themeBtn = document.getElementById("themeBtn");
    const sonucAlani = document.getElementById("sonucAlani");
    const ozetIcerik = document.getElementById("ozetIcerik");

    // 1. Tema Değiştirme (JS Etkileşimi)
    themeBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-bs-theme");
        document.documentElement.setAttribute("data-bs-theme", currentTheme === "dark" ? "light" : "dark");
    });

    // 2. Form Özeti Oluşturma
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Sayfa yenilenmesini engeller

        const ad = document.getElementById("adSoyad").value;
        const email = document.getElementById("email").value;
        const bolum = document.getElementById("bolum").value;
        const sinif = document.querySelector('input[name="sinif"]:checked').value;
        const yuzYuze = document.getElementById("yuzYuze").checked ? "Yüz Yüze" : "Online";

        // Eksik alan kontrolü
        if (!ad || !email || !bolum) {
            alert("Lütfen tüm zorunlu alanları doldurunuz.");
            return;
        }

        // Özet oluşturma
        ozetIcerik.innerHTML = `
            <p><strong>Katılımcı:</strong> ${ad}</p>
            <p><strong>Bölüm:</strong> ${bolum} (${sinif}. Sınıf)</p>
            <p><strong>Katılım Şekli:</strong> ${yuzYuze}</p>
            <p><strong>Bilgilendirme:</strong> Kayıt detayları ${email} adresine gönderilmiştir.</p>
        `;

        sonucAlani.classList.remove("d-none"); // Sonucu göster
        form.reset(); // Formu temizle
    });
});
