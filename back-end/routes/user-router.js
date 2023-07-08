const express = require('express');
const router = express.Router();
const {User} = require('../model/model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const userHelper = require('../helpers/user-helper');
const { route } = require('./admin-route');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

//image upload
router.post('/upload',upload.single('image'),(req,res) => {

    const image = req.image;
    res.send(apiResponse({message: 'File uploaded successfully.', image}));
    
})

//image retrieve.
router.get('get-product-img/:id',(req,res) => {

    console.log("image retreieve");

    res.send({type:"get"});
    //res.send(`<img src=assets/products/${req.params.id}>`);
})

//Signup Method
router.post('/signup', async (req, res) => {

    req.body.password = await bcrypt.hash(req.body.password,10);

    User.create(req.body).then(response => {

        res.send(response);

    }).catch(err => {
        console.log(err.message);
    });

});

//Login Method
router.post('/user-login',async (req,res) => {

    const user = await User.findOne({username:req.body.username});
    const {email} = user;

    console.log("user : ",user);
    if(user)
    {
        bcrypt.compare(req.body.password,user.password,(err,result) => {

            if(result)
            {
                 // Create token
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                      expiresIn: "2h",
                    }
                  );

                // save user token
                user.token = token;

                res.status(200).json(user);
            }
            else{
                res.send("Invalid Credentials").status(401);
            }
        })
    }
    else{
        res.send("invalid credentials").status(401);
    }

})

//Get Method to get four random images.
router.get('/get-products',async (req, res,next) => {

    let products = await userHelper.randomItems();

   res.send({products});

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