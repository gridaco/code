import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className='text-6xl font-black'>
        Grida Code Engine
      </h1>
      <p className='mt-4'>
        This is a api only directory. Please visit <Link className='underline' href="https://github.com/gridaco/code">Grida Code on Github</Link> for more information.
      </p>
    </main>
  )
}
