import CreateTodo from '@/app/actions/createTodoAction'

export default function AddTodo() {
  return (
    <div className="p-2">
      <h1>Create a New Todo</h1>
      <form action={CreateTodo} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="bg-white text-black"
            placeholder="title"
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            className="bg-white text-black"
            placeholder="description"
          />
        </div>

        <div className="flex gap-2">
          <label htmlFor="completed">Completed?</label>
          <input type="checkbox" name="completed" id="completed" />
        </div>

        <input type="file" name="media" className="bg-white text-black" />
        <div className="flex justify-center">
          <button type="submit" className="p-2 hover:scale-[1.1] border w-1/2">
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
