window.onload = function (){
    const menu_open = document.getElementById("menu-button");
    const menu_close = document.getElementById("menu-close");
    const menu = document.getElementsByTagName("nav")[0];

    menu_open.addEventListener('click', () => {
        menu.style.left="0";
    });

    menu_close.addEventListener('click', () => {
        menu.style.left="-12rem";
    });

    const dias = document.getElementById("dias");
    const horas = document.getElementById("horas");
    const minutos = document.getElementById("minutos");
    let sesion = moment('2021-08-19T19:45:00-05:00');

    const myInterval = setInterval(() => {
        let now = moment();
        let min = sesion.diff(now,'m');
        let hor = Math.trunc(min/60);
        let dia = Math.trunc(hor/24);
        hor = hor-dia*24;
        min=min-hor*60-dia*24*60;
        dias.innerHTML=dia;
        hor<10? horas.innerHTML='0'+hor : horas.innerHTML=hor;
        min<10? minutos.innerHTML='0'+min : minutos.innerHTML=min;

    }, 1000);
}
