'use server'
import { z } from 'zod'

const createUserNameSchema = z.object({
  username: z.string().min(4, "É necessário que seu username tenha pelo menos 4 caracteres")
})

type createUserNameFormData = z.infer<typeof createUserNameSchema>

export async function createUserName(data: createUserNameFormData) {
  const schema = createUserNameSchema.safeParse(data)
  console.log("função chamada2")

  if(!schema.success) {
    return {
      data: null, 
      error: schema.error
    }
  }

  return data.username

}