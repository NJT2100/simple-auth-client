//Dependencies
import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import config from './config/config'

//Dev dependencis
import devBundle from './devBundle'

//Routing dependencies
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()
devBundle.compile(app)

//Read static files from 'dist' folder
app.use('/dist', express.static(path.join(process.cwd(), 'dist')))
app.use('/client', express.static(path.join(process.cwd(), 'client')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(session(config.session))

//Server routing
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

app.get('/favicon.ico', function(req, res) {
    res.sendFile(process.cwd(), '/client/assets/images/favicon.ico');
});

//Client routing
app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client/src/index.html'))
})

// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message})
    } else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message})
        console.log(err)
    }
})

export default app