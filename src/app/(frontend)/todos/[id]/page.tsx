import config from '@/payload.config'
import { getPayload } from 'payload'
import Image from 'next/image'
import { Media } from '@/payload-types'
import BackButton from '@/components/backButton'

export default async function TodoPage({ params }: { params: { id: string } }) {
  const payloadConfig = await config

  // This is where the data comes from
  const payload = await getPayload({ config: payloadConfig })

  // CANNOT use params.id directly
  const { id } = await params
  const todo = await payload.findByID({
    collection: 'todos',
    id: id,
  })

  return (
    <div>
      <BackButton text={'Back'} />
      <div className="p-2">
        <h1>{todo.title}</h1>
        <p>{todo.description}</p>
      </div>

      <hr />
      <div className="p-2">
        <p>Created At: {todo.createdAt}</p>
        <p>Updated At: {todo.updatedAt}</p>
      </div>
      <div className="p-2">
        {todo.media ? (
          <Image
            src={(todo.media as Media).url ?? '/placeholder.jpg'}
            alt={(todo.media as Media).alt ?? ''}
            width={450}
            height={300}
          />
        ) : null}
      </div>
      <div className="flex justify-center gap-4"></div>
    </div>
  )
}
