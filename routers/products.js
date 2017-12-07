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
    let queryObj = {};
    console.log("REQ.Query.maxPrice is " + req.query.maxPrice)


    console.log("REQ.Query.minPrice is " + req.query.minPrice)
    if (req.query.minPrice) {
      queryObj["price"] = queryObj["price"] || {};
      queryObj["price"]["$gte"] = Number(req.query.minPrice)
    }

    if (req.query.maxPrice) {
      queryObj["price"] = queryObj["price"] || {};
      queryObj["price"]["$lte"] = Number(req.query.maxPrice)
    }

    let categoryQueryObj = {};
    if (req.query.category) {
      categoryQueryObj["name"] = req.query.category;
    }
    let sort = [];
    if (req.query.sort ==="sortNameAscend"){
       sort = ['name', 'ASC']
    }

     if (req.query.sort ==="sortNameDescend"){
       sort = ['name', 'DESC']
    }

     if (req.query.sort ==="sortPriceAscend"){
       sort = ['price', 'ASC']
    }

     if (req.query.sort ==="sortPriceDescend"){
       sort = ['price', 'DESC']
    }

     if (req.query.sort ==="sortNewest"){
       sort = ['createdAt', 'DESC']
    }

    if (req.query.sort ==="sortOldest"){
       sort = ['createdAt', 'ASC']
    }

if (sort.length === 0){
  sort = ['price', 'DESC']
} 

    let products = await Product.findAll({ order : [sort], where: queryObj, include: [{ model: CategoryId, where: categoryQueryObj }] });
    let categoriesAll = await CategoryId.findAll();
    let categories = [];
    categoriesAll.forEach((category) => {
      categories.push(category.name)
    })
    let arrays = makeArraysOfThree(products);
    res.render('products/index', { arrays, categories })
  } catch (e) {
    console.error(e);
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