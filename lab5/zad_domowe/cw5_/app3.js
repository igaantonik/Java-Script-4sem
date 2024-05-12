/**
 * @author Stanisław Polak <polak@agh.edu.pl>
 */

import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { MongoClient } from 'mongodb'
import { allowedNodeEnvironmentFlags } from 'process';

const uri = 'mongodb://localhost:27017'; // Adres bazy danych MongoDB
const dbName = 'AGH';

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

async function connectToDatabase() {
    const client = new MongoClient(uri);
    console.log('in!');
    try {
        // Połączenie z bazą danych
        await client.connect();
        console.log('Connected to the database');
        return client.db(dbName);
    } catch (error) {
        console.error('Error connecting to the database', error);
        throw error;
    }
    
}

const db = await connectToDatabase();

async function readStudents() {
    try {
        const studentsCollection = db.collection('students'); // Wybór kolekcji 'students'
        const students = await studentsCollection.find({}).toArray(); // Pobranie wszystkich dokumentów z kolekcji
        return students;
    } catch (error) {
        console.error('Error reading students', error);
        throw error;
    }
}

// Wywołanie funkcji readStudents() do odczytu danych z kolekcji 'students'
const students2 = await readStudents();
console.log(students2);

async function getStudentsByFaculty(f) {
    try {
        console.log("faculty ",f);
        const studentsCollection = db.collection('students'); // Wybór kolekcji 'students'
        const students = await studentsCollection.find({faculty: f}).toArray(); // Pobranie wszystkich dokumentów z kolekcji
        return students;
    } catch (error) {
        console.error('Error reading students', error);
        throw error;
    }
}



let locals = {
    siteStudents: students2,
    showFacultyColumn: true,
};

// let locals2 = {
//     siteStudents: facultyStudents,
//     showFacultyColumn: true,
// };

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

app.get('/:faculty', (request, response) => {
    const { faculty } = request.params; // Pobranie akronimu wydziału z parametru trasy

    (async () => {
        try {
            const facultyStudents = await getStudentsByFaculty(faculty);
            console.log(facultyStudents); 
            let locals2 = {
                siteStudents: facultyStudents,
                showFacultyColumn: true,
            };
            response.render('index', locals2); 
        } catch (error) {
            console.error('Error:', error);
        }
    })();

});


/* ************************************************ */

app.listen(8000, () => {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});

export default app; // Export the app for testing purposes