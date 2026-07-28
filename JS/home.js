// ==========================================
// 1. ANIMASI TEXT MENGETIK (TYPING EFFECT)
// ==========================================
const textEl = document.querySelector(".typing-text");
const professions = ["Designer", "Web Developer", "Illustrator"];
let professionsIndex = 0;
let charIndex = 0;
let deleting = false;

function playTyping() {
  if (!textEl) return;
  
  const current = professions[professionsIndex];
  
  if (deleting) {
    textEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let speed = deleting ? 80 : 150;
  
  if (!deleting && charIndex === current.length) {
    speed = 2000;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    professionsIndex = (professionsIndex + 1) % professions.length;
    speed = 500;
  }
  setTimeout(playTyping, speed);
}

// ==========================================
// 2. LOGIKA KIRIM PESAN (VIA MAILTO) & VALIDASI
// ==========================================
function sendEmailViaMailto() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const txtSubject = document.getElementById("subject").value;
  const message = document.getElementById("Subject").value; // Mengambil dari ID 'Subject' di HTML

  // Format pesan agar rapi saat masuk ke aplikasi email
  const emailTo = "saitapypresent@gmail.com";
  const emailSubject = encodeURIComponent(`Portfolio Message: ${txtSubject}`);
  const emailBody = encodeURIComponent(
    `Nama: ${name}\n` +
    `Email: ${email}\n` +
    `No HP: ${phone}\n\n` +
    `Isi Pesan:\n${message}`
  );

  // Alihkan langsung ke mailto client
  window.location.href = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;
}

function checkInputs() {
  const items = document.querySelectorAll(".item");
  let isValid = true;
  
  for (const item of items) {
    if (item.value.trim() == "") {
      item.classList.add("error");
      if (item.parentElement) {
        item.parentElement.classList.add("error");
      }
      isValid = false;
    } else {
      item.classList.remove("error");
      if (item.parentElement) {
        item.parentElement.classList.remove("error");
      }
    }
  }
  return isValid;
}

// ==========================================
// 3. EVENT LISTENER UTAMA & LOGIKA SCROLL / NAVBAR
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

    particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 80, 
        "density": { "enable": true, "value_area": 800 }
      },
      "color": {
        "value": "#ff9100" // Warna oranye neon sesuai variabel --warna-utama kamu bray!
      },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.5, "random": false },
      "size": { "value": 3, "random": true },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ff9100", // Menyamakan warna garis penghubung bray
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2, 
        "direction": "none",
        "out_mode": "out"
      }
    },
    "interactivity": {
      "detect_on": "window",
      "events": {
        "onhover": { "enable": true, "mode": "grab" },
        "onclick": { "enable": true, "mode": "push" },
        "resize": true
      }
    },
    "retina_detect": true
  });
  
  // Efek Sticky Header saat di-scroll
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("stiky"); // Menyesuaikan class '.stiky' di CSS kamu
    } else {
      header.classList.remove("stiky");
    }
  });

  // Jalankan Efek Muncul Halus Pas Di-Scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.15 });

  // Daftarkan bagian section mana saja yang mau dikasih efek muncul halus
  document.querySelectorAll('#about, #portofolio, .portofolio-box, #contact').forEach((el) => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });

  // Jalankan typing effect secara mandiri
  playTyping();
  
  // Jalankan submit form
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (checkInputs()) {
        sendEmailViaMailto();
      }
    });
  }

  // Jalankan responsive navbar bray
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  
  if (menuIcon && navbar) {
    menuIcon.onclick = () => {
      const icon = menuIcon.querySelector('i');
      
      // Tukar kelas ikonnya secara presisi bray
      if (icon.classList.contains('bx-menu')) {
        icon.classList.remove('bx-menu');
        icon.classList.add('bx-x'); // Berubah jadi silang (X)
      } else {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu'); // Kembali jadi garis tiga
      }
      
      // Munculkan/sembunyikan navbarnya
      navbar.classList.toggle('active');
    };
  }
});


// =========================================================================
// 5. FITUR GRAVITASI HP (GIROSKOP) - VERSI REVISI ARRAY & IZIN BROWSER
// =========================================================================
function aktifkanSensorGravitasi() {
  window.addEventListener("deviceorientation", (event) => {
    // Perbaikan fatal: pJSDom wajib dibaca sebagai array indeks ke-0 bray!
    if (window.pJSDom && window.pJSDom.length > 0) {
      const pJS_Instance = window.pJSDom[0].pJS; 
      
      const tiltX = event.gamma; // Sensor kemiringan Kiri - Kanan
      const tiltY = event.beta;  // Sensor kemiringan Depan - Belakang

      if (tiltX !== null && tiltY !== null) {
        // Konversi sudut kemiringan HP menjadi koordinat pixel layar
        const scaleX = (tiltX + 60) / 120; // Dipersempit sudutnya agar gerakan partikel lebih responsif
        const scaleY = (tiltY + 60) / 120;

        const fakeMouseX = scaleX * pJS_Instance.canvas.w;
        const fakeMouseY = scaleY * pJS_Instance.canvas.h;

        // Suntikkan koordinat virtual baru ke core canvas partikel bray
        pJS_Instance.interactivity.status = "mousemove";
        pJS_Instance.interactivity.mouse.pos_x = fakeMouseX;
        pJS_Instance.interactivity.mouse.pos_y = fakeMouseY;
      }
    }
  });
}

// Logika pembuka blokir privasi sensor browser HP (Android & iOS)
if (window.DeviceOrientationEvent) {
  // Jika mendeteksi browser iOS/iPhone (membutuhkan konfirmasi klik) bray
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    // Membuat tombol aktivasi melayang estetik di layar HP
    const btnIzin = document.createElement('button');
    btnIzin.textContent = "Matikan Fitur Kaku? Aktifkan Efek Gravitasi Latar Belakang";
    btnIzin.style.cssText = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); z-index:99999; padding:12px 24px; background:#ff9100; color:black; font-weight:bold; font-size:1.4rem; border-radius:3rem; border:none; box-shadow:0 0 15px #ff9100; cursor:pointer;";
    document.body.appendChild(btnIzin);

    btnIzin.addEventListener('click', () => {
      DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            aktifkanSensorGravitasi();
            btnIzin.remove(); // Hapus tombol setelah diizinkan bray
          }
        })
        .catch(console.error);
    });
  } else {
    // Untuk Android / Browser Desktop saat disimulasikan mode mobile, langsung aktif bray!
    aktifkanSensorGravitasi();
  }
}

