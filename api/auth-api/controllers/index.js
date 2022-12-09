require("dotenv").config();


const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {v4} = require('uuid');
const { exec } = require("../helpers/db");

const signupUser = async (req,res)=>{
    try {
const {username, email, password} = req.body
const id= v4()
const hashedpassword = await  bcrypt.hash(password, 8)
const data = {id, username, email, password:hashedpassword}
await exec("insertOrUpdateUser", data)
return res.status(201).json(data)
    }catch(error){
        return res.status(400).json({error:error.message})

    }
}

const loginUser = async (re,res)=>{
    res.status(200).send('running login')

}

module.exports ={
    signupUser,
    loginUser
}