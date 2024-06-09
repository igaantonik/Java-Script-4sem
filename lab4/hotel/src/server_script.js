import http from "node:http";
import path from "node:path";
import { URL } from "node:url";
import fs from "node:fs";

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Pobierz ścieżkę do bieżącego pliku
const __filename = fileURLToPath(import.meta.url);

// Pobierz ścieżkę do katalogu, w którym znajduje się bieżący plik
const __dirname = dirname(__filename);

const reservations = path.resolve("src/reservations.txt");

function requestListener(request, response) {
    console.log("--------------------------------------");
    console.log(`The relative URL of the current request: ${request.url}`);
    console.log(`Access method: ${request.method}`);
    console.log("--------------------------------------");
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (url.pathname !== "/favicon.ico")
        console.log(url);

    // const filePath = path.join(__dirname, 'src', request.url);
    //
    // Obsługa zapytań GET dla obrazów

    const method = request.method;
    const filePath = url.pathname;

    if (method === "GET"){
        if (filePath.startsWith("/photos")) {
            const imageName = filePath.split("/").pop(); // Pobierz nazwę obrazka
            const imageFilePath = path.join("src", "html", "photos", imageName); // Utwórz ścieżkę do obrazka
            fs.readFile(imageFilePath, (err, data) => {
                if (err) {
                    response.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
                    response.write("Error reading image file");
                    response.end();
                } else {
                    response.writeHead(200, {"Content-Type": "image/jpeg"});
                    response.write(data);
                    response.end();
                }
            });
            return;
        }
        if (filePath === "/") {
            fs.readFile("src/html/agro_trees.html", "utf8", (err, data) => {
                if (err) {
                    response.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
                    response.write("Error reading HTML file");
                    response.end();
                } else {
                    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    response.write(data);
                    response.end();
                }
            });
            return 0;
        } else if (filePath === "/room1") {
            fs.readFile("src/html/room1.html", "utf8", (err, data) => {
                if (err) {
                    response.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
                    response.write("Error reading HTML file");
                    response.end();
                } else {
                    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    response.write(data);
                    response.end();
                }
            });
            return 0;
        } else if (filePath === "/room2") {
            fs.readFile("src/html/room2.html", "utf8", (err, data) => {
                if (err) {
                    response.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
                    response.write("Error reading HTML file");
                    response.end();
                } else {
                    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    response.write(data);
                    response.end();
                }
            });
            return 0;
        } else if (filePath === "/room3") {
            fs.readFile("src/html/room3.html", "utf8", (err, data) => {
                if (err) {
                    response.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
                    response.write("Error reading HTML file");
                    response.end();
                } else {
                    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    response.write(data);
                    response.end();
                }
            });
            return 0;
        } else if (filePath === "/room4") {
            fs.readFile("src/html/room4.html", "utf8", (err, data) => {
                if (err) {
                    response.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
                    response.write("Error reading HTML file");
                    response.end();
                } else {
                    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    response.write(data);
                    response.end();
                }
            });
            return 0;
        } else if (filePath === "/room5") {
            fs.readFile("src/html/room5.html", "utf8", (err, data) => {
                if (err) {
                    response.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
                    response.write("Error reading HTML file");
                    response.end();
                } else {
                    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    response.write(data);
                    response.end();
                }
            });
            return 0;
        } else if (filePath === "/form") {
            fs.readFile("src/html/form.html", "utf8", (err, data) => {
                if (err) {
                    response.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
                    response.write("Error reading HTML file");
                    response.end();
                } else {
                    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    response.write(data);
                    response.end();
                }
            });
            return 0;
        } else if (filePath === '/available-rooms') {
            fs.readFile('src/reservations.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading reservations file:', err);
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.end('Internal Server Error');
                    return;
                }

                const reservations = JSON.parse(data);
                const today = new Date().toISOString().split('T')[0]; // Pobieramy dzisiejszą datę w formacie "yyyy-mm-dd"
                const notAvailableRooms = reservations.filter(reservation => {
                    return reservation.arrivalDate <= today && reservation.checkoutDate >= today;
                });

                fs.readFile('src/rooms.json', 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading reservations file:', err);
                        response.writeHead(500, {'Content-Type': 'text/plain'});
                        response.end('Internal Server Error');
                        return;
                    }

                    const rooms = JSON.parse(data);
                    const allRooms = [...new Set(rooms.map(room => room.number))];
                    const uniqueRoomNumbersNotAvailable = [...new Set(notAvailableRooms.map(reservation => reservation.room))];
                    const availableRoomNumbers = allRooms.filter(roomNumber => !uniqueRoomNumbersNotAvailable.includes(roomNumber));
                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.end(JSON.stringify(availableRoomNumbers));
                });

            });
            return 0;
        }
        else if (filePath === "/history"){
            fs.readFile("src/html/history.html", "utf8", (err, data) => {
                if (err) {
                    response.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
                    response.write("Error reading HTML file");
                    response.end();
                } else {
                    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    response.write(data);
                    response.end();
                }
            });
            return 0;
        }
        else {
            response.writeHead(501, {"Content-Type": "text/plain; charset=utf-8"});
            response.write("Error 501: Not implemented");
            response.end();
            return 0;
        }
    }
    if (method === 'POST'){
        if(filePath === '/book') {
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString(); // Konwertuj dane na string
            });

            request.on('end', () => {
                fs.readFile('src/reservations.json', 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading reservations file:', err);
                        response.writeHead(500, { 'Content-Type': 'text/plain' });
                        response.end('Internal Server Error');
                        return;
                    }

                    let reservations = JSON.parse(data);
                    let reservationData = JSON.parse(body);

                    const conflictingReservation = reservations.find(reservation => {
                        return (
                            reservation.room === reservationData.room &&
                            (
                                (reservation.arrivalDate <= reservationData.arrivalDate &&
                                    reservation.checkoutDate >= reservationData.arrivalDate) ||
                                (reservation.arrivalDate <= reservationData.checkoutDate &&
                                    reservation.checkoutDate >= reservationData.checkoutDate) ||
                                (reservation.arrivalDate >= reservationData.arrivalDate &&
                                    reservation.checkoutDate <= reservationData.checkoutDate)
                            )
                        );
                    });

                    if (conflictingReservation) {
                        response.writeHead(400, { 'Content-Type': 'text/plain' });
                        response.end('This room is already booked for the specified dates');
                        return;
                    }

                    reservations.push(reservationData);

                    fs.writeFile('src/reservations.json', JSON.stringify(reservations, null, 2), 'utf8', (err) => {
                        if (err) {
                            console.error('Error writing reservations file:', err);
                            response.writeHead(500, { 'Content-Type': 'text/plain' });
                            response.end('Internal Server Error');
                            return;
                        }

                        response.writeHead(200, { 'Content-Type': 'text/plain' });
                        response.end('Reservation added successfully');
                    });
                });
            });
            return 0;
        }
        if (filePath === '/release') {
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
                fs.readFile('src/reservations.json', 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading reservations file:', err);
                        response.writeHead(500, { 'Content-Type': 'text/plain' });
                        response.end('Internal Server Error');
                        return;
                    }

                    let reservations = JSON.parse(data);
                    let reservationData = JSON.parse(body);

                    const indexToRemove = reservations.findIndex(reservation => {
                        console.log(reservation.guest ,reservationData.guest,reservation.arrivalDate, reservationData.arrivalDate,reservation.checkoutDate,reservationData.checkoutDate);
                        return (
                            reservation.guest === reservationData.guest &&
                            reservation.arrivalDate === reservationData.arrivalDate &&
                            reservation.checkoutDate=== reservationData.checkoutDate
                        );
                    });
                    console.log("index to remove:", indexToRemove);

                    if (indexToRemove === -1) {
                        response.writeHead(400, { 'Content-Type': 'text/plain' });
                        response.end('Reservation for the specified guest and dates not found');
                        return;
                    }

                    reservations.splice(indexToRemove, 1);
                    const updatedReservationsJSON = JSON.stringify(reservations, null, 2);

                    fs.writeFile('src/reservations.json', updatedReservationsJSON, 'utf8', (err) => {
                        if (err) {
                            console.error('Error writing reservations file:', err);
                            response.writeHead(500, { 'Content-Type': 'text/plain' });
                            response.end('Internal Server Error');
                            return;
                        }

                        response.writeHead(200, { 'Content-Type': 'text/plain' });
                        response.end('Reservation removed successfully');
                    });
                });
            });
            return 0;
        }
        if (filePath === "/guest"){
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
                const requestData = JSON.parse(body);

                fs.readFile('src/reservations.json', 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading reservations file:', err);
                        response.writeHead(500, { 'Content-Type': 'text/plain' });
                        response.end('Internal Server Error');
                        return;
                    }

                    const reservations = JSON.parse(data);

                    const guestReservations = reservations.filter(reservation => {
                        return reservation.guest === requestData.guest;
                    });

                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify(guestReservations));
                });
            });
        }
    }
}

/* ************************************************** */
/* Main block
/* ************************************************** */
const server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(8000);
console.log("The server was started on port 8000");
console.log('To stop the server, press "CTRL + C"');
