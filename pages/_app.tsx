import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useEffect,useState} from 'react'
import {useRouter} from 'next/router'
import {QueryClient,QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {supabase} from '../utils/supabase'

// supabaseのデータを'react-query'を介して取得するようにする
// ここでの変更後、hooksフォルダーで「useXxx」を作る
// （次は変更前）
// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,  // 一旦、falseにしておく
    }
  }
})
function MyApp({ Component, pageProps }: AppProps) {
  // const {push, pathname} = useRouter()
  // // ログインユーザの状況に応じページ遷移を自動で行う
  // const validateSession = async () => {
  //   // const user = supabase.auth.user() --> satou
  //   const { data } = await supabase.auth.getUser()
  //   const user = data.user
  //   if (user && pathname == '/') {
  //     push('/dashboard')
  //   } else if (!user && pathname !== '/') {
  //     push('/')
  //   }
  // }
  // // ユーザがSIGN-INしたりSIGN－OUTしたりしたときの処理
  // supabase.auth.onAuthStateChange((event, _) => {
  //   if (event === 'SIGNED_IN' && pathname === '/') {
  //     push('/dashboard')
  //   }
  //   if (event === 'SIGNED_OUT') {
  //     push('/')
  //   }
  // })
  // useEffect(() => {
  //   validateSession()
  // }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      {/* 次は無くてもよい、DEVTool 花のマーク */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
