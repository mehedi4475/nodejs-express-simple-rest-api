module.exports = (app) => {
	const notes = require('../controllers/note.controller.js');

	//Create a new note
	app.post('/notes', notes.create);

	//Retrive all notes
	app.get('/notes', notes.findAll);

	//Retrive a single note
	app.get('/notes/:noteId', notes.findOne);

	//Update a note with noteId
	app.put('/notes/:noteId', notes.update);

	//Delete a note with noteId
	app.delete('/notes/:noteId', notes.delete);
}