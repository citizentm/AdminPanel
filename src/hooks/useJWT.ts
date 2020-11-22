import { ref } from 'vue'

const jwt = ref<string>()

export function setJWT($jwt: string) {
  localStorage.setItem('jwt', $jwt)
  jwt.value = $jwt
}

export function removeJWT() {
  localStorage.removeItem('jwt')
  jwt.value = undefined
}

export function getJWT() {
  if (jwt.value) {
    return jwt.value
  }
  const jwtLS = localStorage.getItem('jwt')

  if (jwtLS) {
    setJWT(jwtLS)
    return jwtLS
  }
  return null
}
