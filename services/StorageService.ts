import { UserRanking } from '../models/AppModels'

enum StorageKeys {
  Users = 'users'
}

export const initStorage = () => {
  const areAlreadyUsers = localStorage.getItem(StorageKeys.Users) !== null

  if (!areAlreadyUsers) localStorage.setItem(StorageKeys.Users, JSON.stringify([]))
}

export const saveUserScore = (username: string, score: number) => {
  const users = getUsersArray()
  const userToSave = { username, score } as UserRanking
  users.push(userToSave)

  localStorage.setItem(StorageKeys.Users, JSON.stringify(users))
}

export const getUsers = (): Array<UserRanking> => {
  return getUsersArray()
}

const getUsersArray = (): Array<UserRanking> =>
  JSON.parse(localStorage.getItem(StorageKeys.Users)) as Array<UserRanking>
