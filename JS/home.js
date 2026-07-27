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
// 2. LOGIKA EMAIL & VALIDASI FORM
// ==========================================
function sendEmail() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const txtSubject = document.getElementById("subject").value;
    const message = document.getElementById("Subject").value;

    // Dibungkus try-catch biar kalau smtp.js lu eror/diblokir internet, web gak nge-crash bray
    try {
        Email.send({
            Host : "://elasticemail.com", // Hapus "://" di depan bray!
            Username : "saitapypresent@gmail.com",
            Password : "F2D315DE966B392140856EDDCFFC89184917",
            To : 'saitapypresent@gmail.com',
            From : "saitapypresent@gmail.com",
            Subject : `Portfolio Message: ${txtSubject}`,
            Body : `<h3>Pesan Baru dari Portofolio</h3>
                    <p><b>Nama:</b> ${name}</p>
                    <p><b>Email:</b> ${email}</p>
                    <p><b>No HP:</b> ${phone}</p>
                    <p><b>Isi Pesan:</b> ${message}</p>`
        }).then(msg => alert("Pesan berhasil dikirim bray!"));
    } catch (error) {
        console.log("SmtpJS diblokir koneksi, bray!");
        // Perbaikan tanda :// yang merusak string email di bawah ini:
        window.location.href = `mailto:saitapypresent@://gmail.com{txtSubject}&body=Nama:${name}%0DEmail:${email}%0DPesan:${message}`;
    }

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
// 3. EVENT LISTENER UTAMA
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
     // Jalankan Efek Muncul Halus Pas Di-Scroll
 const observer = new IntersectionObserver((entries) => {
     entries.forEach((entry) => {
         if (entry.isIntersecting) {
             entry.target.classList.add('show');
         }
     });
 }, { threshold: 0.15 }); // Elemen muncul saat 15% bagiannya masuk layar

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
                sendEmail();
            }
        });
    }

    // Jalankan responsive navbar
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            // Ambil elemen tag <i> yang ada di dalam menuIcon
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
