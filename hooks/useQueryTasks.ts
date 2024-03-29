import {supabase} from '../utils/supabase'
import {useQuery} from 'react-query'
import {Task} from '../types/types'

// Supabaseから一覧を得るためのカスタムフック
export const useQueryTasks = () => {
  const getTasks = async () => {
    const {data,error} = await supabase
      .from('todos')
      .select('*')
      .order('created_at', {ascending:true})
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  return useQuery<Task[], Error>({
    // queryKey: 'todos',   // satou
    queryKey: ['todos'],
    queryFn: getTasks,
    staleTime: Infinity,  // キャッシュが最新なので新たにFetchしないようにする
  })
}