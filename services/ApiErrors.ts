import { AxiosError, AxiosResponse } from 'axios'
import { getErrorMessageFromApi } from '~/utils/errorUtils'

export class AuthError extends Error {
  public _tag: 'AuthError'

  public constructor(message: string) {
    super(message)
    this._tag = 'AuthError'
  }

  public static of(message: string) {
    return new AuthError(message)
  }
}

export class ClientError extends Error {
  public _tag: 'ClientError'

  public constructor(message: string) {
    super(message)
    this._tag = 'ClientError'
  }

  public static of(message: string) {
    return new ClientError(message)
  }
}

export class UnexpectedError extends Error {
  public _tag: 'UnexpectedError'

  public constructor(message: string) {
    super(message)
    this._tag = 'UnexpectedError'
  }

  public static of(message: string) {
    return new UnexpectedError(message)
  }
}

export class ServerError extends Error {
  public _tag: 'ServerError'

  public constructor(endpoint: string, message: string) {
    super(`${endpoint}: ${message}`)
    this._tag = 'ServerError'
  }

  public static of(endpoint: string, message: string) {
    return new ServerError(endpoint, message)
  }
}

export class AxiosRequestError extends Error {
  public _tag: 'AxiosError'
  public readonly message: string
  public readonly code: number
  public readonly response?: AxiosResponse
  public readonly request: any

  public constructor(code: number, message: string, response?: AxiosResponse, request?: any) {
    super()
    this._tag = 'AxiosError'
    this.code = code
    this.message = message
    this.response = response
    this.request = request
  }

  public static of(data: AxiosError) {
    const message = getErrorMessageFromApi(data)
    return new AxiosRequestError(data.response!.status, message, data.response, data.request)
  }

  public static unexpected(message: string) {
    return new AxiosRequestError(0, message)
  }
}

export type ApiCommonError = ClientError | ServerError | UnexpectedError

/**
 * Evaluates default error cases from API call
 * @param reason
 * @returns {ClientError} when error code is 404 or 429
 * @returns {ServerError} when error code is 500
 * @returns {UnexpectedError} when something else happened
 */
export const parseRequestCommonError = (reason: unknown): ApiCommonError => {
  const error = parseRequestError(reason)

  switch (error.code) {
    case 404:
      return ClientError.of(error.message)
    case 429:
      return ClientError.of(error.message)
    case 500:
      return ServerError.of(error.request, error.message)
    default:
      return UnexpectedError.of(error.message)
  }
}

export const parseRequestError = (error: unknown): AxiosRequestError => {
  const axiosError = error as AxiosError
  const anyError = error as Error

  if (axiosError.response) return AxiosRequestError.of(axiosError)
  else return AxiosRequestError.unexpected(anyError.message)
}
