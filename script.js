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
  clinic: {
    type: "Web App / PHP",
    title: "Sistem Informasi Klinik Pratama",
    description:
      "Web pendaftaran pasien, antrean, rekam medis, apotek, pembayaran, dan laporan.",
    tags: ["PHP", "MySQL", "Dashboard"],
  },
  rental: {
    type: "Dashboard / MySQL",
    title: "Sistem Informasi Rental PlayStation",
    description:
      "Web pencatatan waktu rental, data pelanggan, transaksi, dan laporan.",
    tags: ["HTML/CSS", "PHP", "MySQL"],
  },
  barbershop: {
    type: "Booking System / UI",
    title: "Sistem Informasi Barbershop",
    description:
      "Web booking layanan, data pelanggan, jadwal, dan laporan.",
    tags: ["UI Design", "Figma", "Responsive"],
  },
  portfolio: {
    type: "Landing Page / UI Design",
    title: "Website Portofolio",
    description:
      "Website pribadi untuk menampilkan profil, skill, dan project.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
};

const modal = document.querySelector("#project-modal");
const modalTitle = document.querySelector("#modal-title");
const modalType = document.querySelector("#modal-type");
const modalDescription = document.querySelector("#modal-description");
const modalTags = document.querySelector("#modal-tags");
const closeModalButton = document.querySelector(".modal-close");
let triggerElement = null;

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  if (triggerElement) {
    triggerElement.focus();
  }
}

document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.modal];
    triggerElement = button;
    modalType.textContent = project.type;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTags.replaceChildren(
      ...project.tags.map((tag) => {
        const item = document.createElement("span");
        item.textContent = tag;
        return item;
      })
    );
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
