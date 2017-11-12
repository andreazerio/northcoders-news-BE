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
      describe('GET api/topics/:topic_id/articles', () => {
        it('returns an array of topics with a status code of 200', () => {
          const topic = updatedData.topics[2].slug;
          return request(app)
            .get(`/api/topics/${topic}/articles`)
            .expect(200)
            .then(res => {
              const articles = res.body.articles;
              expect(articles).to.be.an('array');
              expect(articles[0].belongs_to).to.equal(topic);
              expect(articles[0].title).to.equal('Cats are great')
            });
        });
        it('returns a 404 error status code if parameter is not a valid topic', () => {
            return request(app)
              .get('/api/topics/andrea/articles')
              .expect(404)
              .then(res => {
                const error = res.body.message;
                expect(error).to.equal('topic not found');
              });
          });
      });
});
describe('GET api/articles', () => {
    it('returns an array of articles with a status code of 200', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles.length).to.equal(2);
          expect(res.body.articles[1].title).to.equal('Football is fun')
          expect(res.body.articles[0].belongs_to).to.be.a('string');
        });
    });
});