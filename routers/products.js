var express = require('express');
var router = express.Router();
var models = require('../models/sequelize');
var Product = models.Product;
var CategoryId = models.CategoryId;
var sequelize = models.sequelize;

const makeArraysOfThree = function(products) {
  let arrays = [];
  products.map((product, i) => {
    arrays[Math.floor(i / 3)] = arrays[Math.floor(i / 3)] || [];
    arrays[Math.floor(i / 3)][i % 3] = product;
  });
  return arrays;
}

router.get('/:productId', async function(req, res) {
  try {
    let product = await Product.findById(req.params.productId, { include: [{ model: CategoryId }] });
    let similarProducts = await Product.findAll({ include: [{ model: CategoryId }], where: { categoryId: product.categoryId, id: { $ne: product.id } } });
    let arrays = makeArraysOfThree(similarProducts);
    res.render('products/show', { product, arrays });
  } catch (e) {
    next();
  }
});

router.get('/', async function(req, res) {
  try {
    let products = await Product.findAll({ include: [{ model: CategoryId }] });
    let arrays = makeArraysOfThree(products);
    res.render('products/index', { arrays })
  } catch (e) {
    next();
  }

});




/*
router.get('/users', onIndex);
router.get('/users/new', (req, res) => {
  res.render('users/new');
});
router.delete('/users/:id', (req, res) => {
  User.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/users');
    })
    .catch((e) => res.status(500).send(e.stack));
});
router.post('/users', (req, res) => {
  var body = req.body;

  var userParams = {
    fname: body.user.fname,
    lname: body.user.lname,
    username: body.user.username,
    email: body.user.email
  };

  User.create(userParams)
    .then((user) => {
      res.redirect(`/users/${ user.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
});

router.get('/users/:id/edit', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.render('users/edit', { user })
      } else {
        res.send(404);
      }
    })
    .catch((e) => res.status(500).send(e.stack));
});

router.put('/users/:id', (req, res) => {
  var userParams = req.body.user;

  User.update({
    fname: userParams.fname,
    lname: userParams.lname,
    username: userParams.username,
    email: userParams.email
  }, {
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect(`/users/${ req.params.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
});
router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.render('users/show', { user });
      } else {
        res.send(404);
      }
    })
    .catch((e) => res.status(500).send(e.stack));
});*/

module.exports = router;