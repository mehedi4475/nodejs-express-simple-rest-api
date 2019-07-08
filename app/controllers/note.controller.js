const Note = require('../models/note.model.js');

//Create and save a new note
exports.create = (req, res) => {
	//Validate request
	if(!req.body.content){
		return res.status(400).send({
			message: "Note content can not be empty"
		});
	}

	//Create a note
	const note = new Note({
		title: req.body.title || "Untitled Note",
		content: req.body.content
	});

	//Save a note
	note.save()
	.then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while creating the note"
		});
	})
}




// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
	Note.find()
	.then(notes => {
		res.send(notes);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving notes."
		})
	})
};



// Find a single note with a noteId
exports.findOne = (req, res) => {
	Note.findById(req.params.noteId)
	.then(note => {
		if(!note){
			return res.status(404).send({
				message: "Note not found with id " + req.params.noteId
			});
		}
		res.send(note);
	}).catch(err => {
		if(err.kind === 'ObjectId'){
			return res.status(404).send({
				message: "Note not found with id " + req.params.noteId
			});
		}
		return res.status(500).send({
			message: "Error retrieving note with id " + req.params.noteId
		});
	});	
};



// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};