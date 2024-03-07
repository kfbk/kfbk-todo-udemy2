import Link from 'next/link'
import {useRouter} from 'next/router'
import {NextPage} from 'next'
import {GetServerSideProps} from 'next'
import {Layout} from '../components/Layout'
import {supabase} from '../utils/supabase'
import {Task, Notice} from '../types/types'

// SSR(ServerSideProcs)はssg.tsxをコピーし
// GetStaticPropsをGetServerSidePropsに変える
// Supabaseで1つ追加したときの違い：SSG＝反映しない、SSR＝反映する
// exportがないと「typeerror-cannot-read-property-map-of-undefined」エラーになる
export const getServerSideProps: GetServerSideProps = async () => {
  console.log('pages/ssr getServerSideProps')
  const {data:tasks} = await supabase
    .from('todos')
    .select('*')
    .order('created_at', {ascending: true}) // true: 新しいものが下
  const {data:notices} = await supabase
    .from('notices')
    .select('*')
    .order('created_at', {ascending: true})
  return {props: {tasks, notices}}
}
type StaticProps = {
  tasks: Task[]
  notices: Notice[]
}
const Ssr:NextPage<StaticProps> = ({tasks, notices}) => {
  const router = useRouter()
  return (
    <Layout title="SSR">
      <p className='mb-3 text-pink-500'>SSR</p>
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
      <Link href="/ssg" prefetch={false}>
        <span className='mb-3-text-xs'>Link to ssg</span>
      </Link>
      <Link href="/isr" prefetch={false}>
        <span className='mb-3-text-xs'>Link to isr</span>
      </Link>
      <button className='mb-3 text-xs'
        onClick={() => router.push('ssg')}
      >
        Route to ssg
      </button>
      <button className='mb-3 text-xs'
        onClick={() => router.push('isr')}
      >
        Route to isr
      </button>
    </Layout>
  )
}

export default Ssr
