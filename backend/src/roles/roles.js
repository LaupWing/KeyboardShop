const AccesControl = require('accesscontrol')
const ac = new AccesControl()

exports.roles = (function(){
    ac
        .grant('basic')
        .readOwn('profile')
        .createOwn('profile')
        .updateOwn('profile')
    ac
        .grant('admin')
        .extend('basic')
        .readAny('profile')
        .updateAny('profile')
        .deleteAny('profile')
        .createAny('product')
        .updateAny('product')
        .deleteAny('product')
    return ac
})()