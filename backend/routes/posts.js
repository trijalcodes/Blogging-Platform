const router = require('express').Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Create post (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Missing title or content' });

    const post = await Post.create({ title, content, author: req.user.id });
    return res.status(201).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// List posts with search & pagination
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 6);
    const search = (req.query.search || '').trim();

    const q = search
      ? { $or: [ { title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } } ] }
      : {};

    const total = await Post.countDocuments(q);
    const posts = await Post.find(q)
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json({ posts, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    return res.json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Update post (auth required, only author)
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    post.updatedAt = new Date();
    await post.save();
    return res.json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Delete post (auth required, only author)
// Delete post (auth required, only author)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    // Option 1: delete the post document
    await Post.findByIdAndDelete(req.params.id);

    // Option 2 (optional): also delete all comments for this post
    // await Comment.deleteMany({ postId: req.params.id });

    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
