import dotenv from 'dotenv'
import session from 'express-session'
dotenv.config()

const sessionConfig = session({
  secret: process.env.SECRET || 'P3NS1LV4N1A1T2023.*',
  resave: true,
  saveUninitialized: true,
})

export default sessionConfig

