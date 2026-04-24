const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const applicationForm = document.getElementById("applicationForm");
const resetButton = document.getElementById("resetButton");
const formAlert = document.getElementById("formAlert");
const summaryResult = document.getElementById("summaryResult");

function showAlert(message, type) {
  formAlert.className = `alert alert-${type}`;
  formAlert.textContent = message;
  formAlert.classList.remove("d-none");
}

function clearAlert() {
  formAlert.className = "alert d-none";
  formAlert.textContent = "";
}

function setTheme(isDark) {
  body.classList.toggle("theme-dark", isDark);
  body.classList.toggle("theme-light", !isDark);
  themeToggle.textContent = isDark ? "Açık Temaya Geç" : "Koyu Temaya Geç";
}

function buildSummaryCard(data) {
  summaryResult.className = "summary-card card shadow-sm rounded-4";
  summaryResult.innerHTML = `
    <div class="card-body p-4 p-md-5">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <span class="badge text-bg-success rounded-pill px-3 py-2 mb-3">Kayıt Talebi Alındı</span>
          <h2 class="card-title display-6 fw-bold mb-2">Atölye Kayıt Özeti</h2>
          <p class="text-body-secondary mb-0">Bilgileriniz chatbot atölyesi başvurunuz için dinamik olarak oluşturuldu.</p>
        </div>
        <span class="badge text-bg-primary px-3 py-2 rounded-pill">${data.attendanceType}</span>
      </div>

      <div class="list-group list-group-flush mb-4">
        <div class="list-group-item"><strong>Ad Soyad:</strong> ${data.fullName}</div>
        <div class="list-group-item"><strong>E-posta:</strong> ${data.email}</div>
        <div class="list-group-item"><strong>Bölüm:</strong> ${data.department}</div>
        <div class="list-group-item"><strong>Sınıf:</strong> ${data.grade}</div>
        <div class="list-group-item"><strong>Oturum:</strong> ${data.session}</div>
        <div class="list-group-item"><strong>Katılım Türü:</strong> ${data.attendanceType}</div>
        <div class="list-group-item"><strong>Mesaj:</strong> ${data.message}</div>
      </div>

      <div class="alert alert-info mb-0" role="status">
        Kayıt talebiniz oluşturuldu. Etkinlik günü Marmara Üniversitesi Teknoloji Fakültesi T2 Blok konferans salonu girişinde adınızı doğrulayabilirsiniz.
      </div>
    </div>
  `;
}

themeToggle.addEventListener("click", function () {
  const isDark = !body.classList.contains("theme-dark");
  setTheme(isDark);
});

applicationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearAlert();

  const formData = {
    fullName: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    department: document.getElementById("department").value.trim(),
    grade: document.getElementById("grade").value,
    session: document.getElementById("session").value,
    attendanceType: document.getElementById("attendanceType").value,
    message: document.getElementById("message").value.trim(),
    consent: document.getElementById("consent").checked,
  };

  const hasMissingField =
    !formData.fullName ||
    !formData.email ||
    !formData.department ||
    !formData.grade ||
    !formData.session ||
    !formData.attendanceType ||
    !formData.message;

  document.getElementById('applicationForm').addEventListener('submit', function (event) {
    // Eğer formda eksik/hatalı yer varsa
    if (!this.checkValidity()) {
        event.preventDefault(); // Sayfanın yenilenmesini durdur
        event.stopPropagation(); // Hataları yönet
    }
    
    // Hatalı yerleri kırmızı yapacak olan Bootstrap sınıfını ekle
    this.classList.add('was-validated');
}, false);

  if (hasMissingField || !formData.consent) {
    showAlert("Lütfen tüm alanları doldurun ve onay kutusunu işaretleyin.", "warning");
    return;
  }

  buildSummaryCard(formData);
  showAlert("Kayıt özeti başarıyla oluşturuldu.", "success");
  summaryResult.scrollIntoView({ behavior: "smooth", block: "start" });
});

resetButton.addEventListener("click", function () {
  applicationForm.reset();
  clearAlert();
  summaryResult.className = "alert alert-info result-placeholder rounded-4 shadow-sm mb-0";
  summaryResult.innerHTML =
    "Henüz kayıt özeti oluşturulmadı. Formu doldurduktan sonra sonuç burada görünecek.";
});

setTheme(false);
