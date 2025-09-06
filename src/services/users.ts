import api from './api'
import type  { User } from '../types/user'

export const fetchUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>('/users')
  return res.data
}
