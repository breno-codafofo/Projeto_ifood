import { prisma } from '../config/database'
import { createUserInput } from '../schemas/userSchema'
import bcrypt from 'bcrypt'

export class UserService {
    async create(dados: createUserInput) {
        console.log('📋 Iniciando criação de usuário com:', { name: dados.name, email: dados.email })

        // verificar se o usuário já existe
        const userExists = await prisma.user.findUnique({
            where: { email: dados.email }
        })

        if (userExists) {
            throw new Error('Este email já está sendo utilizado')
        }

        // criptografar a senha
        const passwordHash = await bcrypt.hash(dados.password, 10)
        console.log('🔐 Senha criptografada')

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
        console.log('💾 Usuário salvo no banco:', newUser.id)
        return newUser;
    }
}