const models = require("../../models/sequelize");
const Category = models.Category;

describe("Category model", () => {
  describe("Category creation", () => {
    it("requires a name field", async done => {
      let errors;
      try {
        let category = await Category.create({});
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });
    it("requires a non-empty name", async done => {
      let errors;
      try {
        let category = await Category.create({ name: "" });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });

    it("saves a valid category", async done => {
      let errors;
      try {
        let category = await Category.create({
          name: "This should be a name Faker won't replicate"
        });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeFalsy();
      done();
    });

    it("will not save a category with a  non-unique username", async done => {
      let errors;
      try {
        let category = await Category.create({
          name: "This should be a name Faker won't replicate"
        });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });

    afterAll(async () => {
      let results = await Category.findAll({
        where: {
          name: "This should be a name Faker won't replicate"
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
