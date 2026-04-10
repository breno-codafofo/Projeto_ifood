import { Request, Response } from 'express'
import { registerSchema } from '../schemas/userSchema'
import { UserService } from '../services/userService'
import { ZodError } from 'zod'

const userService = new UserService()

export class UserController {
    async register(req: Request, res: Response) {
        try {
            const validatedData = registerSchema.parse(req.body)

            const newUser = await userService.create(validatedData)
            return res.status(201).json(newUser)
        }
        catch (error: any) {
            if (error instanceof ZodError) {
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