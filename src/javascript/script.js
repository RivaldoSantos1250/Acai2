const btnMenu = document.querySelector(".btn_menu");
const btnMenuIcon = document.querySelector(".btn_menu i");
const dropMenu = document.querySelector(".drop_menu");

btnMenu.onclick = function () {
    dropMenu.classList.toggle("open");
    const isOpen = dropMenu.classList.contains("open");

    btnMenuIcon.classList = isOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars';
};
