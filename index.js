window.onload = function (){
    const menu_open = document.getElementById("menu-button");
    const menu_close = document.getElementById("menu-close");
    const menu = document.getElementsByTagName("nav")[0];

    menu_open.addEventListener('click', () => {
        menu.style.display="inline";
    });

    menu_close.addEventListener('click', () => {
        menu.style.display="none";
    });
}
