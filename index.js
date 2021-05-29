const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true}));

app.use('/api/user', require('./routes/user.routes'));
app.use('/api/car', require('./routes/car.routes'));
app.use('/api/parts', require('./routes/parts.routes'));
// app.use('/api/order', require('./routes/order.routes'));

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => console.log(`Hello Maskindele on PORT: ${PORT}`))
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();