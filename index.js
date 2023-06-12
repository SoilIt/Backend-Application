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
        const query = db.collection('campaign').orderBy('created_at', 'desc').limit(10);
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

//Post History
app.post('/history', async (req, res) => {
    try {
        const myFile = req.file;
        const imageURL = await uploadImage(myFile);
        console.log('test image url output!')
        //console.log(uuid.v4());
        //let date = new Date().toJSON();
        /*const data = {
            created_at : date,
            id : uuid.v4(),
            image : 'testing',
            user_id : req.body.user_id,
            soil_type : req.body.soil_type,
            soil_moisture: req.body.soil_moisture,
            soil_temperature: req.body.soil_temperature,
            soil_condition: req.body.soil_condition,
        }*/
        //await db.collection('history').doc().set(data);
        console.log('test post data!')
        res.status(201).send('History created successfully')
        .json({
            message: "Upload was successful",
            data: imageURL
        });

    } catch (error) {
        console.log("Error occured!!");
        console.log(error);
        res.status(500).send(error);
    }
    
})

//GET list campaign
app.get('/campaign', async (req, res) =>{
    const query = db.collection('campaign').orderBy('created_at')
    const querySnapshot = await query.get()
    let dataArr = [];
    querySnapshot.forEach(result=> {
    dataArr.push(result.data())
    })
    
    console.log(`querySnapshot size = ${querySnapshot.size}`)
    if (querySnapshot.size > 0) {
        res.send(dataArr)
        res.status(200)
    }
    else {
        res.jsonp({
          message:  "Can not found"
        })
     }
}
)

//GET list history
app.get('/history', async (req, res) =>{
    const query = db.collection('history').orderBy('created_at')
    const querySnapshot = await query.get()
    let dataArr = [];
    querySnapshot.forEach(result=> {
    dataArr.push(result.data())
    })
    
    console.log(`querySnapshot size = ${querySnapshot.size}`)
    if (querySnapshot.size > 0) {
        res.send(dataArr)
        res.status(200)
    }
    else {
        res.jsonp({
          message:  "Can not found"
        })
     }
}
)

// list FAQ
app.get('/faq', async (req, res) =>{
    const query = db.collection('FAQ');
    const querySnapshot = await query.get();
    let dataArr = [];
        querySnapshot.forEach(result=> {
        dataArr.push(result.data())
        })
        
        console.log(`querySnapshot size = ${querySnapshot.size}`)
        if (querySnapshot.size > 0) {
            res.send(dataArr)
            res.status(200)
        }
        else {
            res.jsonp({
            message:  "Can not found"
            })
        }
    }
)

//GET detail history
app.get('/history/:id', async (req, res) =>{
    const id = req.params.id;
    const query = db.collection('history').where('id', '==', id);
    const querySnapshot = await query.get();
    let dataArr = [];
        querySnapshot.forEach(result=> {
        dataArr.push(result.data())
        })
        
        console.log(`querySnapshot size = ${querySnapshot.size}`)
        if (querySnapshot.size > 0) {
            res.send(dataArr)
            res.status(200)
        }
        else {
            res.jsonp({
            message:  "Can not found"
            })
        }
    }
)

//DELETE history
app.delete('/history/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = db.collection('history').where('id', '==', id).delete();
        res.status(200).json({
            status: true,
            message: 'Delete Data Successfully!',
        })
    } catch {
        console.log("Error occured!!");
        console.log(error);
        res.status(500).send(error);
    }
    //const querySnapshot = await query.delete();
    /*if (err) {
    return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
    })
    } else {
    return res.status(200).json({
        status: true,
        message: 'Delete Data Successfully!',
    })
    }*/
});