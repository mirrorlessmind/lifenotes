const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db")

// This sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

//Express uses required format to recognize data as JSON.

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Loading the front end index.html

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

// Use Get and post to create and delete notes via id

app.route("/api/notes")

    .get(function (req, res) {
        res.json(database);
    })

    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;
        // Allows the test note = original note. loop idenitifies high id
        let highId = 99;
        for (let i = 0; i < database.length; i++) {
            let singleNote = database[i];
            if (singleNote.id > highId) {
                highId = singleNote.id;
            }
        }
        // ID given to the newNote. 
        newNote.id = highId + 1;
        database.push(newNote)
    
        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        });

        res.json(newNote);
    });

// Deleting a note based upon ID using loop,splice and rewriting db 

app.delete("/api/notes/:id", function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");

    for (let i = 0; i < database.length; i++) {
        if (database[i].id == req.params.id) {
            database.splice(i, 1);
            break;
        }
    }

    fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {
        if (err) {
            return console.log(err);
        } else {
            console.log("Your note was banished!");
        }
    });
    res.json(database);
});

// Express Server Setup
app.listen(PORT, function () {
    console.log("Awesome App listening on PORT " + PORT);
});
