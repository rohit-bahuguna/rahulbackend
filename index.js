require('dotenv').config();
const express = require('express');
require('./db/config');
 const cors = require('cors');

const User = require('./db/User');
const Product = require('./db/Product');
const app = express();
const PORT = process.env.PORT || 3500;
app.use(cors());

app.use(express.json());

app.post('/register', async (req, resp) => {
	let user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	let result = await user.save();
	result = result.toObject();
	delete result.password;
	resp.send(result);
});

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            resp.status(200).json({ user : user , success : true })
        } else {
            resp.send({ result: "No User Found" })
        }
    } else {
        resp.send({ result: "No User Found" })
    }

});

app.post('/add-product', async (req, resp) => {
	let product = new Product(req.body);
	let result = await product.save();
	resp.send(result);
});

app.get('/products', async (req, resp) => {
	const products = await Product.find();
	if (products.length > 0) {
		resp.send(products);
	} else {
		resp.send({ result: 'No Product found' });
	}
});

app.delete('/product/:id', async (req, resp) => {
	let result = await Product.deleteOne({ _id: req.params.id });
	// console.log(req.params.id)
	resp.send(result);
});

app.get('/product/:id', async (req, resp) => {
	let result = await Product.findOne({ _id: req.params.id });
	if (result) {
		resp.send(result);
	} else {
		resp.send({ result: 'No Record Found' });
	}
});
app.put('/product/:id', async (req, resp) => {
	let result = await Product.updateOne(
		{ _id: req.params.id },
		{ $set: req.body }
	);
	resp.send(result);
});

app.get('/search/:key', async (req, resp) => {
	let result = await Product.find({
		$or: [
			{
				name: { $regex: req.params.key }
			},
			{
				company: { $regex: req.params.key }
			}
		]
	});
	resp.send(result);
});

app.listen(PORT, () => {
	console.log('server is runing ');
});
