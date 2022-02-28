const express = require("express");
const notesModel = require("../models/notesModel");
const router = express.Router();

const isValid = (value) => {
  if (typeof value == "undefined" || value == null) return false;
  if (typeof value == "string" && value.trim().length == 0) return false;
  return true;
};

const isValidRequestBody = (value) => {
  return Object.keys(value).length > 0;
};

// ROUTE 1: http://localhost:3000/api/notes/addNote

const addNote = async (req, res) => {
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      res.status(400).send({ msg: "Please enter notes details" });
    }

    const { user, title, description, tag } = requestBody;

    if (!isValid(user)) {
      return res.status(400).send({ msg: "Please enter user" });
    }

    if (!isValid(title)) {
      return res.status(400).send({ msg: "Please enter title" });
    }

    if (!isValid(description)) {
      return res.status(400).send({ msg: "Please enter description" });
    }

    const noteData = { user, title, description, tag };

    const newNote = await notesModel.create(noteData);
    return res
      .status(201)
      .send({ msg: "Note added successfully", data: newNote });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ error: e.message });
  }
};

// ROUTE 2: http://localhost:3000/api/notes/fetchNotes
const fetchNotes = async (req, res) => {
  const notes = await notesModel.find();
  return res.status(200).send({ data: notes });
};

module.exports = { fetchNotes, addNote};
