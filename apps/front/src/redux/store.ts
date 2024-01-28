import { configureStore } from '@reduxjs/toolkit'
import cowReducer  from './cowSlice'

export const store = configureStore({
    reducer: {
      cows: cowReducer, 

    }
  })


  // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch