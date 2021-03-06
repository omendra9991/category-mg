'use strict';
var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should()
chai.use(chaiHttp)

var server = require('../src/server');
describe('category-management', () => {
    it('it should GET all the category list', (done) => {
        chai.request(server)
        .get('/listCat')
        .end((err, res) => {
            (res).should.have.status(200);
            done();
        });
    });

    it('it should add the category ', (done) => {
         let category = {
           "catName": "IT"
        }
        chai.request(server)
        .post('/multiple-upload')
        .send(category)
        .end((err, res) => {
            (res).should.have.status(200);
            done();
        });
    });    
    it('it should delete teh category', (done) => {
        chai.request(server)
        .delete('/delCat/:6039dc92bc233a37043a0836')
        .end((err, res) => {
            (res).should.have.status(200);
            done();
        });
    });
    it('it should update the category', (done) => {
        chai.request(server)
        .put('/updateCat/:6039dc92bc233a37043a0836')
        .send(category)
        .end((err, res) => {
            (res).should.have.status(200);
            done();
        });
    });
});