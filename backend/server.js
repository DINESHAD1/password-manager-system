const express = require('express')
const { default: mongoose } = require('mongoose')
const PasswordManager = require('./model')
const RegisterUser = require('./registeruser')
const registeruser = require('./registeruser')
const middleware = require('./middleware')
const encrypedtText = require('./encryption')
const decryptText = require('./decryption')

const jwt = require("jsonwebtoken");

const app = express()

app.use(express.json())


mongoose.connect('mongodb+srv://dineshkumarreddy001:pmwe123dd@cluster0.blktiud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(
    ()=> console.log('DB connected...')
).catch(err => console.log(err))

app.get('/',(req,res)=>{
    res.send('<h1>Hellow world .. !</h1>')
})


app.post('/registeruser', async (req, res)=>{
    
    try{
    
        const {email,username,password,confirmpassword} = req.body;
        let newUser = new RegisterUser({email,username,password,confirmpassword});
        let exist = await registeruser.findOne({email:email})
        if(exist){
            return res.status(400).send("User Already Exist")
        }
        if(password !== confirmpassword){
            return res.status(400).send("Passwords are not matching")
        }
        await newUser.save();
        res.status(200).send("User Register  successfully")
    }
    catch(err){
        console.log(err.message)
        return res.status(200).send('Internal Server Error')
    }
})

app.post('/login', async (req,res)=>{
    try{
        const {email,password} = req.body;
        let exist = await registeruser.findOne({email})
        if(!exist){
            return res.status(400).send("User Not Found login");
        }
        if(exist.password !== password){
            return res.status(400).send(`Invalid credentials`);
        }
        let payload  = {
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn:3600000},
            (err,token)=>{
                if(err) throw err;
                return res.json({token})
            })

    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server Error")
    }
})

app.get('/getpasswords', middleware,async (req,res)=>{
    try{
        let exist = await registeruser.findById(req.user.id)
        if(!exist){
            return res.status(400).send('User Not Found getpasswords');
        }else{
            try {
                const documents = await PasswordManager.find({});
                documents.map((element)=>{
                    console.log("websitename",element.websitename)
                    element.encryptedtext=  element.encryptedtext ? decryptText(element.encryptedtext,element.key) : element.password
                    console.log("documents.password",element.password)
                })
                res.json(documents);
              } catch (err) {
                console.error('Error:', err);
                res.status(500).send(err.message);
              }
        }
        // res.json(exist)
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.post('/addpassword', middleware , async (req, res)=>{
    const {websitename,username} = req.body;
    const {password,key} = encrypedtText(req.body.password)
    console.log("encryptedText addp 123",password)
    console.log("key addp 123",key)

    try{
        // const newData = new PasswordManager({userId,websitename,username,encryptedText,key,Iv});
        const newData = new PasswordManager({websitename,username,password,key});
        await newData.save();
        return res.send("password saved successfully")
    }
    catch(err){
        console.log("err.message addpassword",err.message)
        res.send(err.message)
    }
})

app.listen(3000,()=>console.log('server runnning....'))