const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("open");
  });
});

const activeSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.hash === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-34% 0px -55% 0px", threshold: 0 }
);

sections.forEach((section) => activeSectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.13 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const projects = {
  glow: {
    type: "Desktop & Android App / Three.js 3D",
    title: "Glow ✦ Skincare Companion",
    image: "assets/glow-preview.png",
    description:
      "Aplikasi pendamping skincare harian desktop & mobile yang dirancang dengan visual Romantic Glassmorphism dan grafis 3D Three.js real-time. Membantu menjaga konsistensi rutinitas harian dengan simulasi langit 4 fase dinamis, botol serum 3D interaktif 360°, kunci proteksi eksfoliasi, dan streak counter.",
    features: [
      "☀️ 4-Phase 3D Celestial Atmosphere: Langit atmosfer 3D berubah secara real-time mengikuti jam lokal perangkat (Pagi, Siang berawan, Senja rose-gold, Malam berbintang).",
      "🧴 3D Interactive Serum Bottle: Botol serum 3D prosedural dapat diputar 360° dengan simulasi volume cairan dan gelembung mikro real-time.",
      "🔒 Exfoliation Safety Lock: Checklist protektif sonik toner yang otomatis terkunci untuk mencegah over-exfoliasi (hanya terbuka pada Rabu & Sabtu malam).",
      "🔥 Strict Consecutive Streak: Pelacak konsistensi harian dengan nyala api glowing untuk motivasi rutinitas.",
      "🌐 Full Bilingual Support (EN & ID): Pengalihan bahasa instan langsung dari navigation bar untuk seluruh panduan produk dan kalender.",
      "📱 Multi-Platform Releases: Tersedia paket resmi Android APK (v1.1.0) dengan fitur in-app auto update, serta installer Windows Setup & Portable."
    ],
    tags: ["React 18", "Three.js", "Tauri 2.0 (Rust)", "Capacitor", "Tailwind CSS", "Android APK", "Vite"],
    links: [
      { text: "GitHub Repository ↗", url: "https://github.com/yorr-amd/glow", primary: true },
      { text: "Download APK & Releases ↗", url: "https://github.com/yorr-amd/glow/releases/tag/v1.1.0", primary: false }
    ],
  },
  tracker: {
    type: "Native Desktop App / Financial Manager",
    title: "Tracker Budget",
    description:
      "Aplikasi desktop native pelacak keuangan dan anggaran pribadi yang cepat, aman, dan berorientasi privasi. Berjalan 100% offline-first dengan basis data lokal Dexie (IndexedDB), visualisasi analitik interaktif Recharts, manajemen multi-dompet & rekening, serta pelacak target tabungan impian.",
    features: [
      "📊 Smart Financial Dashboard: Ringkasan real-time saldo bersih, total pemasukan, pengeluaran bulanan, dan rasio tabungan.",
      "💳 Multi-Wallet & Rekening: Kelola dompet tunai fisik, rekening bank, dan e-wallet dalam satu dashboard terpadu.",
      "🎯 Financial Goals & Impian: Target tabungan dengan visual progress bar dinamis dan selebrasi animasi saat target tercapai.",
      "📉 Visual Analytics & Recharts: Diagram pie chart komposisi kategori pengeluaran dan grafik tren histori bulanan.",
      "🔄 Transaksi Berulang: Pelacakan otomatis pengeluaran rutin, tagihan berkala, dan langganan bulanan.",
      "🛡️ 100% Offline-First & Private: Seluruh data finansial disimpan sepenuhnya di komputer lokal menggunakan Dexie IndexedDB tanpa server perantara."
    ],
    tags: ["React 19", "TypeScript", "Tauri 2.0 (Rust)", "Tailwind CSS v4", "Dexie.js (IndexedDB)", "Recharts", "Lucide Icons"],
    links: [
      { text: "Tauri Desktop Native", url: "#projects", primary: true }
    ],
  },
};

const modal = document.querySelector("#project-modal");
const modalTitle = document.querySelector("#modal-title");
const modalType = document.querySelector("#modal-type");
const modalDescription = document.querySelector("#modal-description");
const modalFeatures = document.querySelector("#modal-features");
const modalTags = document.querySelector("#modal-tags");
const modalActions = document.querySelector("#modal-actions");
const modalImageWrap = document.querySelector("#modal-image-wrap");
const modalImg = document.querySelector("#modal-img");
const closeModalButton = document.querySelector(".modal-close");
let triggerElement = null;

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  if (modalImg) {
    modalImg.src = "";
  }
  if (triggerElement) {
    triggerElement.focus();
  }
}

document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.modal];
    if (!project) return;

    triggerElement = button;
    modalType.textContent = project.type;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    if (modalImageWrap && modalImg) {
      if (project.image) {
        modalImg.src = project.image;
        modalImageWrap.hidden = false;
      } else {
        modalImageWrap.hidden = true;
      }
    }

    if (modalFeatures && project.features) {
      modalFeatures.replaceChildren(
        ...project.features.map((feature) => {
          const li = document.createElement("li");
          li.textContent = feature;
          return li;
        })
      );
    }

    modalTags.replaceChildren(
      ...project.tags.map((tag) => {
        const item = document.createElement("span");
        item.textContent = tag;
        return item;
      })
    );

    if (modalActions && project.links) {
      modalActions.replaceChildren(
        ...project.links.map((link) => {
          const a = document.createElement("a");
          a.href = link.url;
          a.textContent = link.text;
          a.className = link.primary ? "button button-pink button-sm" : "button button-cyan button-sm";
          if (link.url.startsWith("http")) {
            a.target = "_blank";
            a.rel = "noopener noreferrer";
          }
          return a;
        })
      );
    }

    modal.hidden = false;
    document.body.classList.add("modal-open");
    closeModalButton.focus();
  });
});

closeModalButton.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
