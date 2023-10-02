const swaggerJSDoc = require('swagger-jsdoc');
var swaggerDefinition = {
    info: {
        title: 'Express API FOR SEASON3 Disabled APP PROJECT',
        version: '1.0.0',
        description: '"포용누리" 앱을 위한 API 문서입니다.',
    },
    host : "www.oh-kang.kro.kr:7288", // base-url
    basePath : "/" // base path
};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis : [__dirname + '/../routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;