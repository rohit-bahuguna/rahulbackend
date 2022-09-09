const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: true,
		unique : true
	},
	password: {
		type: String
	}
});

module.exports = mongoose.model('User', UserSchema);
