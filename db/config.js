const mongoose = require('mongoose');
mongoose.connect(
	'mongodb+srv://choudhary8055:koiRs6BRLVuxZ7tl@cluster0.thozdwn.mongodb.net/products?retryWrites=true&w=majority',
	() => {
		console.log('db is connected');
	}
);
