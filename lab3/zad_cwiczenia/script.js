"use strict";

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
