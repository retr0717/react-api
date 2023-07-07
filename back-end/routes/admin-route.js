const express = require('express');
const router = express.Router()
const {AdminLogin} = require('../model/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Login Post Method
router.post('/login', async (req, res) => {

    console.log(req.body);

    const user = await AdminLogin.findOne({username:req.body.username});

    console.log(user);
    if(user)
    {
        bcrypt.compare(req.body.password,user.password,(err,result) => {

            if(result)
            {
                 // Create token
                 const token = jwt.sign(
                    { user_id: user._id, username:req.body.username },
                    process.env.TOKEN_KEY,
                    {
                      expiresIn: "2h",
                    }
                  );

                // save user token
                user.token = token;

                res.status(200).json(user);
            }
            else
            {
                res.send("admin login failed").status(401);
            }
        })
    }
    else
    {
        res.send('invalid credentials').status(401);
    }
});

//Get Method
router.get('/get-users',(req, res,next) => {

    AdminLogin.find({}).then(response => {

        res.send(response);

    }).catch(err => {
        console.log(err);
    });

});

//PUT Method.
router.put('/update-user',(req,res) => {

    res.send({
        type:'PUT'
    });
});

//DELETE METHOD.
router.delete('/delete-user',(req,res) => {
    res.send({
        type:'DELETE'
    })
});

module.exports = router;