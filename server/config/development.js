module.exports = {
    secret: 'supersecret',
    server: {
        host: 'localhost',
        port: 8080,
        options: {
            ignoreTrailingSlash: true,
            onProtoPoisoning: 'remove',
            logger: {
                level: 'debug',
                prettyPrint: true
            },
            caseSensitive: false
        }
    },
    routes: {
        logLevel: 'debug'
    },
    database: {
        uri: 'mongodb://localhost:27017/project-dev',
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
