const { render } = require('ejs');
const { Router } = require('express')
const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const Meme = require('../models/db');


router.get('/', async (req,res)=>{
    try{
         const memes = await Meme.find()
         res.json(memes); 
       }
    catch(err){
        res.send('ERROR'+ err)
       }
    
})

router.get('/:id', async (req,res)=>{

    try{
    const meme = await Meme.findById(req.params.id)
      res.json(meme); 
    }
    catch(err){
        res.send('ERROR'+ err)
    }
    
})

router.post('/', async(req,res)=>{
    const meme =  new Meme({
        name : req.body.name,
        url: req.body.url,
        caption: req.body.caption

    })
    try{
        const savePost = await meme.save();
       // res.json(savePost.id)
       res.send({id: savePost.id}); 
    }
    catch(err){
       res.send(err) 
    }
})

module.exports = router