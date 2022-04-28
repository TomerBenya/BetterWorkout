const assert = require("assert");
const mongoose = require("mongoose");
const chai = require("chai"),
  chaiHttp = require("chai-http"),
  server = require("../app"),
  should = chai.should();
const workout = require("../db");

chai.use(chaiHttp);

describe("/GET workouts", () => {
  it("it should GET all the workout history", (done) => {
    chai
      .request(server)
      .get("/workout/history")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/GET workout/start", () => {
  it("it should GET all the available templates to start workouts from", (done) => {
    chai
      .request(server)
      .get("/workout/select")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
