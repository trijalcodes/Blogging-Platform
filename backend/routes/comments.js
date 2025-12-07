const router = require('express').Router();
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

// Add comment to post
router.post('/:postId', auth, async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment) return res.status(400).json({ message: 'Comment required' });

    const c = await Comment.create({ postId: req.params.postId, userId: req.user.id, comment });
    return res.status(201).json(c);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get comments of a post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate('userId', 'username')
      .sort({ createdAt: 1 });
    return res.json(comments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Delete comment (only author)
router.delete('/:id', auth, async (req, res) => {
  try {
    const c = await Comment.findById(req.params.id);
    if (!c) return res.status(404).json({ message: 'Comment not found' });
    if (c.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await Comment.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
