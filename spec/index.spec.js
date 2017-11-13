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
      describe('GET /api/articles/:article_id/comments', () => {
          it('returns an array of comments with a status code of 200', () => {
            const article_id = updatedData.articles[0]._id;
            return request(app)
              .get(`/api/articles/${article_id}/comments`)
              .expect(200)
              .then((res) => {
                const comments = res.body.comments;
                expect(comments).to.be.an('array');
                expect(comments[0].belongs_to).to.equal(article_id.toString());
                expect(comments[0].created_by).to.equal('northcoder')
              });
          });
         it('returns a 404 error if parameter is a non existent id in the right format', () => {
            return request(app)
            .get('/api/articles/41224d776a326fb40f000001/comments')
            .expect(404)
            .then(res => {
              const error = res.body.message;
              expect(error).to.equal('article not found');
            });
         });
         it('returns a 404 error if parameter is not a valid article id format', () => {
            return request(app)
            .get('/api/articles/andrea/comments')
            .expect(404)
            .then(res => {
              const error = res.body.message;
              expect(error).to.equal('article_id not valid');
            });
         });
      });
      describe('POST /api/articles/:article_id/comments', () => {
          it('returns the comment poste by the user with a status code of 201', () => {
            const article_id = updatedData.articles[0]._id;
            const comment = 'This comment is to test the api';
            return request(app)
            .post(`/api/articles/${article_id}/comments`)
            .send({comment})
            .expect(201)
            .then(res => {
                const comment_test = res.body.comment.body;
                expect(comment_test).to.equal(comment);
            });
          });
          it('returns a 400 error if the body of the comment is an empty string or a string of whitespaces', () => {
            const article_id = updatedData.articles[0]._id;
            const comment = '                    ';
            return request(app)
              .post(`/api/articles/${article_id}/comments`)
              .send({comment})
              .expect(400)
              .then(res => {
                const error = res.body.message;
                expect(error).to.equal('comment not valid - provide comment body');
            });
        });
    });
    describe('PUT /api/articles/:article_id?vote=down', () => {
        it('decreses the number of votes for the article selected and return a status code of 200', () => {
            const article_id = updatedData.articles[0]._id;
            const votes = updatedData.articles[0].votes;
            return request(app)
            .put(`/api/articles/${article_id}?vote=down`)
            .expect(200)
            .then(res => {
            const newVotes = res.body.article.votes;
            expect(newVotes).to.equal(votes - 1);
            });
        });
    });
});
