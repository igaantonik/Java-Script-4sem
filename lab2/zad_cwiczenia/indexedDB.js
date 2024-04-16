'use strict';

initDatabase();
let db;
function initDatabase() {
    let request = indexedDB.open("Hotel", 1);

    request.onupgradeneeded = function (event) {
        console.log("upgrade")
        db = event.target.result;
        if (!db.objectStoreNames.contains("Rooms")) {
            db.createObjectStore("Rooms", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("Reservations")) {
            db.createObjectStore("Reservations", { keyPath: "id", autoIncrement: true });
        }

        const transaction = db.transaction("Rooms", "readwrite");
        const objectStore = transaction.objectStore("Rooms");
        objectStore.put({id: 1, number: "101", beds: "2", price: 200});
        objectStore.add({id: 2, number: "102", beds: "2", price: 200});
        objectStore.add({id: 3, number: "103", beds: "3", price: 250});
        objectStore.add({id: 4, number: "104", beds: "4", price: 300});
        objectStore.add({id: 5, number: "105", beds: "5", price: 350});
     };

    request.onerror = function (event) {
        console.error("An error occurred with IndexedDB");
        console.error(event);
    };

    request.onsuccess = function () {
        db = request.result;
        console.log("Database opened successfully");
    };
}


function addReservation(ctx,room, requestedArrivalDate, requestedCheckoutDate, guest) {

    const transaction = db.transaction("Reservations", "readwrite");
    const store = transaction.objectStore("Reservations");

    let available = true;
    let start = new Date(requestedArrivalDate);
    let end = new Date(requestedCheckoutDate);
    store.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            const reservation = cursor.value;
            if (reservation.room === room) {
                const reservationArrivalDate = new Date(reservation.arrivalDate);
                const reservationCheckoutDate = new Date(reservation.checkoutDate);

                if ((start <= reservationArrivalDate && end >= reservationCheckoutDate) ||
                    (end >= reservationArrivalDate && end <= reservationCheckoutDate)||
                    (start >= reservationArrivalDate && start <= reservationCheckoutDate)){
                    available = false;
                    console.error("Room is not available for the requested dates");
                    ctx.fillText('Pokój niedostępny!', 50, 50);
                    return 0;
                }
            }
            cursor.continue();
        } else {
            if(available){
                store.put({guest: guest, room: room , arrivalDate: requestedArrivalDate,checkoutDate: requestedCheckoutDate});
                return 1;
            }
        }
    };
}


function listRoomsAll(ctx,i) {
    const transaction = db.transaction("Rooms");
    const store = transaction.objectStore("Rooms");

    store.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            i++
            console.log(cursor.value);
            ctx.fillText(cursor.value.number, 50, 50 + i * 20);
            ctx.fillText("Łóżka: ", 110, 50 + i * 20);
            ctx.fillText(cursor.value.beds, 160, 50 + i * 20);
            cursor.continue();
        } else {
            console.log("End of room list.");
        }
    };
}

function listGuestsNow(ctx,i) {
    const transaction = db.transaction("Reservations");
    const store = transaction.objectStore("Reservations");

    store.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            let start = new Date(cursor.value.arrivalDate);
            let end = new Date(cursor.value.checkoutDate);
            if(start<= new Date() && end >=new Date() ){
                i++
                console.log(cursor.value);
                ctx.fillText(cursor.value.guest, 50, 50 + i * 20);
            }

            cursor.continue();
        } else {
            console.log("End of Guest list.");
        }
    };
}

function listGuestReservations(ctx,i,guest) {
    const transaction = db.transaction("Reservations");
    const store = transaction.objectStore("Reservations");

    store.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            if(cursor.value.guest === guest ){
                i++
                console.log(cursor.value);
                ctx.fillText("pokój:", 50, 50 + i * 20);
                ctx.fillText(cursor.value.room, 100, 50 + i * 20);
                ctx.fillText("od: ", 130, 50 + i * 20);
                ctx.fillText(cursor.value.arrivalDate, 160, 50 + i * 20);
                ctx.fillText("do: ", 250, 50 + i * 20);
                ctx.fillText(cursor.value.checkoutDate, 280, 50 + i * 20);
            }

            cursor.continue();
        } else {
            console.log("End of Guests Reservations list.");
        }
    };
}


function showHotelStatus(db) {
    const transaction = db.transaction(["Rooms", "Reservations"], "readonly");
    const roomsStore = transaction.objectStore("Rooms");
    const reservationsStore = transaction.objectStore("Reservations");
    const now = new Date();
    let totalRooms = 0;
    let rentedRooms = new Set();

    roomsStore.count().onsuccess = function (event) {
        totalRooms = event.target.result;
    };

    reservationsStore.openCursor().onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
            if (new Date(cursor.value.arrivalDate) <= now && new Date(cursor.value.checkoutDate) >= now) {
                rentedRooms.add(cursor.value.room);
            }
            cursor.continue();
        } else {
            displayHotelStatusOnCanvas(totalRooms, rentedRooms);
        }
    };
}

function displayHotelStatusOnCanvas(totalRooms, rentedRooms) {
    console.log(rentedRooms);
    const size = rentedRooms.size;
    const availableRooms = totalRooms - size;
    const canvas = document.getElementById('resultCanvas');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '16px Arial';
        ctx.fillStyle = '#000';

        ctx.fillText(`Całkowita liczba pokoi: ${totalRooms}`, 10, 20);
        ctx.fillText(`Liczba wynajętych pokoi: ${size}`, 10, 40);
        // ctx.fillText(`Zajęte pokoje: ${rentedRooms}`,10,60)
        ctx.fillText(`Liczba dostępnych pokoi: ${availableRooms}`, 10, 80);
    } else {
        console.error('Twoja przeglądarka nie obsługuje elementu canvas.');
    }
}


function executeCommands() {
    var commandsTextarea = document.getElementById('commandsTextarea').value.trim();
    var resultCanvas = document.getElementById('resultCanvas');
    var ctx = resultCanvas.getContext('2d');
    ctx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);

    var commands = commandsTextarea.split(" ");
    console.log((commands));
    ctx.font = '15px Arial';
    ctx.fillStyle = 'black';


    switch (commands[0].toLowerCase()) {
        case "wynajmij":
            // komenda: "wynajmij {numer pokoju} {data początkowa} {data końcowa} {nazwa użytkownika}"
            if (commands.length === 6) {
                let name = commands[4] + " " + commands[5];
                addReservation(ctx,commands[1],commands[2],commands[3],name);
                ctx.fillText('Pokój wynajęty!', 50, 50);
            } else {
                console.log(commands.length);
                ctx.fillText("Niepoprawna komenda wynajmu.", 10, 50);
            }
            break;

        case "goscie":
            if (commands.length === 1){
                ctx.fillText('Lista gości:', 50, 50);
                listGuestsNow(ctx,0);
            }
            else{
                ctx.fillText("Niepoprawna komenda", 10, 20);
            }
            break;

        case "wykaz":
            if (commands.length === 3){
                let name = commands[1] + " " + commands[2];
                ctx.fillText('Wykaz wynajęć:', 50, 50);
                listGuestReservations(ctx,0,name);
            }
            else{
                ctx.fillText("Niepoprawna komenda", 10, 20);
            }
            break;
        case "pokoje":
            if (commands.length === 1){
                ctx.fillText('Wszystkie pokoje', 50, 50);
                listRoomsAll(ctx,0);
            }
            else{
                ctx.fillText("Niepoprawna komenda", 10, 20);
            }
            break;

        case "status":
            if (commands.length === 1) {
                showHotelStatus(db);
            }
            else{
                ctx.fillText("Niepoprawna komenda", 10, 20);
            }
            break;
        default:
            ctx.fillText("Nieznana komenda.", 10, 20);
    }
}











