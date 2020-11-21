<script lang="ts">
import { defineComponent } from 'vue'
import { Card, Heading, FieldText, PushButton } from '@/components/ui'
import { useField, useForm } from 'vee-validate'
import { string } from 'yup'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Auth',
  components: { Card, Heading, FieldText, PushButton },
  setup() {
    const { handleSubmit } = useForm()
    const { push } = useRouter()

    const email = useField(
      'email',
      string()
        .email()
        .required(),
    )
    const password = useField('password', string().required())

    const onSubmit = handleSubmit(() => {
      push('/')
    })

    return {
      email,
      password,
      onSubmit,
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
        <FieldText required :field="password" id="password" label="Parolă" />

        <PushButton
          variant="primary"
          label="Autentificare"
          type="submit"
          class="w-full"
        />
      </form>
    </Card>
  </div>
</template>
