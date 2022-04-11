import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import indexRouter from './routes/index'
import cors from 'cors'
import bodyParser from 'body-parser'
dotenv.config()
import { MongoClient } from '../src/config'
import { IpfsClient } from './config'
const { ipfsConnection } = IpfsClient

const { connection } = MongoClient
connection()
	.then(ipfsConnection)
	.then(() => {
		console.log('Mongo connection created')
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
app.use(express.static(path.join(__dirname, 'assets')))

//To allow cross-origin requests
app.use(cors())

//Route Prefixes
app.use('/', indexRouter)

process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})
process.on('uncaughtException', (err, origin) => {
	fs.writeSync(
		process.stderr.fd,
		`Caught exception: ${err}\n` +
		`Exception origin: ${origin}`
	)
})
export default app

