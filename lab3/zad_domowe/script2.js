
const concertContent = [
    "Natenczas Wojski chwycił na taśmie przypięty Swój róg bawoli, długi, cętkowany, kręty Jak wąż boa, oburącz do ust go przycisnął, Wzdął policzki jak banię, w oczach krwią zabłysnął, Zasunął wpół powieki, wciągnął w głąb pół brzucha I do płuc wysłał z niego cały zapas ducha, I zagrał: róg jak wicher, wirowatym dechem Niesie w puszczę muzykę i podwaja echem.",
    "Umilkli strzelcy, stali szczwacze zadziwieni Mocą, czystością, dziwną harmoniją pieni. Starzec cały kunszt, którym niegdyś w lasach słynął, Jeszcze raz przed uszami myśliwców rozwinął; Napełnił wnet, ożywił knieje i dąbrowy, Jakby psiarnię w nie wpuścił i rozpoczął łowy.",
    "Bo w graniu była łowów historyja krótka: Zrazu odzew dźwięczący, rześki: to pobudka; Potem jęki po jękach skomlą: to psów granie; A gdzieniegdzie ton twardszy jak grzmot: to strzelanie."
];

let paragraphIndex = 0;

document.getElementById('btnAdd').addEventListener('click', function() {
    if (paragraphIndex < concertContent.length) {
        const paragraph = document.createElement('p');
        paragraph.textContent = concertContent[paragraphIndex];
        document.querySelector('main').appendChild(paragraph);
        paragraphIndex++;

        // Check if all paragraphs have been added
        if (paragraphIndex >= concertContent.length) {
            this.disabled = true; // Disable the "Add" button if no more paragraphs to add
        }
    }
});

document.getElementById('btnSet').addEventListener('click', function() {
    document.querySelectorAll('.azure').forEach(element => {
        element.style.backgroundColor =  '#EFF';
        element.style.border = '1px solid #A8A8A8';
        element.style.margin = '0';
        element.style.padding = '3vw';
        element.style.boxShadow = '0 0 5px 0';
    });

    document.querySelectorAll('.h1,.h2').forEach(element => {
        element.style.fontSize = '6vw';
        element.style.margin = '0';

    });

    document.querySelectorAll('.a,.li').forEach(element => {
        element.style.fontSize = '4vw';

    });

    document.querySelectorAll('.ul').forEach(element => {
        element.style.margin = '0 4vw';
        element.style.padding = '1vw';

    });

    // document.querySelectorAll('.split-container, .vertical-container, main').forEach(element => {
    //     element.style.display = 'flex';
    //     element.style.flexDirection = 'column';
    // });

    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.documentElement.style.width = '100%';
    document.body.style.width = '100%';

    document.querySelectorAll('aside, footer, header,nav').forEach(element => {
        element.style.width = '100%';
    });


    if (window.innerWidth >= 600) {
        document.querySelectorAll('.container').forEach(element => {
            element.style.display = 'flex';
            element.style.justifyContent = 'space-between';
            element.style.flexWrap = 'wrap';

        });

        document.querySelectorAll('#right').forEach(element => {
            element.style.width = '50%';
            element.style.alignItems = 'start';
        });

        document.querySelectorAll('.left').forEach(element => {
            element.style.width = '50%';
            element.style.display = 'grid';
            element.style.alignItems = 'start';
            element.style.justifyContent = 'left';

        });

        document.querySelectorAll('.h1,.h2').forEach(element => {
            element.style.fontSize = 'xx-large';
        });

        document.querySelectorAll('.a,.li').forEach(element => {
            element.style.fontSize = 'medium';
        });

        document.querySelector('main').style.width = '85%';

        document.querySelectorAll('nav').forEach(element => {
            element.style.width = 'fit-content';
        });

        document.querySelectorAll('.azure').forEach(element => {
            element.style.margin = '10px 25px 10px 25px';
            element.style.padding = '10px 10px 10px 10px';
        });

    }

});

document.getElementById('btnDelete').addEventListener('click', function() {
    // Usuwanie stylów dla .container-style
    document.querySelectorAll('.container-style').forEach(element => {
        element.removeAttribute('style');
    });

    // Usuwanie stylów dla .split-container, .vertical-container, main
    document.querySelectorAll('.split-container, .vertical-container, main').forEach(element => {
        element.removeAttribute('style');
    });

    // Resetowanie stylów html i body (jeśli były ustawione przez JavaScript)
    document.documentElement.removeAttribute('style');
    document.body.removeAttribute('style');

    // Usuwanie stylów dla aside, footer, header
    document.querySelectorAll('aside, footer, header').forEach(element => {
        element.removeAttribute('style');
    });

    // Usuwanie stylów dla nav
    document.querySelectorAll('nav').forEach(element => {
        element.removeAttribute('style');
    });

});




document.querySelector('main').textContent = '';
document.getElementById('btnAdd').disabled = false;
