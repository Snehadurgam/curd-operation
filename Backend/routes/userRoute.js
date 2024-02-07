const express=require("express");
const mongoose=require("mongoose");
const User=require("../model/userModel");

const router=express.Router();


//operation

router.post("/",async(req,res)=>{

    const {name,email,age} = req.body;//store in frontend

    try {
         const userAdded = await User.create({
        name : name, // store in backend
        email : email,
        age : age,
    });

    res.status(201).json(userAdded);
        
    } catch (error) {

        res.status(400).json({error:error.message});
        
    }
    
});

//Read

router.get("/",async (req,res)=>{

    
     try {
       const showAll= await User.find();
    
    res.status(200).json(showAll);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
});

//get single user
router.get("/:id",async (req,res)=>{
     
    const {id} = req.params;
     try {
       const singleUser= await User.findById({_id : id});
    
    res.status(200).json(singleUser);
        
    } catch (error) {

        res.status(500).json({error:error.message});
    }
});

//delete
router.delete("/:id",async (req,res)=>{
     
    const {id} = req.params;
     try {
       const deleteUser= await User.findByIdAndDelete({_id : id});
    
    res.status(201).json(deleteUser);
        
    } catch (error) {

        res.status(400).json({error:error.message});
    }
});

//update
router.patch("/:id",async (req,res)=>{
    
    const {id} = req.params;
    
    const {name,email,age}=req.body;
    console.log(req.body)
         try {
       const updateUser= await User.findByIdAndUpdate(id, req.body,{
        new: true,
       });
    
    res.status(200).json(updateUser);
        
    } catch (error) {

        res.status(400).json({error:error.message});
    }
});

module.exports=router;