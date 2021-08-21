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
    let sessionDay = 6;//===>Jueves
    const sessionHour = "10:30:00";//===>7:45PM

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
        const startDateTime = "20200403T170000";
        const endDateTime = "20200403T180000";
        const datetime = "Friday, 3rd April 2020, 5pm";
        const location = "XXX street";
        const icsMSG = 'BEGIN:VCALENDAR\nPRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN\nVERSION:2.0\nMETHOD:REQUEST\nX-MS-OLK-FORCEINSPECTOROPEN:TRUE\nBEGIN:VEVENT\nDESCRIPTION:When: ' + datetime + ';Where: ' + location + '\nDTSTART;TZID="China/Beijing":' + startDateTime + '\nDTEND;TZID="China/Beijing":' + endDateTime + '\nLOCATION:' + location + '\nSUMMARY;LANGUAGE=en-sg:You have a appointment\nX-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE\nX-MICROSOFT-CDO-IMPORTANCE:1\nX-MICROSOFT-CDO-INTENDEDSTATUS:BUSY\nX-MICROSOFT-DISALLOW-COUNTER:FALSE\nX-MS-OLK-CONFTYPE:0\nBEGIN:VALARM\nTRIGGER:-PT15M\nACTION:DISPLAY\nDESCRIPTION:Reminder\nEND:VALARM\nEND:VEVENT\nEND:VCALENDAR\n';
        return icsMSG;
    /**
    BEGIN:VCALENDAR
    PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN
    VERSION:2.0
    METHOD:REQUEST
    X-MS-OLK-FORCEINSPECTOROPEN:TRUE
    BEGIN:VEVENT
    DESCRIPTION:When: Friday, 3rd April 2020, 5pm;Where: XXX street
    DTSTART;TZID="China/Beijing":20200403T170000
    DTEND;TZID="Australia/Sydney":20200403T180000
    LOCATION:XXX street
    SUMMARY;LANGUAGE=en-sg:You have a appointment
    X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
    X-MICROSOFT-CDO-IMPORTANCE:1
    X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
    X-MICROSOFT-DISALLOW-COUNTER:FALSE
    X-MS-OLK-CONFTYPE:0
    BEGIN:VALARM
    TRIGGER:-PT15M
    ACTION:DISPLAY
    DESCRIPTION:Reminder
    END:VALARM
    END:VEVENT
    END:VCALENDAR
    */
    };
    const recordatorio =document.getElementById("politicas");
    recordatorio.addEventListener('click',() => {
        window.open('data:text/calendar;charset=utf8,' + escape(getCalenderFile()));
    });
}

