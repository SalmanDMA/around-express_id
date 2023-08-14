const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const regex = /^(https?:\/\/)?(www\.)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?#?$/;
        return regex.test(v);
      },
      message: (props) => `${props.value} is not a valid avatar link.`,
    },
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
