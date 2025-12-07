// server.js (deep debug for router issues)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
// dev request logger - print method and url for every incoming request
app.use((req, res, next) => { console.log(new Date().toISOString(), req.method, req.url); next(); });


console.log('Express version:', require('express/package.json').version);

// Simple health route
app.get('/', (req, res) => res.send('Blogging backend running'));

// Try to require route modules and report errors if any
let userRoutes, postRoutes, commentRoutes;
try {
  userRoutes = require('./routes/users');
  console.log('Loaded routes/users -> type:', typeof userRoutes);
} catch (err) {
  console.error('Failed to load ./routes/users ->', err && err.message);
}

try {
  postRoutes = require('./routes/posts');
  console.log('Loaded routes/posts -> type:', typeof postRoutes);
} catch (err) {
  console.error('Failed to load ./routes/posts ->', err && err.message);
}

try {
  commentRoutes = require('./routes/comments');
  console.log('Loaded routes/comments -> type:', typeof commentRoutes);
} catch (err) {
  console.error('Failed to load ./routes/comments ->', err && err.message);
}

// Inspect loaded router modules (if they look like routers, print their stack)
function inspectRouter(name, router) {
  if (!router) {
    console.log(`${name}: <not loaded>`);
    return;
  }
  // router can be a function (middleware) or an object; try to show .stack or .router
  try {
    const stack = router.stack || router._router?.stack;
    if (stack && Array.isArray(stack)) {
      console.log(`${name} stack length: ${stack.length}`);
      stack.forEach((layer, i) => {
        try {
          if (layer.route && layer.route.path) {
            const methods = Object.keys(layer.route.methods || {}).join(',').toUpperCase();
            console.log(`  [${i}] route ${methods} ${layer.route.path}`);
          } else if (layer.name) {
            console.log(`  [${i}] layer name: ${layer.name}`);
          } else {
            console.log(`  [${i}] unknown layer:`, Object.keys(layer).slice(0,6));
          }
        } catch(e){
          console.log(`  [${i}] (inspect error)`, e && e.message);
        }
      });
    } else {
      console.log(`${name}: no .stack property (type: ${typeof router}), keys:`, Object.keys(router).slice(0,20));
    }
  } catch (e) {
    console.log(`${name}: inspect error ->`, e && e.message);
  }
}

inspectRouter('userRoutes', userRoutes);
inspectRouter('postRoutes', postRoutes);
inspectRouter('commentRoutes', commentRoutes);

// Mount routes only if they loaded
if (userRoutes) {
  app.use('/api/users', userRoutes);
  console.log('Mounted /api/users');
}
if (postRoutes) {
  app.use('/api/posts', postRoutes);
  console.log('Mounted /api/posts');
}
if (commentRoutes) {
  app.use('/api/comments', commentRoutes);
  console.log('Mounted /api/comments');
}

// Show app properties and attempt to print router info
console.log('app keys:', Object.getOwnPropertyNames(app).slice(0,50));
console.log('typeof app._router:', typeof app._router);
console.log('app._router value:', app._router);

// Safe route dump (guarded)
setTimeout(()=>{ 
  try {
    if (!app._router || !app._router.stack) {
      console.log('DEBUG: app._router is not present OR has no stack.');
    } else {
      const routes = [];
      app._router.stack.forEach(layer => {
        if (layer.route && layer.route.path) {
          const methods = Object.keys(layer.route.methods).join(',').toUpperCase();
          routes.push(`${methods} ${layer.route.path}`);
        } else if (layer.name === 'router' && layer.regexp) {
          routes.push(`router ${layer.regexp}`);
        }
      });
      console.log('REGISTERED ROUTES:\n', routes.join('\n') || '(none)');
    }
  } catch(e){
    console.log('Error while dumping routes:', e && e.message);
  }
}, 800);

// Connect to MongoDB and start server (do not exit on error while debugging)
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/blogging';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err && err.message);
  });
