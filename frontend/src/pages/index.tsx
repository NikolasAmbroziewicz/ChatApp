import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <span className='bg-red-100'>
        Home Page
      </span>
    </div>
  )
}
