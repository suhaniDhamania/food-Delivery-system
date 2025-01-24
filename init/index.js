const express = require("express");
const mongoose = require("mongoose");
const app = express();
const  Menu=require("../Models/menu");
const initdata=require("./data");

main()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/FoodSystem");
}


const menudata=async()=>{
   await Menu.deleteMany({});
   await Menu.insertMany(initdata.data);
   console.log("data was initialized");
}
menudata();