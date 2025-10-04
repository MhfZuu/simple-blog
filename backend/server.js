const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = 5050;
function getPosts() {
  const data = fs.readFileSync('data/data.json', 'utf8');
  return JSON.parse(data).posts;
}
const savePosts = (posts) => {
  const data = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
  data.posts = posts;
  fs.writeFileSync('data/data.json', JSON.stringify(data, null, 2), 'utf8');
};

const ADMIN_TOKEN = 'token';

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Baca data user
  const data = fs.readFileSync('data/data.json', 'utf8');
  const users = JSON.parse(data).users;

  // Cari user
  const user = users.find((u) => u.username === username);

  // Validasi sederhana (kalau ada password di data.json, cek juga)
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  // Kalau kamu simpan password di data.json
  if (user.password && user.password !== password) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // Kirim balik token dan id user
  return res.status(200).json({
    token: ADMIN_TOKEN,
    author_id: user.id,
    username: user.username,
    email: user.email,
  });
});

app.get('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const data = fs.readFileSync('data/data.json', 'utf8');
  const users = JSON.parse(data).users;
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404).json({ error: "User doesn't exist" });
  }
});
app.get('/posts', async (req, res) => {
  const posts = await getPosts();
  if (posts) {
    res.status(200).json({ posts });
  } else {
    res.status(404).json({ error: "User doesn't exist" });
  }
});
app.get('/posts/:id', async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const posts = await getPosts();
  const post = posts.find((p) => p.id === postId);
  if (post) {
    res.status(200).json({ post });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.post('/posts', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { title, content, author_id } = req.body.post;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content cannot be empty' });
  }

  const posts = getPosts();
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author_id,
    created_at: new Date(),
  };

  posts.push(newPost);
  savePosts(posts);

  return res.status(201).json(newPost);
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
