import {supabase} from '../utils/supabase'
import {useState} from 'react'
import {useMutation} from 'react-query'

// supabaseへのユーザログイン処理とユーザ登録処理
export const useMutateAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const reset = () => {
    setEmail('')
    setPassword('')
  }
  // ログイン処理
  const loginMutation = useMutation(
    async () => {
      // const { error } = await supabase.auth.signIn({ email, password })  --> satou
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw new Error(error.message)
    },
    {
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  // 新しくユーザ作成
  const registerMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw new Error(error.message)
    },
    {
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  }
}