import api from './api'
import type  { Post } from '../types/post'

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await api.get<Post[]>('/posts')
  return res.data
}
