/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;

document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
});


function animateFollower() {

    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";

    requestAnimationFrame(animateFollower);
}

animateFollower();


/* =========================================
   CURSOR HOVER EFFECT
========================================= */

const interactiveElements =
    document.querySelectorAll("a, button, input, textarea");

interactiveElements.forEach(element => {

    element.addEventListener("mouseenter", () => {

        follower.style.width = "55px";
        follower.style.height = "55px";

        follower.style.background =
            "rgba(124,92,255,.08)";
    });

    element.addEventListener("mouseleave", () => {

        follower.style.width = "35px";
        follower.style.height = "35px";

        follower.style.background = "transparent";
    });

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   NAVIGATION ACTIVE STATE
========================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 700) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   PARALLAX EFFECT
========================================= */

const orbs =
    document.querySelectorAll(".floating-orb");


window.addEventListener("mousemove", (e) => {

    const x =
        (e.clientX / window.innerWidth - 0.5);

    const y =
        (e.clientY / window.innerHeight - 0.5);


    orbs.forEach((orb, index) => {

        const speed =
            (index + 1) * 15;

        orb.style.transform =
            `translate(${x * speed}px,
                       ${y * speed}px)`;

    });

});


/* =========================================
   CARD TILT EFFECT
========================================= */

const cards =
    document.querySelectorAll(".project-card");


cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect =
            card.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -3;

        const rotateY =
            ((x - centerX) / centerX) * 3;


        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "";

    });

});


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn =
    document.querySelector(".menu-btn");

const nav =
    document.querySelector(".navbar nav");


menuBtn.addEventListener("click", () => {

    nav.classList.toggle("mobile-open");

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("mobile-open");

    });

});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const formData =
        new FormData(contactForm);

    const name =
        formData.get("name");

    const email =
        formData.get("email");

    const subject =
        formData.get("subject");

    const message =
        formData.get("message");


    const emailBody =

        `Hello Ajay,%0D%0A%0D%0A` +

        `Name: ${encodeURIComponent(name)}%0D%0A` +

        `Email: ${encodeURIComponent(email)}%0D%0A%0D%0A` +

        `${encodeURIComponent(message)}`;


    const mailto =
        `mailto:your-email@gmail.com` +
        `?subject=${encodeURIComponent(subject || "Portfolio Contact")}` +
        `&body=${emailBody}`;


    window.location.href = mailto;

});


/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================
   SMOOTH NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener("click", function(e) {

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });
