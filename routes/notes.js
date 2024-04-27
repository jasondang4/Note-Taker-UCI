const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: crypto.randomUUID()
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding a note');
  }
});

notes.delete('/:id', (req, res) => {
 
    readFromFile('./db/db.json')
    .then((data) => {    
      let newList = JSON.parse(data)
      for (let i=0; i < newList.length; i++) {
        if (req.params.id === newList[i].id) {
          newList.splice([i],1)
          writeToFile('./db/db.json', newList)
          res.status(200).json({msg:`selected note has been deleted`})
        } else {
        }
      }
    }).catch(err=> console.log(err))
  })

module.exports = notes;