const express = require('express');
const router = express.Router();

router.get("/about",(req,res)=>{
    res.send("About");
})

module.exports = router;
