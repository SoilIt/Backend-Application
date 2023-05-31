const express = require('express');
const Firestore = require('@google-cloud/firestore')
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
        const query = db.collection('list_history').where('user_id', '==', user_id).orderBy('created_at', 'desc').limit(1);
        const querySnapshot = await query.get();
        // const data = querySnapshot.docs.map(doc => doc.data());
        if (querySnapshot.size > 0) {
            res.json(querySnapshot.docs[0].data());
            res.status(200);
        }
        else {
            res.json({status: 'Not found'});
        }
    } catch (error) {
        res.status(500).send(error);
    }
    
})
// Get 5 campaign data
app.get('/campaign/limit', async (req, res) => {
    try {
        const query = db.collection('all_campaign').orderBy('created_at', 'desc').limit(5);
        const querySnapshot = await query.get();
        const data = querySnapshot.docs.map(doc => doc.data());
        res.json(data); 
        res.status(200);
    } catch (error) {
        res.status(500).send(error);
    }
})