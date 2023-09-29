import { pool } from '../config/database.js'
import '../config/dotenv.js'
import tipData from '../data/tips.js'

const createTipsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS tips;

    CREATE TABLE IF NOT EXISTS tips (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      text VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      submittedBy VARCHAR(255) NOT NULL
    )
  `

  try {
    await pool.query(createTableQuery)
    console.log('🎉 tips table created successfully')
  } catch (err) {
    console.error('⚠️ error creating tips table', err)
  }
}

const seedTipsTable = async () => {
  await createTipsTable()

  tipData.forEach((tip) => {
    const insertQuery = {
      text: 'INSERT INTO tips (title, text, category, image, submittedBy) VALUES ($1, $2, $3, $4, $5)'
    }

    const values = [
      tip.title,
      tip.text,
      tip.category,
      tip.image,
      tip.submittedBy
    ]

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting tip', err)
        return
      }
      console.log(`✅ ${tip.title} added successfully`)
    })
  })
}

seedTipsTable()