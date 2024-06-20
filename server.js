const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

// Connect to MongoDB replica set
mongoose.connect('mongodb://mongo1:27017,mongo2:27017,mongo3:27017/DBLP?replicaSet=myReplicaSet')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Create a schema for the "publis" collection
const publisSchema = new mongoose.Schema({
  _id: String,
  type: String,
  title: String,
  pages: {
    start: Number,
    end: Number,
  },
  year: Number,
  booktitle: String,
  url: String,
  authors: [String],
});

const Publis = mongoose.model('Publis', publisSchema, 'publis');

// API endpoint to fetch data with pagination
app.get('/api/publis', async (req, res) => {
  const { page = 1, limit = 10, search = '', sort = 'title', order = 'asc' } = req.query;

  try {
    const query = {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { authors: { $regex: search, $options: 'i' } },
      ],
    };

    const totalCount = await Publis.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    const publis = await Publis.find(query)
      .sort({ [sort]: order === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ publis, totalPages });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
