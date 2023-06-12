const express = require('express');
const Firestore = require('@google-cloud/firestore')
const db = new Firestore();
const app = express();
app.use(express.json());
const port = process.env.PORT || 9000;

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`SoilIt Rest API listening on port ${port}`);
});

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
    
    const id = req.params.id;
    const query = db.collection('history').where('id', '==', id);
    const querySnapshot = await query.delete();
    res.status(200).json ({
        message: 'history deleted successfuly'
    })
    
})
