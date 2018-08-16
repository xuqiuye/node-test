const mongoose = require('mongoose');

// return a mongodb connection instance
const conn = mongoose.createConnection('mongodb://127.0.0.1/local');

// mongodb schema
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const Comment = new Schema({
    name: { type: String, default: 'hahaha' },
    age: { type: Number, min: 18, index: true },
    bio: { type: String, match: /[a-z]/ },
    date: { type: Date, default: Date.now },
    buff: Buffer
    });
// define a collection
const BlogPost = new Schema({
    author: ObjectId,
    title: String,
    body: String,
    // 嵌套的schema,是一个数组，可以使用数组的方法对它进行填充
    comments: [Comment],
    data: Date
})

/* Schema.pre('save', function (next, path, val, typel) {
    console.log('schema pre');
    console.log(path);
    next();
}); */

// middleware 
BlogPost.pre('save', function(next) {
    console.log('save a blog-post');
    next();
})

BlogPost.path('title').set(function(v) {
    return v;
    // return capitalize(v);
})
// accessing a model 访问模型
const Blog = conn.model('BlogPost', BlogPost);

const post = new Blog();



// console.log(instance);
post.body = 'this is body';
post.title = 'is title'

post.comments.push({name: 'comment name'});
// console.log(post.comments);

post.save(function(err) {
    console.log(err);
})



/* const Comment = new Schema({
    name: { type: String, default: 'hahaha' },
    age: { type: Number, min: 18, index: true },
    bio: { type: String, match: /[a-z]/ },
    date: { type: Date, default: Date.now },
    buff: Buffer
  });
   
  // a setter
  Comment.path('name').set(function (v) {
    return capitalize(v);
  });
   
  // middleware
  Comment.pre('save', function (next) {
    notify(this.get('email'));
    next();
  }); */
