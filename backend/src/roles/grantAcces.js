const {roles} = require('./roles')
const grantAcces  = function(action,resource){
    return async (req,res,next)=>{
        try{
            const permission = roles.can(req.user.role)[action](resource)
            if(!permission.granted){
                return res.status(401).json({
                    error: 'You dont have permission to perform this action'
                })
            }
            next()
        }catch(e){
            console.log(e)
            res.send(e.message)
        }
    } 
}

module.exports = grantAcces