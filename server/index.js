require('dotenv').config({ path: './config.env' });
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const app = express();
require('./config/passport')(passport);
const userRouter = require('./routes/users');
const adminRouter = require('./routes/admins');
var helmet = require('helmet')
const PORT = process.env.PORT || 4000;

app.use(helmet())
mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to db')
    );
    app.use(morgan('dev'));
    app.use(
        cors({
            origin: ['http://localhost:3000','http://localhost:3001'],  // <-- location of the react app were connecting to
            credentials: true,
        })
        
        );
        app.use(
            session({
                secret: process.env.SECRET_KEY,
                resave: true,
                rolling: true, // <-- Set `rolling` to `true`
                saveUninitialized: true,
                cookie: {
                    maxAge: 1 * 60 * 60 * 1000,
                },
            })
            );
            
            app.use(cookieParser(process.env.SECRET_KEY));
            app.use(passport.initialize());
            app.use(passport.session());
            app.use('/api/webhooks', express.raw({ type: "*/*" }))
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
            
            app.get('/', (req, res) => {
    res.status(201).json({ message: "Welcome to subscription-system API", status: 201 })
});
app.use('/api', userRouter);
app.use('/api/admin', adminRouter);
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));