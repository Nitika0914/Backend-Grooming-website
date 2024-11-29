const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const multer = require('multer');
const fs=require('fs');


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
    avatarId: {type:String},
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
        const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey); //we need raw token for verification not beearer
        req.user = decoded; // Attach decoded user data to request
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
// Account details endpoint
app.get('/user-details', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('name email avatarId');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const avatarUrl = user.avatarId
            ? `http://localhost:5000/uploads/${user.avatarId}`
            : null; // Handle case when avatarId is not set

        res.status(200).json({ name: user.name, email: user.email, avatarUrl });
    } catch (err) {
        console.error('Error fetching user details:', err.message);
        res.status(500).json({ error: 'Error fetching user details', message: err.message });
    }
});



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Path to save files
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Store the file with a unique name
    },
});

const upload = multer({ storage: storage });

// Account deletion endpoint
app.delete('/delete-account', authenticate, async (req, res) => {
    console.log('Attempting to delete user with ID:', req.user._id);
    try {
        const userId = req.user._id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            console.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }
        // If the user has an avatar, delete it
        if (user.avatarId) {
            const avatarPath = path.join(__dirname, 'uploads', user.avatarId);
            if (fs.existsSync(avatarPath)) {
                fs.unlinkSync(avatarPath);
            }
        }
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (err) {
        console.error('Error deleting account:', err);
        res.status(500).json({ error: 'Failed to delete account' });
    }
});

// Profile picture upload endpoint
app.post('/upload-avatar', authenticate, upload.single('avatar'), async (req, res) => {
    try {
        const avatarId = req.file.filename; // Filename of the uploaded image
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // If user already has an avatar, delete the old one
        if (user.avatarId) {
            const oldAvatarPath = path.join(__dirname, 'uploads', user.avatarId);
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }
        }

        user.avatarId = avatarId;
        await user.save();

        res.status(200).json({ avatarId });
    } catch (err) {
        console.error('Error saving avatar:', err);
        res.status(500).json({ message: 'Failed to save avatar' });
    }
});

// Create Products endpoint - to send products to backend
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

// Define Assessment Schema
const assessmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    skinType: { type: String, required: true },
    question1: { type: String, required: true },
    question2: [{ type: String }], // Array to store multiple selections
    feedback: { type: String, required: true },
    consent: { type: Boolean, required: true },
});

// Create Assessment Model
const Assessment = mongoose.model('Assessment', assessmentSchema);

// Endpoint to handle assessment form submission
app.post('/api/submit-assessment', async (req, res) => {
    try {
        console.log('POST request received at /api/submit-assessment');
        const formData = req.body; // Access the parsed JSON body
        console.log('Form Data Received:', formData);

        // Save data to MongoDB
        const newAssessment = new Assessment(formData);
        await newAssessment.save(); // Save to the database

        res.status(200).json({ message: 'Assessment submitted successfully!' });
    } catch (error) {
        console.error('Error handling submission:', error);
        res.status(400).json({ error: 'Invalid data format' });
    }
});


//search api
// Search products based on the query
const productSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    product_image: { type: String, required: true },
    product_price: { type: Number, required: true },
  });
  
  app.get('/search/products', async (req, res) => {
    const query = req.query.q?.toLowerCase() || ""; // Ensure the query is handled safely
    console.log('Search query:', query); // Log the incoming query
    try {
        const results = await Product.find({
            product_name: { $regex: query, $options: 'i' } // Case-insensitive matching
        });
        console.log('Results found:', results); // Log the results
        res.json({ results: results });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ error: "Error fetching products" });
    }
});




// app.post('/api/cart', async (req, res) => {
//     try {
//         const { userId, productId, quantity } = req.body;
//         // Add product to user's cart
//         const cartItem = { productId, quantity };
//         const userCart = await Cart.findOneAndUpdate(
//             { userId },
//             { $push: { items: cartItem } },
//             { upsert: true, new: true }
//         );
//         res.status(200).json(userCart);
//     } catch (err) {
//         console.error('Error adding to cart:', err);
//         res.status(500).json({ error: 'Could not add to cart' });
//     }
// });




/////////////////////

// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
