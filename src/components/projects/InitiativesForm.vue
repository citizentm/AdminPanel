<script lang="ts">
import { useField } from 'vee-validate'
import { defineComponent } from 'vue'
import { string, number } from 'yup'
import { FieldText } from '@/components/ui'

export default defineComponent({
  components: {
    FieldText,
  },
  props: {
    initiative: { type: Object, required: true },
    i: { type: Number, required: true },
  },
  setup(props) {
    const initiativeTitle = useField(
      'initiativetTitle',
      string()
        .max(255)
        .required(),
    )
    const initiativeDescr = useField('initiativetDescription', string().required())
    const initiativeBudget = useField(
      'initiativetBudget',
      number()
        .min(0)
        .required(),
    )
    return {
      initiativeTitle,
      initiativeDescr,
      initiativeBudget,
    }
  },
})
</script>

<template>
  <div class="flex flex-col p-4 border border-gray-200">
    <FieldText :id="`title-${i}`" :field="initiativeTitle" label="Initiative Name" required />
    <FieldText :id="`description-${i}`" :field="initiativeDescr" label="Description" required />
    <FieldText
      :id="`budget-${i}`"
      :field="initiativeBudget"
      label="Budget"
      required
      type="number"
    />
  </div>
</template>
