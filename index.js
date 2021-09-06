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
    let sessionDay = 4;//===>Jueves
    const sessionHour = "19:45:00";//===>7:45PM

    if(moment().day()>sessionDay) sessionDay += 7;
    let nextDay= moment().day(sessionDay)._d.toISOString().substring(0,10);
    let sesion = moment(`${nextDay}T${sessionHour}-05:00`);

    if(moment()>sesion) sessionDay += 7;
    nextDay= moment().day(sessionDay)._d.toISOString().substring(0,10);
    sesion = moment(`${nextDay}T${sessionHour}-05:00`);

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


    const getCalenderFile = () => {
        const icsMSG =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:david.orjuela@clubsinergia.org-wiserclick®
CALSCALE:GREGORIAN
BEGIN:VTIMEZONE
TZID:America/Bogota
LAST-MODIFIED:20201011T015911Z
TZURL:http://tzurl.org/zoneinfo-outlook/America/Bogota
X-LIC-LOCATION:America/Bogota
BEGIN:STANDARD
TZNAME:-05
TZOFFSETFROM:-0500
TZOFFSETTO:-0500
DTSTART:19700101T000000
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
DTSTAMP:20210821T165211Z
UID:${moment()._d.toISOString()}-www.clubsinergia.org
DTSTART;TZID=America/Bogota:20210826T194500
RRULE:FREQ=WEEKLY;BYDAY=TH
DTEND;TZID=America/Bogota:20210826T211500
SUMMARY;LANGUAGE=es:Sesión del Club Toastmasters Sinergia.
    Oratoria y liderazgo.
URL:https://us02web.zoom.us/j/82139677240
DESCRIPTION;LANGUAGE=es:Club Toastmasters Sinergia,
    donde los líderes se hacen.
LOCATION;LANGUAGE=es:Bogotá- Colombia
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION;LANGUAGE=es:Sesión del Club Toastmasters Sinergia
TRIGGER:-PT15M
END:VALARM
END:VEVENT
END:VCALENDAR`;
        return icsMSG;
    };
    const recordatorio =document.getElementById("recordatorio");
    recordatorio.addEventListener('click',() => {
        window.open('data:text/calendar;charset=utf-8,' + getCalenderFile());
    });

    //Pestañas
    function easyTabs() {
        var tabs = document.querySelectorAll('.tab');
        var secciones = document.querySelectorAll('section');

        for (t = 0; t < tabs.length; t++) {
            tabs[t].setAttribute("index", t+1);
            if (t == 0) tabs[t].className = "tab selected";
            }

        for (c = 0; c < secciones.length; c++) {
            secciones[c].setAttribute("index", c+1);
            secciones[c].style.display="none";
            if (c == 0) secciones[c].style.display="flex";
            }

        for (i = 0; i < tabs.length; i++) {
            tabs[i].onclick = function() {
                menu.style.left="-12rem";
                var tSiblings = this.parentElement.children;
                for (i = 0; i < tSiblings.length; i++) {
                    tSiblings[i].className = "tab";
                }
                this.className = "tab selected";
                var idx = this.getAttribute("index");

                for (i = 0; i < secciones.length; i++) {
                    secciones[i].style.display="none";
                    if (secciones[i].getAttribute("index") == idx) {
                        secciones[i].style.display="flex";
                    }
                }
            };
        }
    }
    easyTabs();

    function easyQuestions() {
        var questions = document.querySelectorAll('.pregunta');
        var answers = document.querySelectorAll('.respuesta');

        for (t = 0; t < questions.length; t++) {
            questions[t].setAttribute("index", t+1);
            }

        for (c = 0; c < answers.length; c++) {
            answers[c].setAttribute("index", c+1);
            }

        for (i = 0; i < questions.length; i++) {
            questions[i].onclick = function() {
                var idx = this.getAttribute("index");
                for (i = 0; i < answers.length; i++) {
                    if (answers[i].getAttribute("index") == idx) {
                        answers[i].clientHeight==0 ?
                        answers[i].style.maxHeight="500px" :
                        answers[i].style.maxHeight="0" ;
                    }
                    else{
                        answers[i].style.maxHeight="0" ;
                    }
                }
            };
        }
    }
    easyQuestions();
}

