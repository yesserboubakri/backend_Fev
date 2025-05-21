const Comment = require('../models/CommentSchema');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { content, user, car } = req.body;

    if (!content || !user || !car) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newComment = new Comment({ content, user, car });
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all comments (optionally filter by car or user)
exports.getAllComments = async (req, res) => {
  try {
    const { carId, userId } = req.query;
    const filter = {};

    if (carId) filter.car = carId;
    if (userId) filter.user = userId;

    const comments = await Comment.find(filter)
      .populate('user', 'username email')
      .populate('car', 'matricule');

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate('user', 'username')
      .populate('car', 'matricule');

    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Comment not found' });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Comment not found' });

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
