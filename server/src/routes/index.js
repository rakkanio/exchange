import express from 'express'

import authenticatorRouter from './Authenticator'
import collectionRouter from './collection'

const app = express()


app.use('/api/collection/', collectionRouter)
app.use('/api/account/', authenticatorRouter)

export default app
