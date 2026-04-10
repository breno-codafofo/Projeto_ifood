import { z } from 'zod';

// criando o schema de validação para o login
export const loginSchema = z.object({
    email: z.string().email('Endereço de email inválido'),
    password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres")
});

// exportando o tipo de entrada para o login
export type loginInput = z.infer<typeof loginSchema>;

// ------------------------------------------------------------------------------------------------------------------------------- //

// criando o schema de validação para o registro
export const registerSchema = z.object({
  name: z.string().min(1, 'Você precisa digitar um nome'),
  email: z.string().email('Endereço de email inválido'),
  password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres"),
  confirmationPassword: z.string()
})

// validando se a senha e a confirmação de senha são iguais
.refine((data) => data.password === data.confirmationPassword, {
  message: "As senhas não coincidem",
  path: ['confirmationPassword'],
});

// exportando o tipo de entrada para o registro
export type createUserInput = z.infer<typeof registerSchema>;