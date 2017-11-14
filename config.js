require('dotenv').config();

module.exports = {
    DB: {
      test: 'mongodb://localhost/northcoders-news-api-test',
      dev: 'process.env.DB_URL',
      production: process.env.DB_URL|| 'mongodb://localhost/northcoders-news-api-dev'
      
    },
    PORT: {
      test: 3090,
      dev: 3000,
      production: process.env.PORT || 5000
    }
  };