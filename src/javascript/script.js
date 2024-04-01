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

    ScrollReveal().reveal(".home-title", {
        origin: "left",
        duration: 1000,
    });

    ScrollReveal().reveal(".home-img", {
        origin: "right",
        distance: "20%",
        duration: 2000,
    });

    ScrollReveal().reveal(".main_btn", { delay: 500, duration: 500 });

    ScrollReveal().reveal(".section-tagline", { delay: 200, duration: 1000 });
    ScrollReveal().reveal(".section-title", { delay: 400, duration: 1000 });

    ScrollReveal().reveal("#card-one", {
        delay: 300,
    });
    ScrollReveal().reveal("#card-two", {
        delay: 400,
    });
    ScrollReveal().reveal("#card-three", {
        delay: 500,
    });

    ScrollReveal().reveal(".about-text", {
        duration: 1000,
        distance: "20%",
    });

    ScrollReveal().reveal(".about-img", {
        origin: "left",
        duration: 1000,
        distance: "20%",
    });

    ScrollReveal().reveal(".section-title1", { delay: 400, duration: 1000 });
    ScrollReveal().reveal(".section-subtitle", { delay: 500, duration: 1000 });

    ScrollReveal().reveal("#dishes", {
        origin: "left",
        duration: 1000,
        distance: "20%",
    });

    ScrollReveal().reveal(".heading", { delay: 500, duration: 1000 });
    ScrollReveal().reveal(".customers-container", {
        origin: "left",
        duration: 1000,
        distance: "20%",
    });
});
