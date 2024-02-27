import {FC, ReactNode} from 'react'
import Head from 'next/head'
import { BadgeCheckIcon } from '@heroicons/react/solid'
type Title = {
  title: string
  children: ReactNode
}
const Layout: FC<Title> = ({children, title = 'Todo app'}) => {
  return (
    // <div className='flex 
    //   items-center justify-center font-mono text-gray-800'
    // >
    <div className='flex min-h-screen flex-col
      justify-center  font-mono text-gray-800'
    >
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <div className='w-full h-20  bg-orange-500 '>satou</div>
      </header>
      <main className='flex w-screen flex-1 
        flex-col items-center justify-center'
      >
        {children}
      </main>
      <footer className='flex h-12 w-full items-center justify-center border-t bg-black'>
        <BadgeCheckIcon className='
          h-6 w-6 text-blue-500' 
        />
      </footer>
    </div>
  )
}

export default Layout
