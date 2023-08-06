import express from 'express'

import authenticatorRouter from './Authenticator'
import collectionRouter from './collection'
import providerRouter from './Provider.mjs'

const app = express()


app.use('/api/collection/', collectionRouter)
app.use('/api/account/', authenticatorRouter)
app.use('/api/wallet/', providerRouter)

export default app
