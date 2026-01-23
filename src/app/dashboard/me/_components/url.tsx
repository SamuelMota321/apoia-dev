'use client'
import { Button } from '@/components/ui/button'
import { createUserName } from '../_actions/createUserName'
import { useState } from 'react'
import Link from 'next/link'
import { Link2 } from 'lucide-react'

interface UrlPreviewProps {
  username: String | null
}

export const UrlPreview = ({ username: slug }: UrlPreviewProps) => {

  const [error, setError] = useState<null | string>(null)
  const [username, setUsername] = useState(slug)

  const submitAction = async (formData: FormData) => {
    const username = formData.get('username') as string

    if (username === "") {
      return
    }

    const response = await createUserName({ username })
    if (response.error) {
      setError(response.error)
      return
    }

    if (response.data) {
      setUsername(response.data)
    }
  }

  if (!!username) {
    return (
      <div className="flex items-center justify-between flex-1 p-2 text-gray-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-center w-full gap-2">
          <h3 className='font-bold text-lg'>Sua Url:</h3>
          <Link href={`${process.env.NEXT_PUBLIC_HOST_URL}/creator/${username}`}
            target='_blank'
          >
            <p>
              {process.env.NEXT_PUBLIC_HOST_URL}/creator/{username}
            </p>
          </Link>
        </div>
        <Link href={`${process.env.NEXT_PUBLIC_HOST_URL}/creator/${username}`}
          target='_blank'
        >
          <Link2 className='w-5 h-5 text-white'></Link2>
        </Link>
      </div>
    )
  }

  return (
    <div className='w-full'>
      <div className="flex items-center flex-1 p-2 text-gray-100">
        <form
          className="flex flex-1 w-full flex-col md:flex-row gap-2 items-start md:items-center"
          action={submitAction}
        >
          <div className="flex flex-col md:flex-row items-center justify-center w-full">
            <p>
              {process.env.NEXT_PUBLIC_HOST_URL}/creator/
            </p>
            <input
              type="text"
              className="flex flex-1 outline-none border h-9 border-gray-300 text-black rounded-md bg-gray-50 p-2"
              placeholder='Digite seu username'
              name='username'
            />
          </div>

          <Button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 h-9 w-full md:w-fit text-white px-4 rounded-md  cursor-pointer'
          >
            Salvar
          </Button>
        </form>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
    </div>

  )
}