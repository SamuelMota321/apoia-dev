'use server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { clearUsername } from '@/utils/createSlug'
import { prisma } from '@/lib/prisma'

const createUserNameSchema = z.object({
  username: z.string().min(4, "É necessário que seu username tenha pelo menos 4 caracteres")
})

type createUserNameFormData = z.infer<typeof createUserNameSchema>

export async function createUserName(data: createUserNameFormData) {

  const session = await auth()

  if (!session?.user) {
    return {
      data: null,
      error: "Usuário não autenticado"
    }
  }

  const schema = createUserNameSchema.safeParse(data)

  if (!schema.success) {
    return {
      data: null,
      error: schema.error.issues[0].message
    }
  }

  try {
    const userId = session.user.id
    const slug = clearUsername(data.username)
    const verifyUserName = await prisma.user.findFirst({
      where: {
        username: slug
      }
    })

    if (verifyUserName) {
      return {
        data: null,
        error: "Nome de Usuário já está em uso, tente outro"
      }
    }

    await prisma.user.update({
      where: {
        id: userId as string
      },
      data: {
        username: slug
      }
    })

    return {
      data: slug,
      error: null
    }

  } catch (err) {
    return {
      data: null,
      error: "Falha ao atualizar o username"
    }
  }

}