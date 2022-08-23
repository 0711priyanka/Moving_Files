const { render } = require('ejs');
const { Router } = require('express')
const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const Meme = require('../models/db');


 router.get('/',async (req,res)=>{

    const memes = await Meme.find()
    res.render('index',{'data': memes }) ;
  
 })


router.post('/', async(req,res)=>{
    //console.log(req.body);
    const meme =  new Meme({
        name : req.body.name,
        url: req.body.url,
        caption: req.body.caption

    })
    try{
        const savePost = await meme.save();
        console.log(savePost.id)
        res.redirect('admin/')
    }
    catch(err){
        console.log(err)
    //    res.send('Error') 
    }
})

router.get('/delete/:id', async (req,res)=>{

    try{
        const deleteMeme = await Meme.findByIdAndDelete(req.params.id);
        console.log(deleteMeme);
        res.redirect('/admin')
    }catch(err){
        console.log(err)
    }
    
})

router.get('/edit/:id', async (req,res)=>{

    try{
        const updateMeme = await Meme.findOneAndUpdate({_id:req.params.id}, req.body);
        //console.log(updateMeme);
        res.render('Edit',{'data': updateMeme });
    }catch(err){
        console.log(err)
    }
    
})

router.post('/edit/:id', async (req,res)=>{

    try{
        const updateMeme = await Meme.findByAndUpdate({_id:req.params.id}, req.body);
        res.redirect('/admin')
    }catch(err){
        console.log(err)
    }
    
})

module.exports = router