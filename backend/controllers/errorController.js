const pageNotFound = (req,res)=>{
    return res.status(404).json({error:"Page Not Found"})
}

module.exports = { pageNotFound }