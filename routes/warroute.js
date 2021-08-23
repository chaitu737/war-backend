const express = require('express');
const router = express.Router();
const warModel = require('../models/model');
const csvtojson = require("csvtojson");
const MongoDB = require('../config/db.confighelper');





router.get('/import-data', (req, res) => {
    csvtojson()
  .fromFile("battles.csv")
  .then(csvData => {
    warModel.insertMany(csvData, (err, data) => {
        if (err) {
          res.status(400).json({
            message: "Something went wrong!",
          });
        } else {
          res.status(200).json({
            message: "File Uploaded Successfully!",
            result: data,
          });
        }
      });


  });

});


router.get('/list', async(req,res)=>{
    let result = [];
  await warModel.find({}, {_id:0, name:1}, (err, data)=>{
     if(err){
        res.status(400).json({
            message: "Something went wrong!",
          });
       }
     data.forEach(function(e){
        result.push(e.name);
    });
    res.send(result);

 })

    });


    router.get('/count', async(req,res)=>{
        let result = await warModel.find({}).count();
        console.log(result);
        res.status(200).json({
            message: "Fetched Count Successfully!",
            count: result,
          });
        
    
    
    
    
        });


        router.get('/search', async(req,res)=>{
            
            warModel.find({$text:{$search:req.query.king}}).exec((err, result)=>{
                if(err){
                    res.status(400).json({
                        message: "Something went wrong!",
                      }); 
                }else{
                
                    res.send(result);

                }
            })
          
            
        
        
        
        
            });
    
    
            router.get('/search-location', async(req,res)=>{


                warModel.find({location: { '$regex': req.query.location, '$options': 'i' }}, {_id:0, location:1}).exec((err, result)=>{
                    if(err){
                        res.status(400).json({
                            message: "Something went wrong!",
                          }); 
                    }else{
                    
                        res.send(result);
    
                    }
                })
              
                
            
            
            
            
                });


        router.post('/war-info', async(req,res)=>{

           let data =await warModel.find({location:req.body.location}, {_id:0});
           if(!data){
            res.status(400).json({
                message: "No war data found!",
              }); 
           }else{
            res.status(200).json({
                message: "Fetched Data Successfully!",
                result: data,
              });           }
                

        })




module.exports = router