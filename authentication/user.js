import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import mongoose from "mongoose";
import dbConnect from "..util/mongodb";
import User from "../models/Category";
import { constants } from 'perf_hooks';



/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 * https://github.com/vercel/next.js/tree/canary/examples/with-passport
 * https://github.com/vercel/next.js/blob/canary/examples/with-passport/lib/user.js
 * https://nextjs.org/docs/authentication
 */

const users = []

export async function createUser({ username, password }) {
  const connection = dbConnect();
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    username,
    hash,
    salt,
  }
  
  // newCategoryData = await Category.find();

  const userToSave = new User(user)



  // This is an in memory store for users, there is no data persistence without a proper DB
  // users.push(user)

  await userToSave.save((err,user)=>{
    if (err) return console.error(err);
    console.log(user);
  })

  return { username, createdAt: Date.now() }
}

// Here you should lookup for the user in your DB
export async function findUser({ username }) {
  // This is an in memory store for users, there is no data persistence without a proper DB
  return users.find((user) => user.username === username)
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}