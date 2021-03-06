<script lang="ts">
import { useHttp } from '@/hooks/useHttp'
import { useField, useForm } from 'vee-validate'
import { defineComponent, ref } from 'vue'
import { string, number, date } from 'yup'
import { Heading, FieldText, Card, PushButton } from '@/components/ui'
import InitiativeForm from '@/components/projects/InitiativesForm.vue'
import { useRouter } from 'vue-router'

interface Project {
  title: string
  description: string
  deadline: Date
  budget: number
  initiatives: {
    title: string
    description: string
    budget: number
    owners: Record<'name', string>[]
  }[]
}

export default defineComponent({
  components: {
    Heading,
    FieldText,
    Card,
    PushButton,
    InitiativeForm,
  },
  setup() {
    const router = useRouter()
    const newProject = ref<Project>({
      title: '',
      description: '',
      deadline: new Date(),
      budget: 0,
      initiatives: [
        {
          title: '',
          description: '',
          budget: 0,
          owners: [{ name: '' }],
        },
      ],
    })
    const [, doPost] = useHttp('post')

    const { handleSubmit } = useForm()
    const projectTitle = useField(
      'title',
      string()
        .max(255)
        .required(),
    )
    const projectDescription = useField('description', string().required())
    const projectBudget = useField(
      'budget',
      number()
        .min(0)
        .required(),
    )
    const projectDeadline = useField('deadline', date().required())

    function addInitiative() {
      newProject.value?.initiatives.push({
        title: '',
        description: '',
        budget: 0,
        owners: [{ name: '' }],
      })
    }

    const onSubmit = handleSubmit(async (e) => {
      try {
        const response = await doPost('projects', {
          json: {
            title: e.title,
            description: e.description,
            budget: e.budget,
            deadline: e.deadline,
          },
        })
        const project = await response.json()

        e.initiatives.forEach(async (initiative: any) => {
          await doPost('initiatives', {
            json: {
              ...initiative,
              project: project.id,
            },
          })
        })
        setTimeout(() => {
          router.push('/projects')
        }, 200)
      } catch (err) {
        console.log(err)
      }
    })

    return {
      newProject,
      onSubmit,
      addInitiative,
      projectTitle,
      projectDescription,
      projectBudget,
      projectDeadline,
    }
  },
})
</script>

<template>
  <div class="container py-20">
    <Heading h="1">Initiate new project</Heading>
    <form @submit.prevent="onSubmit">
      <Card class="p-4 mt-8 mb-4">
        <Heading h="2" class="mb-4">Details</Heading>
        <FieldText id="title" :field="projectTitle" label="Project Name" required />
        <FieldText id="description" :field="projectDescription" label="Description" required />
        <FieldText id="budget" :field="projectBudget" label="Budget" required type="number" />
        <FieldText id="deadline" :field="projectDeadline" label="Deadline" required type="date" />
      </Card>
      <Card class="mt-4" v-for="(initiative, i) of newProject.initiatives" :key="i">
        <InitiativeForm :initiative="initiative" :i="i" />
      </Card>
      <div class="h-4"></div>
      <PushButton variant="secondary" label="Add initiative" @click="addInitiative" type="button" />
      <PushButton
        variant="primary"
        label="Submit project proposal"
        @click="onSubmit"
        type="submit"
        class="ml-2"
      />
    </form>
  </div>
</template>
