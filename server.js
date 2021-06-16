const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');
const projectRoute = require('./routes/project');
const authRoute = require('./routes/user');


const app = express();

// BodyParser middleware
app.use(express.json());

//connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('MongoDB is connected'))
    .catch((err) => console.log(err));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.header('Access-Control-Allow-Headers',
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})
app.use('/', projectRoute);
app.use('/auth', authRoute)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server run at port ${PORT}`))