const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const app = express();
const port =  5000;

app.use(cors());
app.use(bodyParser.json());

const dbURI = 'mongodb+srv://erameshmca40:RaMeShE@tea.7bsob1c.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const Userschema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  mobile:Number,
  age:Number
});

const User = mongoose.model('User', Userschema);

app.post('/register', async (req, res) => {
  const { username, email, password,mobile,age } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      mobile,
      age
    });

    await newUser.save();
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/check-email', async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.json({ isRegistered: true });
    } else {
      res.json({ isRegistered: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts from this IP. Please try again later.',
});

app.use('/login', limiter);

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If login is successful, include the user data in the response
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const cartItemSchema = new mongoose.Schema({
  title: String,
  price: Number,
  name: String,
  url: String,
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

app.post('/additem', async (req, res) => {
  try {
    const newItem = new CartItem(req.body);
    await newItem.save();
    console.log('Item saved successfully:', newItem);
    res.status(200).json({ message: 'Item saved successfully' });
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ message: 'Error saving item' });
  }
});

app.get('/cartitem', async (req, res) => {
  try {
    const cartItems = await CartItem.find();

    if (cartItems && cartItems.length > 0) {
      res.status(200).json(cartItems);
    } else {
      res.status(404).json({ message: 'No cart items found' });
    }
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Error fetching cart items' });
  }
});

app.delete('/cartitem/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    const removedItem = await CartItem.findByIdAndRemove(itemId);

    if (!removedItem) {
      return res.status(404).json({ message: 'Item not found in the cart.' });
    }

    return res.status(200).json({ message: 'Item removed from the cart.' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

const orderItemSchema = new mongoose.Schema({
  items: [
    {
      title: String,
      price: Number,
      name: String,
      url: String,
    }
  ],
  total: Number,
  orderDateTime: String,
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

app.post('/order', async (req, res) => {
  const orderData = req.body; 
  if (!orderData || !Array.isArray(orderData.items) || typeof orderData.total !== 'number') {
    return res.status(400).json({ message: 'Invalid order data' });
  }

  try {
    const currentDate = new Date(); // Get the current date and time
    const formattedDate = currentDate.toLocaleString();
    const newOrder = new OrderItem({
      items: orderData.items,
      total: orderData.total,
      orderDateTime: formattedDate,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order received successfully' });
  } catch (error) {
    console.error('Error while saving the order:', error);
    res.status(500).json({ message: 'Error while saving the order' });
  }
});
app.get('/orders', async (req, res) => {
  try {
    const orders = await OrderItem.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

const teaCollectionSchema = new mongoose.Schema({
  title: String,
  price: Number,
  name: String,
  url: String,
});

const TeaCollection = mongoose.model('TeaCollection', teaCollectionSchema);

app.post('/teaCollection', async (req, res) => {
  try {
    const { title, price, name, url } = req.body;

    const newTeaItem = new TeaCollection({
      title,
      price,
      name,
      url
    });

    await newTeaItem.save();

    res.status(201).json({ message: 'Tea item saved successfully' });
  } catch (error) {
    console.error('Error saving tea collection item:', error);
    res.status(500).json({ message: 'Error saving tea collection item' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
