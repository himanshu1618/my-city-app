require('dotenv').config();

const packageJson = require('../package.json');
const devURL = process.env.SWAGGER_UI_URL;

module.exports = {
  openapi: '3.0.1',
  info: {
    title: packageJson.name,
    version: packageJson.version,
    description: 'Sails React App API Documentation.'
  },
  servers: [
    {
      url: devURL
    }
  ],
  components: {
    schemas: {
      Success: {
        type: 'object',
        required: ['code', 'message', 'traceId', 'referenceInfo', 'data'],
        properties: {
          code: {
            type: 'number'
          },
          message: {
            type: 'string'
          },
          traceId: {
            type: 'string'
          },
          referenceInfo: {
            type: 'string'
          },
          data: {
            type: 'object'
          }
        }
      },
      Error: {
        type: 'object',
        required: ['code', 'message', 'traceId', 'referenceInfo', 'additionalInfo'],
        properties: {
          code: {
            type: 'number',
            description: 'This will show the api status code.'
          },
          message: {
            type: 'string',
            description: 'This will show the status of the api.'
          },
          traceId: {
            type: 'string',
            description: 'This will show the error message.'
          },
          referenceInfo: {
            type: 'string',
            description: 'This will show the reference information.'
          },
          additionalInfo: {
            type: 'array',
            description: 'This will show additional information for error.'
          }
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};
