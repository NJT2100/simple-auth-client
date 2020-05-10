//Dependencies
import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import favicon from 'serve-favicon'
import config from './config/config'

//Dev dependencis
import devBundle from './devBundle'

//Routing dependencies
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()
devBundle.compile(app)

const _dirname = process.cwd()

//Read static files from 'dist' folder
app.use('/dist', express.static(path.join(_dirname, 'dist')))
app.use('/client', express.static(path.join(_dirname, 'client')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(session(config.session))
app.use(favicon(path.join(_dirname, 'client/assets/images/favicon.ico')))

//Server routing
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

//Client routing
app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, 'client/src/index.html'))
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