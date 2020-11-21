<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
// import { object, Ref } from 'yup'

const validator = (value: string) =>
  ['text', 'email', 'password', 'tel'].includes(value)

export default defineComponent({
  props: {
    field: { required: true, type: Object },
    id: { required: true, type: String },
    label: { required: true, type: String },
    type: { default: 'text', validator },
    placeholder: { default: '' },
    required: { default: false },
    disabled: { default: false },
    prepend: { default: false },
    append: { default: false },
  },
  setup(props, { emit }) {
    const showError = ref<boolean>(false)

    const input = computed({
      get: () => props.field.value,
      set: (value) => emit('update:field', value),
    })

    return {
      input,
      showError,
    }
  },
})
</script>

<template>
  <label class="flex flex-col" :for="id">
    <p class="font-bold uppercase text-sm text-gray-600 pb-1">{{ label }}</p>
    <div
      class="h-12 flex flex-row items-center rounded border border-gray-200 focus-within:ring ring-green-500 transition"
    >
      <div
        v-if="prepend"
        class="border-r border-gray-200 h-full px-2 flex items-center"
      >
        <slot name="prepend" />
      </div>
      <input
        v-model="input.value"
        :id="id"
        :type="type"
        :required="required"
        :disabled="disabled"
        :placeholder="placeholder"
        class="px-3 h-full w-full focus:outline-none"
      />
      <div
        v-if="append"
        class="border-l border-gray-200 h-full px-2 flex items-center"
      >
        <slot name="append" />
      </div>
    </div>
    <div class="h-4">
      <p
        role="alert"
        :class="[`text-red-500 text-sm`, { hidden: !field.errorMessage.value }]"
      >
        {{ field.errorMessage.value }}
      </p>
    </div>
  </label>
</template>
