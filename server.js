"use strict";
let express = require("express");
let app = express();

//calle when student joins class
app.post("/student/join", function(req, res){
  res.sendStatus(200);
});

//called when teacher gives points
app.post("/teacher/give", function(req, res){
  res.sendStatus(200);
});

//called when teacher creates class
app.post("/teacher/create", function(req, res){
  res.sendStatus(200);
});

//called when teacher deletes class
app.post("/teacher/delete", function(req, res){
  res.sendStatus(200);
});

//called when student leaves class
app.post("/student/delete", function(req, res){
  res.sendStatus(200);
});

//called when teacher requests class list
app.post("/teacher/classes", function(req, res){
  res.sendFile(__dirname + "/files/demo.json");
  console.log("file sent")
});

//serves a file from files folder when requested
app.get("/*", function(req, res){
  res.sendFile(__dirname + "/files" + req.url);
});

app.listen(80)
