const models = require("../../models/sequelize");
const User = models.User;

describe("User model", () => {
  describe("User creation", () => {
    it("requires an email field", async done => {
      let errors;
      try {
        let user = await User.create({ username: "bob" });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });
    it("requires an email in the email field", async done => {
      let errors;
      try {
        let user = await User.create({ username: "bob", email: "bob" });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });

    it("requires a username field", async done => {
      let errors;
      try {
        let user = await User.create({ email: "bob@bob.com" });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });
    it("requires a non-empty username", async done => {
      let errors;
      try {
        let user = await User.create({ username: "", email: "bob@bob.com" });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });

    it("saves a valid user", async done => {
      let errors;
      try {
        let user = await User.create({ username: "bob", email: "bob@bob.com" });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeFalsy();
      done();
    });

    it("will not save a user with a  non-unique username", async done => {
      let errors;
      try {
        let user = await User.create({
          username: "bob",
          email: "email@email.com"
        });
      } catch (e) {
        errors = e;
      }
      expect(errors).toBeTruthy();
      done();
    });

    it("will not save a user with a  non-unique email", async done => {
      let errors;
      try {
        let user = await User.create({
          username: "edith",
          email: "bob@bob.com"
        });
      } catch (e) {
        errors = e;
      }
      let edith = await User.findAll({ where: { username: "edith" } });
      expect(errors).toBeTruthy();
      done();
    });

    afterAll(async () => {
      let results = await User.findAll({
        where: {
          username: "bob",
          email: "bob@bob.com"
        }
      });
      let user = results[0];
      try {
        user.destroy();
      } catch (e) {
        console.error(e);
      }
    });
  });
});
