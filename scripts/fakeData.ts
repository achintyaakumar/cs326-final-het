import {Response} from "express";

const faker = require('faker');
const fs = require('fs')

interface MediaData {
  name: string,
  biasR: string, //bias rating
  relRating: number, //reliability rating
}

interface user {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
}

export class fakeData {

public static async generateUser(data: any, response: Response): Promise<void> {
  
  const user = {
  firstName : faker.name.firstName(),
  lastName : faker.name.lastName(),
  username : faker.internet.username(),
  email : faker.internet.email(),
  } as user;
  response.write(JSON.stringify({ success: true, data: [user]
}))
response.end();
}


public static async generateMedia(data: any, response: Response): Promise<void> {

  const mediaOne = {
    name: "Fox News",
    biasR: "Partisan Right",
    relRating: -3,
  } as MediaData;

  const mediaTwo = {
    name: "MSNBC",
    biasR: "Partisan Left",
    relRating: -2,
  } as MediaData;
  response.write(JSON.stringify( { success: true, data: [mediaOne, mediaTwo] } ))
  response.end();
}
}

