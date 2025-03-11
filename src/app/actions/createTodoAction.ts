import config from '@/payload.config'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export default async function CreateTodo(formData: FormData) {
  'use server'
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const completed = formData.get('completed') ? true : false
  const mediaFile = formData.get('media') as File

  const payloadConfig = await config
  // This is where the data comes from
  const payload = await getPayload({ config: payloadConfig })

  // convert media file to acceptable format
  const arrayBuffer = await mediaFile.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const filePayload = {
    data: buffer,
    mimetype: mediaFile.type,
    name: mediaFile.name,
    size: mediaFile.size,
  }

  const uploadedMedia = await payload.create({
    collection: 'media',
    data: {
      alt: 'image for todo: ' + title,
    },
    file: filePayload,
  })

  const todo = await payload.create({
    collection: 'todos',
    data: {
      title: title,
      description: description,
      completed: completed,
      media: uploadedMedia.id,
    },
  })

  redirect('/')
}
