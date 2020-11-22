<script lang="ts">
import { useField } from 'vee-validate'
import { defineComponent } from 'vue'
import { string, number } from 'yup'
import { FieldText, Heading } from '@/components/ui'

export default defineComponent({
  components: {
    FieldText,
    Heading,
  },
  props: {
    initiative: { type: Object, required: true },
    i: { type: Number, required: true },
  },
  setup(props) {
    const initiativeTitle = useField(
      `initiatives[${props.i}].title`,
      string()
        .max(255)
        .required(),
    )
    const initiativeDescr = useField(`initiatives[${props.i}].description`, string().required())
    const initiativeBudget = useField(
      `initiatives[${props.i}].budget`,
      number()
        .min(0)
        .required(),
    )
    const initiativeInitiators = useField(
      `initiatives[${props.i}].initiators[0].name`,
      string().required(),
    )
    return {
      initiativeTitle,
      initiativeDescr,
      initiativeBudget,
      initiativeInitiators,
    }
  },
})
</script>

<template>
  <div class="flex flex-col p-4 border border-gray-200 rounded-lg">
    <Heading h="3" class="mb-4">Initiative {{ i + 1 }}</Heading>
    <FieldText :id="`title${i}`" :field="initiativeTitle" label="Initiative Name" required />
    <FieldText :id="`description-${i}`" :field="initiativeDescr" label="Description" required />
    <FieldText
      :id="`budget-${i}`"
      :field="initiativeBudget"
      label="Budget"
      required
      type="number"
    />
    <FieldText
      :id="`initiators-${i}`"
      :field="initiativeInitiators"
      label="Initiator name"
      required
      type="text"
    />
  </div>
</template>
