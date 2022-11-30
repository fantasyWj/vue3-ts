import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from '../testData'
interface userProp {
  isLogin: boolean,
  name?: string,
  id?: number
}
export interface GlobalData {
  users: userProp,
  column: ColumnProps[],
  posts: PostProps[]
}
export default createStore<GlobalData>({
  state: {
    users: { isLogin: true, id: 1, name: "wangjun" },
    column: testData,
    posts: testPosts
  },
  mutations: {
    login(state) {
      state.users = { ...state.users, isLogin: true, name: 'wj' }
    },
    createPosts(state, newPosts) {
      state.posts.push(newPosts)
    },
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.column.find((item) => item.id == id)
    },
    getPostsById: (state) => (id: number) => {
      return state.posts.filter((item) => item.columnId == id)
    }
  },
  actions: {
  },
  modules: {
  }
})


