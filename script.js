// ===== Scroll to Top =====
const scrollBtn = document.getElementById("scrollTopBtn");
if (scrollBtn) {
    window.onscroll = () => {
        scrollBtn.style.display = document.documentElement.scrollTop > 200 ? "block" : "none";
    };
    scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ===== Contact Form Validation & Modal =====
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const dateInput = document.getElementById("date");
const modal = document.getElementById("confirmModal");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("closeModal");
const modalOk = document.getElementById("modalOk");

if (dateInput) dateInput.setAttribute("min", new Date().toISOString().split("T")[0]);
if (modal) modal.style.display = "none";

if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const date = dateInput.value;
        const message = document.getElementById("message").value.trim();

        const namePattern = /^[A-Za-z\s]+$/;
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,4}$/;
        const phonePattern = /^[0-9+\s()-]*$/;

        if (!namePattern.test(name)) return showError("Please enter a valid name (letters only).");
        if (!emailPattern.test(email)) return showError("Please enter a valid email.");
        if (phone && !phonePattern.test(phone)) return showError("Please enter a valid phone number.");
        if (date && new Date(date) < new Date(new Date().setHours(0,0,0,0))) return showError("Reservation date must be in the future.");

        modalText.textContent = `Thank you, ${name}! Your reservation has been confirmed.`;
        modal.style.display = "flex";
        form.reset();
        formMessage.textContent = "";

        function showError(msg) {
            formMessage.style.color = "#E76F51";
            formMessage.textContent = msg;
        }
    });
}

modalClose?.addEventListener("click", () => modal.style.display = "none");
modalOk?.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });
