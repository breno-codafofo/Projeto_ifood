// importando dependências
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// instanciando express
const app = express()

// middlewares
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5000'
}))

// rotas
//
//
//

// variável de ambiente para a porta
const PORT = process.env.PORT || 3000

// rodando servidor
app.listen(PORT, () => {
    console.log(`server is running on ${PORT} port`)
})
