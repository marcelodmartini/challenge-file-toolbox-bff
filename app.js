import express from 'express'
import fileRoutes from './src/frameworks/routes/fileRoutes.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(fileRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

export default app
