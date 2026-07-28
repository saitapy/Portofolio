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
// 5. FITUR GRAVITASI HP (GIROSKOP) UNTUK ANIMASI PARTICLES
// =========================================================================
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (event) => {
    // Pastikan library particlesJS sudah berhasil terinisialisasi di sistem
    if (window.pJSDom && window.pJSDom.length > 0) {
      const pJS_Instance = window.pJSDom.pJS;
      
      // Mengambil sudut kemiringan HP bray:
      // gamma = kiri/kanan (-90 sampai 90)
      // beta = depan/belakang (-180 sampai 180)
      const tiltX = event.gamma; 
      const tiltY = event.beta;  

      // Validasi agar sensor membaca saat posisi HP digenggam wajar
      if (tiltX !== null && tiltY !== null) {
        // Konversi sudut kemiringan menjadi koordinat posisi pixel di layar HP
        const scaleX = (tiltX + 90) / 180;
        const scaleY = (tiltY + 90) / 180;

        const fakeMouseX = scaleX * pJS_Instance.canvas.w;
        const fakeMouseY = scaleY * pJS_Instance.canvas.h;

        // Suntikkan posisi gravitasi baru ke sistem interaktivitas partikel bray!
        pJS_Instance.interactivity.status = "mousemove";
        pJS_Instance.interactivity.mouse.pos_x = fakeMouseX;
        pJS_Instance.interactivity.mouse.pos_y = fakeMouseY;
      }
    }
  });
}


