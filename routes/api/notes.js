// Invoke npm packages

const notes = require('express').Router();
const fs = require('fs')
const uuid = require('./uuid.js')

notes.get('/', (req, res)=>{
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        console.error(err)
        res.json(JSON.parse(data))})
    console.info(`${req.method} request received for feedback`);
})

notes.post('/', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);

    // Starting a delete routine
notes.delete('/delete', (req, res) => {
      res.send('Got a DELETE request at /delete')
    })

 
    const {title, text} = req.body;

    if (title && text){
        const newNote = {
            title,
            text,
            id: uuid(),
        }
  

      fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
  

          parsedNotes.push(newNote);
  
  
          fs.writeFile(
            'db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated reviews!')
          );
        }
      });
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
    }
  });
module.exports = notes
