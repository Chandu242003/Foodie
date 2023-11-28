const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/vcet')
    .then(() => {
        console.log('Connected to vcet database');
    })
    .catch((err) => {
        console.error(err);
    });

const UserSchema = new mongoose.Schema({
    enterName:{type:String,require:true},
    enterEmail:{type:String,require:true},
    enterNumber:{type:Number,require:true},
    enterCountry:{type:String,require:true},
    enterCity:{type:String,require:true},
    postalCode:{type:Number,require:true},
});


const User = mongoose.model('details', UserSchema);

app.use(express.json());
app.use(cors());


app.post('/register', async (req, resp) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        const userWithoutPassword = result.toObject();
        delete userWithoutPassword.password;

        resp.send(userWithoutPassword);
        console.log(userWithoutPassword);
    } catch (e) {
        console.error(e);
        resp.status(500).send('Something Went Wrong');
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});