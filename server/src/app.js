import express from 'express'
import path from 'path'
import indexRouter from './routes/index'
import cors from 'cors'
import bodyParser from 'body-parser'
import { promises as fs } from 'fs'

//set all config values to env variable and can get it by process.env
import 'dotenv/config'
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

app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
app.use(express.json({limit: '50mb'}))
// app.use(forms.single('file')) 
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'assets')))

//To allow cross-origin requests
app.use(cors())

//Route Prefixes
app.use('/', indexRouter)

process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})
process.on('uncaughtException', async(err, origin) => {
	await fs.write(process.stderr.fd,`Caught exception: ${err}\n` +`Exception origin: ${origin}`)
})
export default app

