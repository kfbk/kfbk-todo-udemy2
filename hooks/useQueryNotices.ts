import {supabase} from '../utils/supabase'
import {useQuery} from 'react-query'
import {Notice} from '../types/types'

export const useQueryNotices = () => {
  const getNotices = async () => {
    const {data,error} = await supabase
      .from('notices')
      .select('*')
      .order('created_at', {ascending:true})
    if (error) {
      throw new Error(`${error.message}: ${error.details}`)
    }
    return data
  }
  return useQuery<Notice[],Error>({
  //   queryKey: 'notices',   // satou
    queryKey: ['notices'],
    queryFn: getNotices,
    staleTime: 0,
    refetchOnWindowFocus: true,
  })
}