const models = require("../../models/sequelize");
const Category = models.Category;
const Product = models.Product;

let validProduct = {
  name: "productName",
  sku: 123456789,
  description: "a fake product",
  price: 12.0,
  categoryId: 3
};

describe("Product model", () => {
  describe("Product creation", () => {
    it("requires a name field", async done => {
      let errors;
      try {
        let invalidProduct = { ...validProduct, name: null };
        let product = await Product.create(invalidProduct);
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });
    it("requires a non-empty name", async done => {
      let errors;
      try {
        let product = await Product.create({ ...validProduct, name: "" });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });

    it("requires a sku field", async done => {
      let errors;
      try {
        let product = await Product.create({ ...validProduct, sku: null });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });
    it("requires a non-empty sku", async done => {
      let errors;
      try {
        let product = await Product.create({ ...validProduct, sku: "" });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });

    it("requires an integer sku", async done => {
      let errors;
      try {
        let product = await Product.create({ ...validProduct, sku: 123.45 });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });

    it("requires a description", async done => {
      let errors;
      try {
        let product = await Product.create({
          ...validProduct,
          description: null
        });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });

    it("requires a non-empty description", async done => {
      let errors;
      try {
        let product = await Product.create({
          ...validProduct,
          description: ""
        });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });

    it("requires a string for the description", async done => {
      let errors;
      try {
        let product = await Product.create({
          ...validProduct,
          description: {}
        });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });

    it("requires a price", async done => {
      let errors;
      try {
        let product = await Product.create({ ...validProduct, price: null });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });

    it("requires a decimal price", async done => {
      let errors;
      try {
        let product = await Product.create({ ...validProduct, price: "bird" });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });

    it("requires an integer categoryId", async done => {
      let errors;
      try {
        let product = await Product.create({
          ...validProduct,
          categoryId: "pop"
        });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });

    it("saves a valid product", async done => {
      let errors;
      try {
        let category = await Product.create(validProduct);
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeFalsy();
      done();
    });

    it("will not save a category with a non-unique sku", async done => {
      let errors;
      try {
        let category = await Product.create(validProduct);
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });

    afterAll(async () => {
      let results = await Product.findAll({
        where: {
          sku: validProduct.sku
        }
      });
      try {
        await results.forEach(result => result.destroy());
      } catch (e) {
        console.error(e);
      }
    });
  });
});
