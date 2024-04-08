const express = require('express');  // Server establishment
const fs = require('fs').promises;  // File system to mimic input data
const mysql = require('mysql2');  // Database integration
const path = require('path') //To render html outside of project workplace

module.exports = {
  express,
  fs,
  mysql,
  path
};
