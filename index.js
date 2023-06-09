const express = require('express');
const Firestore = require('@google-cloud/firestore')
const uuid = require('uuid');
const db = new Firestore();
const bodyParser = require('body-parser');
const multer = require('multer');
const uploadImage = require('./helpers/helpers');
const port = process.env.PORT || 3000;

const app = express();

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      // no larger than 5mb.
      fileSize: 5 * 1024 * 1024,
    },
  })

app.disable('x-powered-by');
app.use(multerMid.single('file'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.listen(port, () => {
    console.log(`SoilIt Rest API listening on port ${port}`);
});

app.get('/', async (req, res) => {
    res.send('SoilIt is ready!');
})

// Home page
// Get latest soil detection history
app.get('/history/latest/:id', async (req, res) => {
    try {
        const user_id = req.params.id;
        const query = db.collection('history').where('user_id', '==', user_id).orderBy('created_at', 'desc').limit(1);
        //.orderBy('created_at', 'desc').limit(1);
        const querySnapshot = await query.get();
        let dataArr = [];
        querySnapshot.forEach(result=> {
            dataArr.push(result.data());
        })
        
        console.log(`querySnapshot size = ${querySnapshot.size}`);
        if (querySnapshot.size > 0) {
            res.send(dataArr);
            res.status(200);
        }
        else {
            res.json({status: 'Not found'});
        }
    } catch (error){
        console.log("Error occured!!");
        console.log(error);
        res.status(500).send(error);
    } 

})

// Get 5 campaign data
app.get('/campaign/limit', async (req, res) => {
    try {
        const query = db.collection('campaign').orderBy('created_at', 'desc').limit(5);
        // .orderBy('created_at', 'desc')
        const querySnapshot = await query.get();
        let dataArr = [];
        querySnapshot.forEach(result=> {
            dataArr.push(result.data());
        })
        
        console.log(`querySnapshot size = ${querySnapshot.size}`);
        if (querySnapshot.size > 0) {
            res.send(dataArr);
            res.status(200);
        }
        else {
            res.json({status: 'Not found'});
        }
    } catch (error){
        console.log("Error occured!!");
        console.log(error);
        res.status(500).send(error);
    }
})

app.post('/history', async (req, res) => {
    try {
        const myFile = req.file;
        console.log('test image url output!')
        console.log(uuid.v4());
        const imageURL = await uploadImage(myFile);
        let date = new Date().toJSON();
        const data = {
            created_at : date,
            id : uuid.v4(),
            image : imageURL,
            user_id : request.body.user_id,
            soil_type : request.body.soil_type,
            soil_moisture: request.body.soil_moisture,
            soil_temperature: request.body.soil_temperature,
            soil_condition: request.body.soil_condition,
        }
        await db.collection('history').doc().set(data);
        console.log('test post data!')
        res.status(201).send('History created successfully')
        .json({
            data: imageURL
        });

    } catch (error) {
        console.log("Error occured!!");
        console.log(error);
        res.status(500).send(error);
    }
    
})