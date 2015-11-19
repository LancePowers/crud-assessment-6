process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var expect = chai.expect;
var should = chai.should();
chai.use(chaiHttp);

TEST TEMPLATE

describe('somefunction', function () {
    describe('should be successful', function () {
        it('in performing some test', function (done) {
            chai.request(server)
                .post('/api/... ')
                .send({
                    'name': 'patrick',
                    'age': '33'
                })
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.should.be.a('object');
                    res.body.SUCCESS.should.have.property('name');
                    res.body.SUCCESS.name.should.equal('tina');
                    res.body.SUCCESS.age.should.equal(33);
                    done();
                });
        });
    });
});