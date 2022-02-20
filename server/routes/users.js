//*******************************************************************
//  COMP229   Personal Portfolio Website
//  File name       : app.js
//  Student’s Name  : Kai Hong Yeung
//  StudentID       : 301229539
//  Date            : 2 Feb 2022
//*******************************************************************

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
