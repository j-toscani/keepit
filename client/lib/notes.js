const { getCollection } = require("../db");
const ObjectId = require("mongodb").ObjectId;

const collectionName = "notes";

async function setNewNote(note) {
  const noteCollection = await getCollection(collectionName);
  const setNote = await noteCollection.insertOne(note);
  return setNote;
}

async function getNoteList() {
  const noteCollection = await getCollection(collectionName);
  const gotNoteList = await noteCollection.find({}).toArray();
  return gotNoteList;
}

async function deleteNote(noteId) {
  const noteCollection = await getCollection(collectionName);
  let searchId = null;
  if (noteId.length === 24) {
    searchId = new ObjectId(noteId);
  } else {
    searchId = noteId;
  }
  const deletedNote = await noteCollection.deleteOne({
    _id: searchId
  });
  return deletedNote;
}

exports.setNewNote = setNewNote;
exports.getNoteList = getNoteList;
exports.deleteNote = deleteNote;
