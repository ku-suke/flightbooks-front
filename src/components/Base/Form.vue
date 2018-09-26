<template>
  <form class="Form" @submit.prevent="handleSubmit">
    <slot />
    <Button :text="submitLabel" nativeType="submit" :type="ButtonType.Primary" :disabled="!isValid" :loading="isSubmitting" />
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import Button, { Type as ButtonType } from "@/components/Base/Button.vue";

interface IData {
  ButtonType: typeof ButtonType;
}

export default Vue.extend({
  components: {
    Button
  },
  data(): IData {
    return {
      ButtonType
    };
  },
  props: {
    data: {
      type: Object as () => any,
      required: true
    },
    validator: {
      type: (Function as any) as () => (data: any) => boolean,
      default: (data: any) => true
    },
    isSubmitting: {
      type: Boolean,
      default: false
    },
    submitLabel: {
      type: String,
      default: "送信"
    }
  },
  computed: {
    isValid(): boolean {
      return this.validator(this.data);
    }
  },
  methods: {
    handleSubmit() {
      if (!this.isValid) return;
      this.$emit("submit", this.data);
    }
  }
});
</script>

<style scoped>
.Form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
