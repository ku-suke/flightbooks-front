<template>
  <transition name="book">
    <router-link class="BookCard" :to="{name: 'project', params: {id: book.props.identifier}}">
      <div class="BookCard__Thumbnail">
        <img :src="book.props.thumbanilUrl || 'https://images-na.ssl-images-amazon.com/images/I/5191wb7GxtL._SX350_BO1,204,203,200_.jpg'" alt="">
      </div>
      <div class="BookCard__Info">
        <div class="BookCard__Title">{{ book.props.title }}</div>
        <div class="BookCard__UpdatedAt">作成日: {{ updatedAt }}</div>
      </div>
      <div class="BookCard__Remove" @click="handleRemove">
        <el-button type="danger" icon="el-icon-close" circle />
      </div>
    </router-link>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import BookEntity from "@/entities/Book";
import { formatDate } from "@/utils/formatter";

export default Vue.extend({
  props: {
    book: {
      type: Object as () => BookEntity,
      required: true
    }
  },
  computed: {
    updatedAt(): string {
      const updatedAt = this.book.props.updatedAt;

      return updatedAt ? formatDate(updatedAt) : "";
    }
  },
  methods: {
    handleRemove() {
      this.$emit("remove", this.book.props.identifier);
    }
  }
});
</script>

<style scoped>
.BookCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 240px;
  width: 240px;
  border-radius: var(--radius-lv2);
  box-shadow: var(--shadow-normal);
  position: relative;
  text-decoration: none;
  color: var(--color-black);
  transition: var(--transition-normal);
}

.BookCard:hover {
  background-color: var(--color-light-gray);
}

.BookCard:hover > .BookCard__Thumbnail {
  opacity: 0.6;
}

.BookCard__Thumbnail {
  height: 160px;
  width: 100%;
  transition: var(--transition-normal);
}

.BookCard__Thumbnail > img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.BookCard__Info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 80px;
  width: 100%;
  padding: var(--space-lv2);
  box-sizing: border-box;
}

.BookCard__Title {
  font-style: italic;
  margin-bottom: var(--space-lv1);
  font-size: var(--fontSize-normal);
}

.BookCard__UpdatedAt {
  color: var(--color-gray);
  font-size: var(--fontSize-subText);
  font-weight: var(--fontWeight-bold);
}

.BookCard__Remove {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  display: none;
  transition: var(--transition-slow);
}

.BookCard:hover > .BookCard__Remove,
.BookCard:focus > .BookCard__Remove {
  display: block;
}

.book-enter-active,
.book-leave-active {
  transition: opacity 1s;
}
.book-enter,
.book-leave-to {
  opacity: 0;
}
</style>
