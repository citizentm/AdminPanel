import ky, { Options, ResponsePromise } from 'ky'
import { reactive } from 'vue'
import { getJWT } from './useJWT'

type methods = 'get' | 'put' | 'post' | 'patch' | 'delete'

const http = ky.create({
  prefixUrl: '/api',
  hooks: {
    beforeRequest: [
      (request) => {
        if (getJWT()) request.headers.set('Authorization', `Bearer ${getJWT()}`)
      },
    ],
  },
})

export function useHttp(
  method: methods,
): [State, (path: string, options?: Options) => Promise<ResponsePromise>] {
  const state = reactive<State>({
    success: false,
    pending: false,
    error: false,
  })

  const call = async (
    path: string,
    options?: Options,
  ): Promise<ResponsePromise> => {
    return await http[method](path, options)
  }

  return [state, call]
}

interface State {
  success: boolean
  pending: boolean
  error: boolean
}
