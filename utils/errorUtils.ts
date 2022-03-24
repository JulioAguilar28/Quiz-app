import { AxiosError } from 'axios'

export const getErrorMessageFromApi = (error: AxiosError, defaultMessage = ''): string => {
  if (error.response?.data) {
    return error.response.data.error as string
  }

  return defaultMessage
}
