function f() {
    for (let i=0; i<4; i++)
    {
        let x = window.prompt("write something: ");
        console.log(x, typeof x);
    }
}


function funkcja_zwrotna(){
    let tekst = document.forms.test.elements.pole_tekstowe.value;
    let liczba = document.forms.test.elements.pole_liczbowe.value;

    console.log("wczytanaWartoscZPolaTekstowego: " + tekst + ":" + typeof(tekst));
    console.log("wczytanaWartoscZPolaNumerycznego: " + liczba + ":" + typeof(parseInt(liczba)));

}