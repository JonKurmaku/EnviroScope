const express = require('express');  // Server establishment
const fs = require('fs').promises;  // File system to mimic input data
const mysql = require('mysql2');  // Database integration
const path = require('path') //To render html outside of project workplace
const timers = require('timers') //SetInterval()
module.exports = {
  express,
  fs,
  mysql,
  path,
  timers
};
