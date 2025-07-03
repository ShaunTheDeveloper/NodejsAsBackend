export const parseIdBody = (req,res,next)=>{
    const {id} = req.body;

    const parsedId = parseInt(id);

    req.body.id = parsedId;

    next()
}



export const parseIdParams = (req,res,next)=>{
    const parsedId = parseInt(req.params.id);
    req.params.id = parsedId;
    next();
}