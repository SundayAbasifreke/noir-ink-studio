const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  document.addEventListener("click", (event) => {
    if (
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ========================================
   INTERACTIVE SERVICES IMAGE REVEAL
======================================== */

const serviceItems = document.querySelectorAll(".service-item");
const servicesImageFrame = document.getElementById("servicesImageFrame");
const servicesPreviewImage = document.getElementById("servicesPreviewImage");
const servicesImageLabel = document.getElementById("servicesImageLabel");
const servicesImagePlaceholder = document.getElementById("servicesImagePlaceholder");

let currentServiceImage = "";
let imageSwitchTimeout;

function showServiceImage(item) {
    const imageUrl = item.dataset.image;
    const serviceName = item.querySelector("h3").textContent;

    if (!imageUrl) return;

    // Highlight the selected service
    serviceItems.forEach(service => {
        service.classList.remove("active");
    });

    item.classList.add("active");

    // Don't reload the same image
    if (currentServiceImage === imageUrl) return;

    currentServiceImage = imageUrl;

    clearTimeout(imageSwitchTimeout);

    // Fade out the current image
    servicesPreviewImage.classList.remove("image-visible");

    // Hide the initial placeholder
    servicesImagePlaceholder.classList.add("hidden");

    servicesImageFrame.classList.add("visible");

    imageSwitchTimeout = setTimeout(() => {
        servicesPreviewImage.onload = () => {
            servicesImageLabel.textContent = serviceName;

            requestAnimationFrame(() => {
                servicesPreviewImage.classList.add("image-visible");
            });
        };

        servicesPreviewImage.onerror = () => {
            console.warn("Could not load service image:", imageUrl);
            servicesImageFrame.classList.remove("visible");
            servicesImagePlaceholder.classList.remove("hidden");
            currentServiceImage = "";
        };

        servicesPreviewImage.src = imageUrl;

        // Handle an image already cached by the browser
        if (servicesPreviewImage.complete && servicesPreviewImage.naturalWidth > 0) {
            servicesImageLabel.textContent = serviceName;
            servicesPreviewImage.classList.add("image-visible");
        }

    }, 300);
}

// Desktop: reveal image when cursor enters a service
serviceItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
        showServiceImage(item);
    });

    // Keyboard accessibility
    item.addEventListener("focus", () => {
        showServiceImage(item);
    });

    // Mobile: reveal image when a service is tapped
    item.addEventListener("click", () => {
        showServiceImage(item);
    });
});

/* ========================================
   BOOKING FORM TO WHATSAPP
======================================== */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("clientName").value.trim();
        const email = document.getElementById("clientEmail").value.trim();
        const style = document.getElementById("tattooStyle").value;
        const placement = document.getElementById("tattooPlacement").value.trim();
        const date = document.getElementById("preferredDate").value;
        const description = document.getElementById("tattooDescription").value.trim();

        const message = `Hello NOIR INK STUDIO!

I would like to make a tattoo booking enquiry.

Name: ${name}
Email: ${email}
Preferred Style: ${style}
Body Placement: ${placement}
Preferred Date: ${date || "Flexible"}

Tattoo Idea:
${description}

I look forward to hearing from you.`;

        // Replace this with the studio's actual WhatsApp number.
        const whatsappNumber = "2349034445157";

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");
    });
}

/* Automatic Footer Year */

const footerYear = document.getElementById("footerYear");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}