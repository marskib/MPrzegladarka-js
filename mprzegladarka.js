"use strict";

let obrazki = ["bluzka", "chleb", "choinka", "cukierki", "czajnik", "czekolada", "dziewczynka", "długopis", "grzebień", "jabłko",
    "klocki", "kot", "kredki", "krzesło", "książka", "lampa", "miotła", "miś", "myszka", "młotek", "nożyczki", "nóż", "odkurzacz", "okno",
    "okulary", "ołówek", "pies", "pilot", "piłka", "poduszka", "pomidory", "ręcznik", "spodnie", "słodycze", "talerz", "widelec", "wieża",
    "zebra", "zegar", "łyżka"
];

let CURR_NROBR = null; //numer pokazywanego obrazka
let pctArea = null; //miejsce na planszy (div) na obrazek
let bWpieriod = null; //klawisz bWpieriod
let bNazad = null; //klawisz bNazad
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
    //
    CURR_NROBR = getRandomIntInclusive(0, obrazki.length - 1);
    ustawObrazek();
}

function ustawObrazek() {
    //---------------------------    
    //Funckcja :
    //0.Czysci stary obrazek (efekciarstwo)
    //2.Odgrywa nazwę obrazka
    //3.Ustawia onclik na obrazku, tak zeby mozliwe bylo jego JEDNORAZOWE odegranie
    //---------------------------
    //czyszczenie starego (dla efektu)
    pctArea.style.backgroundImage = "url(zasoby/tlo.webp)";
    //losowanie obrazka:
    var pctName = obrazki[CURR_NROBR];
    //Pokazanie po lekkim opoznieniu (efekciarstwo):
    setTimeout(() => (pctArea.style.backgroundImage = "url(zasoby/" + pctName + ".webp)"), PCT_DELAY);
    //jednorazowy listener i pointer na obrazku:
    setTimeout(() => (pctArea.style.cursor = "pointer"), 2 * PCT_DELAY);
    pctArea.onclick = function () { odegrajPlik(pctName + ".ogg", PCT_DELAY); pctArea.onclick = null; pctArea.style.cursor = "auto"; }
    odegrajPlik(pctName + ".ogg", PCT_DELAY);
}

function dajNextPicture() {
    CURR_NROBR++;
    if (CURR_NROBR===obrazki.length) CURR_NROBR = 0;
    ustawObrazek();
}

function dajPrevPicture() {
    CURR_NROBR--;
    if (CURR_NROBR===-1) CURR_NROBR = obrazki.length-1;
    ustawObrazek();
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