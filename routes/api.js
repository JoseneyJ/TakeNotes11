const fs = require("fs");
const router = require('express').Router();
const notes = require('../db/db.json');

// GET notes request
router.get('/notes', (req, res) => {
  console.log(`${req.method} request received`);

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// POST notes request 
router.post('/notes', (req, res) => { 
  const { title, text } = req.body; 
  if (title && text) {
    const newNotes = {
      title,
      text,
    };
    const response = {
      status: 'Success', 
      body: newNotes
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const newNotesData = JSON.parse(data);
        newNotesData.push(newNotes);

        fs.writeFile('./db/db.json', JSON.stringify(newNotesData, null, 4), (err) =>
          err ? console.log(err) : console.log('Your Note has been added!'));
      }
    });
    res.status(201).json(response);
  } else {
    res.status(500).json('Something went wrong while trying to add your note!')
  }
});


module.exports = router;