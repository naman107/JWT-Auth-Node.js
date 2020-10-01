const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const blogSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }
});


// fire a function before doc saved to db
blogSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
blogSchema.statics.login = async function (email, password) {
  const blog = await this.findOne({ email });
  if (blog) {
    const auth = await bcrypt.compare(password, blog.password);
    if (auth) {
      return blog;
    }
    throw Error('The password is incorrect');
  }
  throw Error('This email is not registered');
};

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;