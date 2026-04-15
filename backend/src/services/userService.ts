import { prisma } from '../config/database'
import { createUserInput, loginInput } from '../schemas/userSchema'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-super-segura'

export class UserService {
    async create(dados: createUserInput) {

        // verificar se o usuário já existe
        const userExists = await prisma.user.findUnique({
            where: { email: dados.email }
        })

        if (userExists) {
            throw new Error('Este email já está sendo utilizado')
        }

        // criptografar a senha
        const passwordHash = await bcrypt.hash(dados.password, 10)

        // salvar no banco e remover a confirmação de senha
        const newUser = await prisma.user.create({
            data: {
                name: dados.name,
                email: dados.email,
                password: passwordHash
            },
            // selecionando o retorno
            select: {
                id: true,
                name: true,
                password: true,
            }
        })
        return newUser;
    }

    async login(dados: loginInput) {
        // verificar se o usuário existe
        const user = await prisma.user.findUnique({
            where: { email: dados.email }
        })

        if (!user) {
            throw new Error('Email ou senha incorretos')
        }

        // verificar se a senha está correta
        const senhaValida = await bcrypt.compare(dados.password, user.password)

        if (!senhaValida) {
            throw new Error('Email ou senha incorretos')
        }

        // gerar token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        )

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }
}