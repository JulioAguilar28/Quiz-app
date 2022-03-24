import axios, { AxiosInstance } from 'axios'

export class QuizApiService {
  private static instance: QuizApiService
  private readonly _axios: AxiosInstance

  private constructor() {
    this._axios = axios.create({
      baseURL: process.env.API_URL,
      params: {
        apiKey: process.env.API_KEY
      }
    })
  }

  public static of() {
    if (this.instance == null) this.instance = new QuizApiService()
    return this.instance._axios
  }
}
