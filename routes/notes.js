const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
//using helper fsUtils.js from mod 11 mini-project
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

//GET route for retrieving all the notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//POST route for creating new notes
notes.post("/", (req, res) => {
  console.log(req.body);
  //destructuring for items in req.body ..
  const { title, text } = req.body;
  if (req.body) {
    //new note...
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    //readAndAppend function from fsUtils...
    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully`);
  } else {
    res.error("Error in adding note");
  }
});

// DELETE route for a specific note
notes.delete("/:id", (req, res) => {
  const notesId = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      //make a new array of all notes EXCEPT ones not equal to the id in current stored value
      const result = json.filter((notes) => notes.id !== notesId);
      //writeToFile function from fsUtils; saves new array into db.json
      writeToFile("./db/db.json", result);
      //response to the delete request
      res.json(`Item ${notesId} has been deleted 🗑️`);
    });
});

module.exports = notes;
