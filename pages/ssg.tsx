import Link from 'next/link'
import {useRouter} from 'next/router'
import {NextPage} from 'next'
import {GetStaticProps} from 'next'
import {Layout} from '../components/Layout'
import {supabase} from '../utils/supabase'
import {Task, Notice} from '../types/types'

// supabaseにアクセスしてデータを取得する
// このアクセスはbuild時に1回のみ行われる
export const getStaticProps:GetStaticProps = async () => {
  // console.log('pages/ssg getStaticProps')
  const {data:tasks} = await supabase
    .from('todos')
    .select('*')
    .order('created_at', {ascending: true}) // true: 新しいものが下
  const {data:notices} = await supabase
    .from('notices')
    .select('*')
    .order('created_at', {ascending: true})
  // console.log('pages/ssg notices=', notices)
  return {props: {tasks, notices}}
}
type StaticProps = {
  tasks: Task[]
  notices: Notice[]
}
const Ssg:NextPage<StaticProps> = ({tasks, notices}) => {
  const router = useRouter()
  return (
    <Layout title="ssg">
      <p className='mb-3 text-blue-500'>SSG</p>
      <ul className='mb-3'>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <p className='text-lg font-extrabold'>
                {task.title}
              </p>
            </li>
          )
        })}
      </ul>
      <ul className='mb-3'>
        {notices.map((notice) => {
          return (
            <li key={notice.id}>
              <p className='text-lg font-extrabold'>
                {notice.content}
              </p>
            </li>
          )
        })}
      </ul>
      <Link href="/ssr" prefetch={false}>
        <span className='mb-3-text-xs'>Link to ssr</span>
      </Link>
      <button className='mb-3 text-xs'
        onClick={() => router.push('ssr')}
      >
        Route to ssr
      </button>
    </Layout>
  )
}

export default Ssg
