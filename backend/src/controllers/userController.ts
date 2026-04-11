import { Request, Response } from 'express'
import { registerSchema } from '../schemas/userSchema'
import { UserService } from '../services/userService'
import { ZodError } from 'zod'

const userService = new UserService()

export class UserController {
    async register(req: Request, res: Response) {
        try {
            console.log('📌 Requisição de registro recebida:', req.body)

            const validatedData = registerSchema.parse(req.body)
            console.log('✅ Validação passou:', validatedData)

            const newUser = await userService.create(validatedData)
            console.log('✅ Usuário criado:', newUser)

            return res.status(201).json(newUser)
        }
        catch (error: any) {
            console.error('❌ Erro no registro:', error.message)

            if (error instanceof ZodError) {
                console.error('Erros de validação:', error.issues)
                return res.status(400).json({
                    status: "erro_validacao",
                    errors: error.issues.map(err => ({
                        campo: err.path[0],
                        mensagem: err.message
                    }))
                });
            }
            return res.status(400).json({
                message: error.message || "Erro interno"
            });
        }
    }
}