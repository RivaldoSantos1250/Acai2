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
    const navItems = $(".nav_item");
    $(window).on("scroll", function () {
        const header = $("header");

        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css("box-shadow", "none");
        } else {
            header.css("box-shadow", "5px 1px 5px rgba(0, 0, 0, 0.1)");
        }
        sections.each(function(i) {
            const section = $(this)
            const sectionTop = section,offset().top -92
        })
    });
});
