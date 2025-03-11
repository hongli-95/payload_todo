'use client'
import { useRouter } from 'next/navigation'
export default function BackButton({ text }: { text: string }) {
  const router = useRouter()
  return (
    <button className="border p-2 m-2" onClick={() => router.back()}>
      {text}
    </button>
  )
}
