const accesscontrol=require('accesscontrol')
const ac = new accesscontrol();
exports.roles = (function() {
ac.grant("customer")
 .readOwn("profile")
 .updateOwn("profile")

ac.grant('seller')
 .extend('customer')
 .createAny('product')
 .deleteAny('product')
 .updateAny('product')
.readAny('product')
.createAny('category')
ac.grant("admin")
 .extend("customer")
 .extend("seller")
 .deleteAny("profile")
 .readAny("profile")

return ac;
})();