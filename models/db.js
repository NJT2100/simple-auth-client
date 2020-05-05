import mongoose from 'mongoose'
import config from '../config/config'

mongoose.connect(config.mongoUri)

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${config.mongoUri}`)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconeected')
})

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`)
})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected through app termination')
        process.exit(0)
    })
})