<template>
  <transition name="book">
    <a class="Book">
      <div class="Book__Thumbnail">
        <img :src="book.props.thumbanilUrl || 'https://images-na.ssl-images-amazon.com/images/I/5191wb7GxtL._SX350_BO1,204,203,200_.jpg'" alt="">
      </div>
      <div class="Book__Info">
        <div class="Book__Title">{{ book.props.title }}</div>
        <div class="Book__UpdatedAt">作成日: {{ updatedAt }}</div>
      </div>
      <div class="Book__Remove" @click="handleRemove">
        <el-button type="danger" icon="el-icon-close" circle />
      </div>
    </a>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import BookEntity from '@/entities/Book'
import { formatDate } from '@/utils/formatter'

export default Vue.extend({
  props: {
    book: {
      type: Object as () => BookEntity,
      required: true,
    },
  },
  computed: {
    updatedAt(): string {
      const updatedAt = this.book.props.updatedAt

      return updatedAt ? formatDate(updatedAt) : ''
    }
  },
  methods: {
    handleRemove() {
      this.$emit('remove', this.book.props.identifier)
    }
  }
})
</script>

<style scoped>
.Book {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.Book:hover > .Book__Thumbnail {
  opacity: .6;
}

.Book__Thumbnail {
  height: 160px;
  width: 100%;
  transition: .3s;
}

.Book__Thumbnail > img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.Book__Info {
  height: 80px;
  width: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start
}

.Book__Title {
  font-style: italic;
  margin-bottom: 8px;
}

.Book__UpdatedAt {
  color: #ddd;
  font-size: 12px;
  font-weight: bold;
}

.Book__Remove {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  display: none;
  transition: .5s;
}

.Book:hover > .Book__Remove {
  display: block;
}

.book-enter-active, .book-leave-active {
  transition: opacity 1s;
}
.book-enter, .book-leave-to {
  opacity: 0;
}
</style>
