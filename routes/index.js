const warroutes = require('./warroute');
module.exports = app => {
    app.use(`${process.env.APIVERSION}/wars`, warroutes);
   
};