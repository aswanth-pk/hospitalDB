const express = require('express');
const app = express();
const fs = require('fs');

const data = require('./hospital-dataset.json');
// using body parameters
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// get api

app.get("/hospitals", (req, res)=>{
    res.send(data);
});

// post api
app.post("/hospitals", (req, res)=>{
    data.push(req.body);
    fs.writeFile('hospital-dataset.json',JSON.stringify(data), (err, resp)=>{
        if(err){
            console.log('Data cannot be written');
        }
        else{
            console.log('Data written succesfully');
        }
    });
});
// post
app.put('/hospitals/:name', (req, res)=>{
    let hosName = req.params.name;
    data.forEach((item)=>{
        if(item.hospitalName == hosName){
            item.patientCount = req.body.patientCount;
        }
    })
    fs.writeFile('hospital-dataset.json', JSON.stringify(data), (err, resp) => {
        if(err){
            res.send("Data could not be updated")
        }
        else{
            res.send("Data updated")
        }
    });
})
// delete
// app.delete('/hospitals/delete/:name', (req, res) => {
//     let hosName = req.params.name;
//     data.forEach((item, index) => {
//         if(item.hospitalName == hosName){
//             data.pop(index);
//         }
//         fs.writeFile('hospital-dataset.json', JSON.stringify(data), (err, resp) => {
//             if(err){
//                 resp.send("Data couldn't be deleted");
//             }
//             else{
//                 resp.send("Data deleted successfully");
//             }
//         });
//     });
// });
app.listen(3030);