const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || 'Mp})/N|h=Cll.EY',
    saltRounds: 10,
    mongoUri: process.env.MONGODB_URI || 
        process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') + 
        '/SAMPLE',
    session: {
        secret: 'sample secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true
        }
    }
}

export default config