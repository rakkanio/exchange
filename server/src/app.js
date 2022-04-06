import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import indexRouter from './routes/index'
import cors from 'cors'
import bodyParser from 'body-parser'
dotenv.config()
import { MongoClient } from '../src/config'

const { connection } = MongoClient
connection().then(() => {
	console.log('Mongo connection created');
	const port = process.env.PORT || 5000
	app.listen(port, () => {
		console.log(`Server is listening on port ${port}`)
	})
}).catch(err => {
	console.log('Error in mongo connection', err)
})
const __dirname = path.resolve()


const app = express()

app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false, limit: '5mb' }))
app.use(express.static(path.join(__dirname, 'public')))

//To allow cross-origin requests
app.use(cors())

//Route Prefixes
app.use('/', indexRouter)

export default app

