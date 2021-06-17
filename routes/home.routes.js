const app = require('express').Router()
const auth = require('../auth/auth');
const model = require('../models/note.model');

app.get('/home', auth, async (req, res) => {
    note = await model.find({userID : req.session.userID})
    console.log(note);
    res.render('index.ejs', { name: req.session.name, isLoggedIn: req.session.isLoggedIn , note })
});
app.post('/addNote', async(req,res)=>{
    console.log(req.body);
    await model.insertMany({title : req.body.title , desc: req.body.desc , userID:req.session.userID})
    res.redirect('/home');
})
app.get('/deletee/:id',async (req,res)=>{
    await model.deleteOne({_id:req.params.id});
    res.redirect('/home');
})
app.get('/update/:id',async (req,res)=>{    
    note = await model.findOne({_id:req.params.id});
    res.render('update.ejs',{ name: req.session.name, isLoggedIn: req.session.isLoggedIn , note  })
})
app.post('/handleupdate/:id',async(req,res)=>{
    await model.updateOne({_id:req.params.id},{title: req.body.title , desc : req.body.desc})
    res.redirect('/home');
})

app.get('/logout', (req, res) => {

    req.session.destroy((err) => {
        res.redirect('/signin')
    })
});
module.exports = app