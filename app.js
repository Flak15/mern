// @ts-check
import express from 'express';
import config from 'config';
import mongoose from 'mongoose';

import auth from './routes/auth.routes.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', auth);
app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Hello!');
});

const start = async () => {
  try {
    const mongoURI = config.get('mongoURI');
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log(`Db connected...`);
    });
  } catch (e) {
    console.log('Error while connecting DB:', e.message);
    process.exit(1);
  }
};

start();
const port = config.get('port') || 4000;
app.listen(port, () => {
  console.log(`Server has been started at port ${port}...`);
});
