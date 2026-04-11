// importando dependências
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes/routes'


// instanciando express
const app = express()

// middlewares
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5500', 'http://127.0.0.1:3000', 'http://127.0.0.1:5500', 'file://']
}))
app.use(router)

// log de requisições
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`, req.body)
    next()
})

// variável de ambiente para a porta
const PORT = process.env.PORT || 3000

// rodando servidor
app.listen(PORT, () => {
    console.log(`server is running on ${PORT} port`)
})
