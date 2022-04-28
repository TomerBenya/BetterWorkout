const assert = require("assert");
const mongoose = require("mongoose");
const chai = require("chai"),
  chaiHttp = require("chai-http"),
  server = require("../app"),
  should = chai.should();
const workout = require("../db");

chai.use(chaiHttp);

describe("/GET templates", () => {
  it("it should GET all the templates", (done) => {
    chai
      .request(server)
      .get("/template")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
describe("/GET template/create", () => {
  it("it should GET the template creation page", (done) => {
    chai
      .request(server)
      .get("/template")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
