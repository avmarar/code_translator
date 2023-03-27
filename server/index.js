import express from 'express'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

import { API_KEY } from './config.js'

const app = express()
const PORT = process.env.PORT || '4000'
const configuration = new Configuration({
  apiKey: API_KEY,
})

const openai = new OpenAIApi(configuration)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello World!!!',
  })
})

app.post('/convert', async (req, res) => {
  const sourceCode = req.body.sourceCode
  const sourceLang = req.body.sourceLang
  const targetLang = req.body.targetLang

  const promptContent = `Translate this function from ${sourceLang} to ${targetLang} \n ${sourceCode}`

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: promptContent }],
  })
  res.json({
    message: 'Successful',
    response: response.data,
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on http:localhost:${PORT}`)
})
