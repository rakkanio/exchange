import express from 'express'

import authenticatorRouter from './Authenticator'

const app = express()

app.use('/api/account/', authenticatorRouter)

export default app
