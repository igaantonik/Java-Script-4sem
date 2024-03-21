"use strict";

function executeCommands() {
    var commandsTextarea = document.getElementById('commandsTextarea');
    var resultCanvas = document.getElementById('resultCanvas');
    var ctx = resultCanvas.getContext('2d');
    ctx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);

    // Pobieranie komend z obszaru tekstowego
    var commands = commandsTextarea.value.split('\n');

    // Przykładowe wykonanie komend i wypisanie na płótnie
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';

    // Wykonanie komend i wypisanie na płótnie
    for (var i = 0; i < commands.length; i++) {
        var command = commands[i].trim();

        // Przykładowe wykonanie komendy
        if (command.startsWith('Wynajęcie pokoju')) {
            ctx.fillText('Pokój wynajęty!', 50, 50 + i * 30);
        } else if (command.startsWith('Wyświetlenie listy aktualnych gości')) {
            ctx.fillText('Lista gości: ...', 50, 50 + i * 30);
        } else if (command.startsWith('Wyświetlenie wykazu wynajęć')) {
            ctx.fillText('Wykaz wynajęć: ...', 50, 50 + i * 30);
        } else if (command.startsWith('Wyświetlenie stanu "hotelu"')) {
            ctx.fillText('Stan hotelu: ...', 50, 50 + i * 30);
        } else {
            console.warn('Nieznana komenda: ' + command);
        }
    }
}


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.arc(50,50, 50, 0, Math.PI * 2, true);
ctx.stroke();
ctx.fillStyle = "rgba(154,215,201,0.78)";
ctx.fill();
ctx.fillStyle = "#8B4513";
ctx.fillRect(canvas.width / 2 - 5, canvas.height - 20, 10, 20);
ctx.fillStyle = "#008000";
ctx.beginPath();
ctx.moveTo((canvas.width / 2) , 10);
ctx.lineTo((canvas.width / 2) - 30 , canvas.height - 20);
ctx.lineTo((canvas.width / 2) + 30 , canvas.height - 20);
ctx.closePath();
ctx.fill();
