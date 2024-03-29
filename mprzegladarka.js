"use strict";

const obrazki = ["bluzka", "chleb", "choinka", "cukierki", "czajnik", "czekolada", "dziewczynka", "długopis", "grzebień", "jabłko",
    "klocki", "kot", "kredki", "krzesło", "książka", "lampa", "miotła", "miś", "myszka", "młotek", "nożyczki", "nóż", "odkurzacz", "okno",
    "okulary", "ołówek", "pies", "pilot", "piłka", "poduszka", "pomidory", "ręcznik", "spodnie", "słodycze", "talerz", "widelec", "wieża",
    "zebra", "zegar", "łyżka"
];

let CURR_NROBR = null; //numer pokazywanego obrazka
let pctArea = null;    //miejsce na planszy (div) na obrazek
let bWpieriod = null;  //klawisz bWpieriod
let bNazad = null;     //klawisz bNazad
let bLewy  = null;     //j.w. analogicznie
let bPrawy = null;     //j.w. analogicznie
const PCT_DELAY = 1000; //opoznienie w pokazywaniu obrazka

//-----------------------------------------------------//
window.onload = Inicjacja; //--------------------------//
//-----------------------------------------------------//


function Inicjacja() {
    //-------------------------------------------------------------------------------------
    //Inicjowanie wartosci zmiennych oraz czynnosci poczatkowe przy otwieraniu plansza.html
    //-------------------------------------------------------------------------------------
    pctArea = document.getElementById("pctArea");   //uchwyt do obrazka
    bWpieriod = document.getElementById("bWpieriod"); //uchwyt do klawisza bWpieriod
    bNazad = document.getElementById("bNazad");    //uchwyt do klawisza bNazad
    bLewy  = document.getElementById("bLewy");     //j.w. analogicznie
    bPrawy = document.getElementById("bPrawy");    //j.w. analogicznie
    //
    CURR_NROBR = getRandomIntInclusive(0, obrazki.length - 1);
    ustawObrazek();
    pokazKlawisze(1.0*PCT_DELAY);
}

function pokazKlawisze(delay) {
    setTimeout(()=>document.getElementById("btnsArea").style.visibility = "visible" , delay);
}

function ustawObrazek() {
    //---------------------------    
    //Funckcja :
    //0.Czysci stary obrazek (efekciarstwo)
    //1.Pokazuje nowy obrazek
    //2.Odgrywa nazwę obrazka
    //3.Ustawia onclik na obrazku, tak zeby mozliwe bylo jego JEDNORAZOWE odegranie
    //---------------------------
    //czyszczenie starego (dla efektu)
    pctArea.style.backgroundImage = "url(zasoby/tlo.webp)";
    //Pokazanie po lekkim opoznieniu (efekciarstwo):
    var pctName = obrazki[CURR_NROBR];
    setTimeout(() => (pctArea.style.backgroundImage = "url(zasoby/" + pctName + ".webp)"), PCT_DELAY);
    //jednorazowy listener i pointer na obrazku:
    setTimeout(() => (pctArea.style.cursor = "pointer"), 2 * PCT_DELAY);
    pctArea.onclick = function () { odegrajPlik(pctName + ".ogg", 0); pctArea.onclick = null; pctArea.style.cursor = "auto"; }
    //
    odegrajPlik(pctName + ".ogg", 2*PCT_DELAY);
}

function dajNextPicture() {
    CURR_NROBR++;
    if (CURR_NROBR===obrazki.length) CURR_NROBR = 0;
    blokujKlawiszeNaChwile(3*PCT_DELAY);
    ustawObrazek();
}

function dajPrevPicture() {
    CURR_NROBR--;
    if (CURR_NROBR===-1) CURR_NROBR = obrazki.length-1;
    blokujKlawiszeNaChwile(3*PCT_DELAY);
    ustawObrazek();
}

function blokujKlawiszeNaChwile(chwila) {
    //---------------------------------------
    //zabezpieczenie przed bezmyslnym klikaniem
    //---------------------------------------
    bWpieriod.onclick = null;
    bNazad.onclick    = null;
    bPrawy.onclick = null;
    bLewy.onclick  = null;
    //
    bWpieriod.style.cursor = "default";
    bNazad.style.cursor    = "default";
    bPrawy.style.cursor = "default";
    bLewy.style.cursor  = "default";
    //
    setTimeout(przywrocHandlery, chwila);
}

let przywrocHandlery = function() {
    bWpieriod.style.cursor = "pointer";
    bNazad.style.cursor    = "pointer";
    bPrawy.style.cursor = "pointer";
    bLewy.style.cursor  = "pointer";
    //    
    bWpieriod.onclick = dajNextPicture;
    bNazad.onclick    = dajPrevPicture;
    bPrawy.onclick = dajNextPicture;
    bLewy.onclick  = dajPrevPicture;
}

function odegrajPlik(plik, delay) {
    var plikSnd = new Audio("zasoby/" + plik);
    // setTimeout(() => plikSnd.play(), delay);
    setTimeout( function() {plikSnd.play();}, delay);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}