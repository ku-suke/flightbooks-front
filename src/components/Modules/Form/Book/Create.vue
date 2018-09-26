<template>
  <Form submitLabel="作成" :isSubmitting="isSubmitting" :validator="validator" :data="innerFormData" @submit="handleSubmit">
    <FormBlock label="プロジェクト名" :required="true">
      <BaseInput placeholder="My New Project" v-model="innerFormData.title"/>
    </FormBlock>
    <FormBlock label="技術カテゴリ">
      <BaseInput/>
    </FormBlock>
  </Form>
</template>

<script lang="ts">
import Vue from "vue";
import Form from "@/components/Base/Form.vue";
import FormBlock from "@/components/Base/FormBlock.vue";
import BaseInput from "@/components/Base/Input.vue";

export interface IFormData {
  title: string;
}

interface IData {
  innerFormData: IFormData;
}

export default Vue.extend({
  components: {
    Form,
    FormBlock,
    BaseInput
  },
  data(): IData {
    return {
      innerFormData: {
        title: ""
      }
    };
  },
  props: {
    formData: {
      type: Object as () => IFormData,
      default: (): IFormData => ({
        title: ""
      })
    },
    validator: {
      type: (Function as any) as () => (data: IFormData) => boolean,
      default: (data: IFormData) => true
    },
    isSubmitting: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", this.innerFormData);
    }
  },
  watch: {
    formData: {
      immediate: true,
      handler(val) {
        if (val) this.innerFormData = val;
      }
    }
  }
});
</script>
