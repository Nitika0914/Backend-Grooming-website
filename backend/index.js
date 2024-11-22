// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();
// const path = require('path');
// const productRoutes = require('./routes/productRoutes');

// // Serve static files (images, JS, CSS) from the 'frontend' folder
// app.use('/public', express.static(path.join(__dirname, 'public')));


// // Middleware
// app.use(express.json());
// app.use(cors()); // Enable CORS for all routes

// // MongoDB connection
// const Mongo_url = "mongodb+srv://payal647be22:payal066@skincare.vyux8.mongodb.net/skincare?retryWrites=true&w=majority&appName=skincare";
// mongoose.connect(Mongo_url)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Error connecting to MongoDB:', err));

// // Define User Schema (Already in place)
// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// // Product Schema
// const productSchema = new mongoose.Schema({
//     product_name: { type: String, required: true },
//     product_image: { type: String, required: true },
//     product_price: { type: Number, required: true },
//     quantity: { type: Number, required: true }
//   });


// // Add Products Route
// app.post('/api/products', (req, res) => {
//     const products = req.body;  // This should be an array of product objects
  
//     Product.insertMany(products)
//       .then((result) => {
//         res.status(201).json({ message: 'Products added', result });
//       })
//       .catch((error) => {
//         console.error('Error adding products:', error);
//         res.status(500).json({ message: 'Error adding products', error });
//       });
//   });
  

// // Check if the 'Product' model is already defined
// const Product = mongoose.models.Product || mongoose.model('Product', productSchema);


// // Signup endpoint (Already in place)
// app.post('/signup', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'Email already exists' });
//         }

//         const newUser = new User({ name, email, password });
//         await newUser.save();
//         res.status(201).json({ message: 'User created' });
//     } catch (err) {
//         console.error('Error creating user:', err);
//         res.status(500).json({ error: 'Database error' });
//     }
// });

// // Login endpoint (Already in place)
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email, password });
//         if (user) {
//             res.status(200).json({ message: 'Login successful', name: user.name });
//         } else {
//             res.status(401).json({ error: 'Invalid email or password' });
//         }
//     } catch (err) {
//         console.error('Error logging in:', err);
//         res.status(500).json({ error: 'Database error' });
//     }
// });

// // Contact Us endpoint (Already in place)
// const contactSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     message: { type: String, required: true },
// });

// const Contact = mongoose.model('Contact', contactSchema);
// app.post('/contact', async (req, res) => {
//     const { name, email, message } = req.body;

//     try {
//         const newContact = new Contact({ name, email, message });
//         await newContact.save();
//         res.status(201).json({ message: 'Message received' });
//     } catch (err) {
//         console.error('Error saving contact message:', err);
//         res.status(500).json({ error: 'Database error' });
//     }
// });

// // Create Products endpoint - to send products to backend
// app.post('/api/products', (req, res) => {
//     const newProduct = new Product(req.body);
  
//     newProduct.save()
//       .then((product) => {
//         res.status(201).json({ message: 'Product added', product });
//       })
//       .catch((error) => {
//         console.error('Error adding product:', error);
//         res.status(500).json({ message: 'Error adding product', error });
//       });
//   });
  
// // Route for getting all products - to get all products from backend
// app.get('/api/products', async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json(products);
//     } catch (err) {
//         console.error('Error fetching products:', err);
//         res.status(500).json({ message: 'Error fetching products' });
//     }
// });



// // Search Products Endpoint
// // app.get('/search/products', async (req, res) => {
// //     const query = req.query.q;

// //     if (!query) {
// //         return res.status(400).json({ message: 'Query parameter is required' });
// //     }

// //     try {
// //         const products = await Product.find({
// //             product_name: { $regex: query, $options: 'i' }, // Case-insensitive search
// //         });
// //         res.status(200).json({ results: products });
// //     } catch (err) {
// //         console.error('Error searching products:', err);
// //         res.status(500).json({ message: 'Error searching products' });
// //     }
// // });


// // Start the server
// app.listen(5000, () => {
//     console.log('Server running on port 5000');
// });









//////////////////




const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');
const productRoutes = require('./routes/productRoutes');

const secretKey = "secretkey";

// Serve static files (images, JS, CSS) from the 'frontend' folder
app.use('/public', express.static(path.join(__dirname, 'public')));


// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// MongoDB connection
const Mongo_url = "mongodb+srv://payal647be22:payal066@skincare.vyux8.mongodb.net/skincare?retryWrites=true&w=majority&appName=skincare";
mongoose.connect(Mongo_url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email }, secretKey, { expiresIn: '1h' });
    return token;
};

// Create User Model
const User = mongoose.model('User', userSchema);

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        console.log('New user created:', newUser); // Log the new user object

        const token = newUser.generateAuthToken();
        res.status(201).json({ message: 'User created', token });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Database error', message: err.message });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        console.log("User found check done");
        // Compare provided password with the hashed password in DB
        const match = await bcrypt.compare(password, user.password);    
        if (match) {
            const token = user.generateAuthToken();
            res.status(200).json({ message: 'Login successful', name: user.name, token });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Database error', message: err.message });
    }
});

// Contact Us Schema and Endpoint
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Message received' });
    } catch (err) {
        console.error('Error saving contact message:', err);
        res.status(500).json({ error: 'Database error', message: err.message });
    }
});

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Attach decoded user data to request
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};



// Create Products endpoint - to send products to backend
app.post('/api/products', (req, res) => {
    const newProduct = new Product(req.body);
  
    newProduct.save()
      .then((product) => {
        res.status(201).json({ message: 'Product added', product });
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Error adding product', error });
      });
  });
  
// Route for getting all products - to get all products from backend
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Add Products Route
app.post('/api/products', (req, res) => {
    const products = req.body;  // This should be an array of product objects
  
    Product.insertMany(products)
      .then((result) => {
        res.status(201).json({ message: 'Products added', result });
      })
      .catch((error) => {
        console.error('Error adding products:', error);
        res.status(500).json({ message: 'Error adding products', error });
      });
  });
  

// Check if the 'Product' model is already defined
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);



// Search Products Endpoint
// app.get('/search/products', async (req, res) => {
//     const query = req.query.q;

//     if (!query) {
//         return res.status(400).json({ message: 'Query parameter is required' });
//     }

//     try {
//         const products = await Product.find({
//             product_name: { $regex: query, $options: 'i' }, // Case-insensitive search
//         });
//         res.status(200).json({ results: products });
//     } catch (err) {
//         console.error('Error searching products:', err);
//         res.status(500).json({ message: 'Error searching products' });
//     }
// });


// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
