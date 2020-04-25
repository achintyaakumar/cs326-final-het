const faker = require('faker');
const fs = require('fs')

interface MediaData {
  name: string,
  biasR: string, //bias rating
  relRating: number, //reliability rating
}

export class fakeData {

public generateUser() {
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  let username = firstName+lastName;
  let email = faker.internet.email();
  return JSON.stringify({
    'Username' : username,
    'First Name' : firstName,
    'Last Name' : lastName,
    'Email' : email
})
}


public generateMedia() {

  const fakeMediaOne = {
    name: "Fox News",
    biasR: "Partisan Right",
    relRating: -3,
  } as MediaData;

  const fakeMediaTwo = {
    name: "Fox News",
    biasR: "Partisan Right",
    relRating: -3,
  } as MediaData;
  return JSON.stringify({ success: true, data: [fakeMediaOne, fakeMediaTwo] })
}
}

