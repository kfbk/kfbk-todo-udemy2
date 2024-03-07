// import create from 'zustand' --> satou
import {create} from 'zustand'
import {EditedTask,EditedNotice} from './types/types'

type State = {
  editedTask: EditedTask
  editedNotice:EditedNotice
  updateEditedTask:(payload:EditedTask) => void
  updateEditedNotice:(payload:EditedNotice) => void
  resetEditedTask: () => void
  resetEditedNotice: () => void
}

// TaskやNoticeを作成・変更する時に使う
const useStore = create<State>((set) => ({
  editedTask: {id: '', title: ''},        // これが変数
  editedNotice: { id: '', content: ''},   // これが変数
  updateEditedTask:(payload) => {
    set({
      editedTask: {
        id: payload.id,
        title: payload.title,
      }
    })
  },
  resetEditedTask:() => {
    set({
      editedTask: {
        id: '',
        title: '',
      }
    })
  },
  updateEditedNotice:(payload) => {
    set({
      editedNotice: {
        id: payload.id,
        content: payload.content,
      }
    })
  },
  resetEditedNotice:() => {
    set({
      editedNotice: {
        id: '',
        content: '',
      }
    })
  },
}))

export default useStore