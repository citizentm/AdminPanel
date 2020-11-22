<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Card, Heading, FieldText, PushButton } from '@/components/ui'
import { useField, useForm } from 'vee-validate'
import { string } from 'yup'
import { useRouter } from 'vue-router'
import { useHttp } from '@/hooks/useHttp'
import { setJWT, getJWT } from '@/hooks/useJWT'

export default defineComponent({
  name: 'Auth',
  components: { Card, Heading, FieldText, PushButton },
  setup() {
    const { handleSubmit } = useForm()
    const { push } = useRouter()
    const [reqState, login] = useHttp('post')
    const errorMessage = ref()

    const email = useField('email', string().required())
    const password = useField('password', string().required())

    const onSubmit = handleSubmit(async () => {
      try {
        const response = await login('auth/local', {
          json: {
            identifier: email.value.value,
            password: password.value.value,
          },
        })
        const body = await response.json()
        if (body.jwt) {
          setJWT(body.jwt)
          push('/')
        }
      } catch (err) {
        if (err.response.statusCode >= 500) {
          errorMessage.value = 'There was a server error.'
        } else {
          errorMessage.value = 'Credentials invalid.'
        }
        return
      }
    })

    onMounted(() => {
      if (getJWT()) push('/')
    })

    return {
      email,
      password,
      onSubmit,
      reqState,
      errorMessage,
    }
  },
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <Card class="w-96 p-8">
      <Heading h="1" class="text-green-500 mb-4">Autentificare</Heading>

      <form @submit.prevent="onSubmit" novalidate class="space-y-4">
        <FieldText required :field="email" id="email" label="Email" />
        <FieldText
          required
          :field="password"
          id="password"
          label="Parolă"
          type="password"
        />

        <PushButton
          variant="primary"
          label="Autentificare"
          type="submit"
          class="w-full"
          :disabled="reqState.pending"
        />
        <div class="bg-red-100 mt-4 p-4 rounded-lg" v-if="errorMessage">
          {{ errorMessage }}
        </div>
      </form>
    </Card>
  </div>
</template>
