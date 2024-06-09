/**
 * @author Stanisław Polak <polak@agh.edu.pl>
 */

import express from 'express';
import morgan from 'morgan';
import path from 'path';

/* *************************** */
/* Configuring the application */
/* *************************** */
const app = express();

app.locals.pretty = app.get('env') === 'development'; // The resulting HTML code will be indented in the development environment

/* ************************************************ */
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies



let students = [
    {
        firstname: 'Jan',
        lastname: 'Kowalski'
    },
    {
        firstname: 'Anna',
        lastname: 'Nowak'
    },
];

let locals = {
    siteStudents: students,
    showFacultyColumn: false // Dodajemy zmienną lokalną informującą o wyświetlaniu kolumny Wydział
};
/* ******** */
/* "Routes" */
/* ******** */

/* ------------- */
/* Route 'GET /' */
/* ------------- */
app.get('/', (request, response) => {
    response.render('index',locals); // Render the 'index' view
});


// Route for handling form submission (GET method)
app.get('/submit', (request, response) => {
    const name = request.query.name || 'stranger';
    response.send(`Hello ${name}`);
});

// Route for handling form submission (POST method)
app.post('/', (request, response) => {
    const name = request.body.name || 'stranger';
    response.send(`Hello ${name}`);
});

/* ************************************************ */

app.listen(8000, () => {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});

export default app; // Export the app for testing purposes