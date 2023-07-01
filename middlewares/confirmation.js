exports.confirmMessage = (req,res, next)=>{
    try{
        if(confirm("sure?"))
        {
            next();
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        console.log(err);
    }
}