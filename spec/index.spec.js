process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const testData = require('../seed/test.seed');
const { expect } = require('chai');
const app = require('../server');
const request = require('supertest');

describe('api', () => {
    let updatedData;
    beforeEach(() => {
        return mongoose.connection.dropDatabase()
        .then(testData)
        .then(data => {
            updatedData = data;
        })
        .catch(error => console.error)
    });
    describe('GET api', () => {
        it('returns header with status code of 200', () => {
          return request(app)
            .get('/api')
            .expect(200)
            .then(({body}) => {
              expect(body).to.eql({
                status: 'root path working'
              });
            });
        });
      });
      describe('GET /api/topics', () => {
        it('returns an array of topics with a status code of 200', () => {
          return request(app)
            .get('/api/topics')
            .expect(200)
            .then(res => {
              expect(res.body.topics).to.be.an('array');
              expect(res.body.topics.length).to.equal(3);
              expect(res.body.topics[0].slug).to.be.a('string');
            });
        });
      });
});