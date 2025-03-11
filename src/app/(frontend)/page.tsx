import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import { getPayload } from 'payload'
import './styles.css'
import Link from 'next/link'

export default async function HomePage({ searchParams }: { searchParams: { page?: string } }) {
  const headers = await getHeaders()
  const payloadConfig = await config

  const { page } = await searchParams
  const currentPage = page ? parseInt(page, 10) : 1

  // This is where the data comes from
  const payload = await getPayload({ config: payloadConfig })

  // check for the currently logged in user
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const todos = await payload.find({
    collection: 'todos',
    limit: 2,
    page: currentPage,
    sort: ['+createdAt'],
  })

  return (
    <div>
      <p>Currently logged in as: {user?.email}</p>
      <h1>Todo List</h1>
      <h2>Todos</h2>
      <div className="">
        {todos.docs.map((todo) => (
          <Link key={todo.id} href={`/todos/${todo.id}`}>
            <div className="p-2 border rounded-sm m-2">
              <h2>{todo.title}</h2>
              <p>{todo.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-row justify-center gap-6">
        <button
          className={`border p-2 ${!todos.hasPrevPage ? 'text-gray-500' : ''}`}
          disabled={!todos.hasPrevPage}
        >
          {todos.hasPrevPage ? (
            <Link href={`/?page=${currentPage - 1}`}>Prev Page</Link>
          ) : (
            'Prev Page'
          )}
        </button>
        <button
          className={`border p-2 ${!todos.hasNextPage ? 'text-gray-500' : 'cursor-pointer'}`}
          disabled={!todos.hasNextPage}
        >
          {todos.hasNextPage ? (
            <Link href={`/?page=${currentPage + 1}`}>Next Page</Link>
          ) : (
            'Next Page'
          )}
        </button>
      </div>

      <div>
        <button className="p-2 hover:scale-[1.1]">
          <Link href="./addTodo" className="border rounded-md p-2">
            Add Todo
          </Link>
        </button>
      </div>
    </div>
  )
}
