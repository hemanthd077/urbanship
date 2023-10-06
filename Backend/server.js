const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'))


require('dotenv').config();
const port = process.env.PORT;
const monogourl = process.env.MONGOURL
const secret = process.env.SESSION_SECERT

const mongoose = require('mongoose');
mongoose.connect(monogourl,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('mongodb connected sucessfully');
})
.catch(()=>{
    console.error(Error);
    console.log('failed to connect the database');
})

const loginRoutes = require('./routes/loginRoutes')
const signupRoutes = require('./routes/signupRoutes')
const homeRoutes = require('./routes/homeRoutes')
const retailLoginRoutes = require('./routes/RetailRoutes/loginRoutes')
const retailHomeRoutes = require('./routes/RetailRoutes/homeRoutes')
const retailProductRoutes = require('./routes/RetailRoutes/ProductRoutes')
const retailProfileRoutes = require('./routes/RetailRoutes/profileRoutes')


// require('./routes/googleSignup')
app.use(session({secret:secret}))
app.use(passport.initialize())
app.use(passport.session()) 

app.use(loginRoutes)
app.use(signupRoutes)
app.use(homeRoutes)
app.use(retailLoginRoutes)
app.use(retailHomeRoutes)
app.use(retailProductRoutes)
app.use(retailProfileRoutes)


app.listen(port,()=>{
    console.log(`App connect to port ${port} and running in Successfully`);
})