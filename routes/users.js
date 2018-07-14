const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Add User

router.post('/add_user', (req, res) => {
    let newUser = new User ({
        name: req.body.name
    })
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, message: 'ERROR'});
        } else {
            res.json({success: true, message: `New User Added: ${user.name}`});
        }
    })
})

router.get('/user_list', (req, res) => {
    User.find({}, (err, userlist) => {
        if (err){
            console.log(err);
            res.json({success: false, message: 'Something went wrong'});
        } else {
            res.json(userlist);
        }
    })
})

router.post('/delete/:id', (req, res) => {
    User.deleteUser(req.params.id, (err, user) => {
        if(err){
            console.log(err);
        } else {
            res.json({success: true, message: `User Deleted: ${user.name}`});
        }
    });
})

router.post('/updatescore', (req, res) => {
    let userID = req.body.id;
    let score = req.body.score;
    User.updateScore(userID, score, (err, data)=> {
        if(err){
            console.log(err);
        } else {
            res.json({success: true, message: `User updated: ${data}`});
        }
    })
})

module.exports = router;