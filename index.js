const express = require('express');
const Firestore = require('@google-cloud/firestore')
const uuid = require('uuid');
const db = new Firestore();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`SoilIt Rest API listening on port ${port}`);
});

app.get('/', async (req, res) => {
    res.send('SoilIt is ready!');
})

// Home page
// Get latest soil detection history
app.get('/history/latest/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
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
        let date = new Date().toJSON();
        const data = {
            created_at : date,
            id : uuid.v4(),
            image : request.body.image,
            user_id : request.body.user_id,
            soil_type : request.body.soil_type,
            soil_moisture: request.body.soil_moisture,
            soil_temperature: request.body.soil_temperature,
            soil_condition: request.body.soil_condition
        }
        await db.collection('dogs').doc().set(data);
        res.status(201).send('History created successfully');
    } catch (error) {
        console.log("Error occured!!");
        console.log(error);
        res.status(500).send(error);
    }
    
})