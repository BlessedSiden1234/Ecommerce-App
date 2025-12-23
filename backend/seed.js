const mongoose = require('mongoose');
const dotenv = require('dotenv');

const data = require('./data');
const User = require('./models/User');
const Product = require('./models/Shop');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    // Insert users
    await User.insertMany(data.users);

    // Insert products
    await Product.insertMany(data.products);

    console.log('✅ Data Imported Successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

importData();
