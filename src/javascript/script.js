const btnMenu = document.querySelector(".btn_menu");
const btnMenuIcon = document.querySelector(".btn_menu i");
const dropMenu = document.querySelector(".drop_menu");

btnMenu.onclick = function () {
    dropMenu.classList.toggle("open");
    const isOpen = dropMenu.classList.contains("open");

    btnMenuIcon.classList = isOpen ? "fa-solid fa-times" : "fa-solid fa-bars";
};

$(document).ready(function () {
    const sections = $("section");
    const navLink = $(".nav_link");
    $(window).on("scroll", function () {
        const header = $("header");

        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css("box-shadow", "none");
        } else {
            header.css("box-shadow", "5px 1px 5px rgba(0, 0, 0, 0.1)");
        }
        sections.each(function (i) {
            const section = $(this);
            const sectionTop = section.offset().top - 490;
            const sectionBottom = sectionTop + section.outerHeight();

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                activeSectionIndex = i;
                return false;
            }
        });

        navLink.removeClass("active");
        $(navLink[activeSectionIndex]).addClass("active");
    });

    ScrollReveal().reveal(".main_content", {
        origin: "left",
        duration: 2000,
    });

    ScrollReveal().reveal(".main_img", {
        origin: "right",
        duration: 3000,
    });
    ScrollReveal().reveal(".main_btn", { delay: 1200, duration: 1000 });

    ScrollReveal().reveal(".section-tagline", { delay: 500, duration: 1000 });
    ScrollReveal().reveal(".section-title", { delay: 700, duration: 1000 });

    ScrollReveal().reveal("#card-one", {
        delay: 600,
    });
    ScrollReveal().reveal("#card-two", {
        delay: 700,
    });
    ScrollReveal().reveal("#card-three", {
        delay: 800,
    });

    ScrollReveal().reveal(".about-text", {
        origin: "right",
        duration: 2000,
        distance: "20%",
    });

    ScrollReveal().reveal(".about-img", {
        origin: "left",
        duration: 2000,
        distance: "20%",
    });

    ScrollReveal().reveal(".section-title1", { delay: 500, duration: 1000 });
    ScrollReveal().reveal(".section-subtitle", { delay: 1000, duration: 1000 });

    ScrollReveal().reveal("#dishes", {
        origin: "left",
        duration: 2000,
        distance: "20%",
    });

    ScrollReveal().reveal(".heading", { delay: 500, duration: 1000 });
    ScrollReveal().reveal(".customers-container", {
        origin: "left",
        duration: 2000,
        distance: "20%",
    });
});
