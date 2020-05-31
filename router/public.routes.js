
module.exports = (app) => {
const public = require('../controller/public/public');

    app.get('/', public.home);

}