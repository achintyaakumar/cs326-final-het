const faker = require('faker');
const fs = require('fs')
const express = require('express');
const app = express();

function generateUsers() {

  let users = []

  for (let id=1; id <= 50; id++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let username = firstName+lastName+id;
    let email = faker.internet.email();

    users.push({
        "username": username,
        "first_name": firstName,
        "last_name": lastName,
        "email": email
    });
  }

  return { "data": users }
}

let dataObj = generateUsers();

fs.writeFileSync('data.json', JSON.stringify(dataObj, null, '\t'));

app.get("/home", (req, res) => {
    res.sendFile(__dirname + '/data.json');
 });