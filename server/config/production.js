module.exports = {
    secret: 'rsh;dfm3op2j54023894ghw34 u9itjp9fwoei',
    server: {
        host: '0.0.0.0',
        port: 8080,
        options: {
            ignoreTrailingSlash: true,
            onProtoPoisoning: 'remove',
            logger: {
                level: 'info'
            },
            caseSensitive: false
        }
    },
    routes: {
        logLevel: 'error'
    },
    database: {
        uri: 'mongodb://root:supersecret@mongo/project?&authSource=admin',
        options: {
            useNewUrlParser: true,
            keepAlive: 1,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        },
        name: 'project',
        decorator: 'dbProject'
    }
}
