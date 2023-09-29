import express from 'express'
import path from 'path'

import { fileURLToPath } from 'url'

import tipData from '../data/tips.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json(tipData)
})

router.get('/:tipId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../client/public/tip.html'))
})

export default router
