import { useQueryClient, useMutation } from 'react-query'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { Task, EditedTask } from '../types/types'

// Supabaseへ新規・編集・削除データを書き込む
export const useMutateTask = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedTask)

  const createTaskMutation = useMutation(
    async (task: Omit<Task, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('todos').insert(task)
        .select()       // satou
      if (error) throw new Error(error.message)
      return data
    },
    {
      // Supbaseに追加出来たら
      onSuccess: (res) => {
        // キャッシュの中から'todo'に紐づいてるデータを得る
        const previousTodos = queryClient.getQueryData<Task[]>(['todos'])  // satou
        // キャッシュが存在すれば
        if (previousTodos) {
          // そのデータに作成データを加え更新する
          queryClient.setQueryData(
            ['todos'], [...previousTodos, res[0]])
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const updateTaskMutation = useMutation(
    async (task: EditedTask) => {
      const { data, error } = await supabase.from('todos').update({ title: task.title })
        .eq('id', task.id)
        .select()       // satou
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['todos'])  // satou
        if (previousTodos) {
          queryClient.setQueryData(
            ['todos'],                      // satou
            previousTodos.map((task) =>
              task.id === variables.id ? res[0] : task
            )
          )
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const deleteTaskMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (_, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('todos')
        if (previousTodos) {
          queryClient.setQueryData(
            'todos',
            previousTodos.filter((task) => task.id !== variables)
          )
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  return { deleteTaskMutation, createTaskMutation, updateTaskMutation }
}