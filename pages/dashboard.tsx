import {NextPage} from 'next'
import { LogoutIcon } from '@heroicons/react/solid'
import Layout from '../components/Layout'
import {supabase} from '../utils/supabase'

const Dashboard: NextPage = () => {
  const signOut = () => {
    supabase.auth.signOut()
  }
  return (
    <Layout title="Dashboard">
      <LogoutIcon 
        className='mb-6 h-6 w-6 cursor-pointer text-blue-500'
        onClick={signOut}
      />
    </Layout>
  )
}

export default Dashboard
