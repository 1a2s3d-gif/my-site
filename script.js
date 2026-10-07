// ===== 1. تعريف العناصر =====
let backToTopButton = document.getElementById("backToTopButton");
let newsletterForm = document.getElementById("newsletterForm");
let newsletterEmail = document.getElementById("newsletterEmail");
let newsletterMessage = document.getElementById("newsletterMessage");
let sections = document.querySelectorAll("section, footer");
let navLinks = document.querySelectorAll("header nav a");

// ===== 2. أحداث التمرير (Scroll) =====
window.addEventListener("scroll", function () {
  // --- إظهار زر العودة لأعلى بعد النزول 300 بكسل، وإخفاؤه قبل ذلك ---
  if (window.scrollY > 300) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }

  // --- تحديد القسم الحالي (مع هامش 150 بكسل) ---
  let currentSectionId = "";

  sections.forEach(function (section) {
    let sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 150) {
      currentSectionId = section.getAttribute("id");
    }
  });

  // --- تمييز رابط القسم الحالي في القائمة ---
  navLinks.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSectionId) {
      link.classList.add("active");
    }
  });
});

// ===== 3. زر العودة لأعلى: تمرير سلس إلى بداية الصفحة =====
backToTopButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== 4. نموذج النشرة البريدية =====
newsletterForm.addEventListener("submit", function (event) {
  // منع إعادة تحميل الصفحة عند الإرسال
  event.preventDefault();

  // قراءة البريد الإلكتروني وإزالة المسافات الزائدة
  let emailValue = newsletterEmail.value.trim();

  // التحقق: الحقل فارغ أو لا يحتوي على @
  if (emailValue === "" || !emailValue.includes("@")) {
    newsletterMessage.textContent = "Please enter a valid email address.";
    return;
  }

  // رسالة النجاح ثم تفريغ الحقل
  newsletterMessage.textContent = "Thank you for subscribing, " + emailValue + "!";
  newsletterEmail.value = "";
});