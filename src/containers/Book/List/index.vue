<template>
  <div class="BookList">
    <div class="BookList__Header">
      <PageTitle label="執筆するプロジェクトを選択してください" />
    </div>
    <div class="BookList__Body">
      <div class="BookList__Projects">
        <BookEmpty class="BookList__Project" @click="showModal = !showModal" />
        <BookCard v-for="book in presenter.books" class="BookList__Project" :book="book" :key="book.identifier" />
      </div>
    </div>
    <Modal v-show="showModal" @close="showModal = false">
      <div slot="header">
        <h2>プロジェクトを作成</h2>
      </div>
      <template slot="body">
        <CreateBookForm :isSubmitting="isRegistering" :validator="createBookValidator" @submit="register" />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Presenter, { IPresenter } from "./presenter";

import BookRepository from "@/repositories/BookRepository";
import UserRepository from "@/repositories/UserRepository";
import ProjectTreeRepository from "@/repositories/ProjectTreeRepository";
import ErrorService from "@/services/ErrorService";

// Use Case
import RegisterBookUseCase from "@/usecases/RegisterBookUseCase";
import FetchBookListUseCase from "@/usecases/Book/FetchBookListUseCase";
import DestroyContainerUseCase from "./DestroyContainerUseCase";

// components
import PageTitle from "@/components/Base/PageTitle.vue";
import BookEmpty from "@/components/Modules/Book/Empty.vue";
import BookCard from "@/components/Modules/Book/Card.vue";
import Modal from "@/components/Base/Modal.vue";
import CreateBookForm, {
  IFormData
} from "@/components/Modules/Form/Book/Create.vue";

interface IData {
  showModal: boolean;
  isRegistering: boolean;
}

export default Vue.extend({
  components: {
    PageTitle,
    BookEmpty,
    Modal,
    BookCard,
    CreateBookForm
  },
  data(): IData {
    return {
      showModal: false,
      isRegistering: false
    };
  },
  computed: {
    presenter(): IPresenter {
      return Presenter({
        userRepository: new UserRepository(),
        bookRepository: new BookRepository()
      });
    }
  },
  methods: {
    async register({ name }: { name: string }) {
      this.isRegistering = true;
      const usecase = new RegisterBookUseCase({
        bookRepository: new BookRepository(),
        projectTreeRepository: new ProjectTreeRepository(),
        errorService: new ErrorService({ context: "RegisterBook UseCase" })
      });

      const owner = this.presenter.userId;
      await usecase.execute({ owner, name });
      this.isRegistering = false;
      this.showModal = false;
      await this.loadContainer();
    },
    // async removeItem(identifier: string) {
    //   const result1 = window.confirm(
    //     "このプロジェクトを削除してもよろしいですか？\n(この操作は取り消せません)"
    //   );
    //   if (!result1) return;

    //   const result2 = window.confirm(
    //     "本当にプロジェクトを削除してもよろしいですか？\n(この操作は取り消せません)"
    //   );
    //   if (!result2) return;

    //   const params: IRemoveBookUseCase = {
    //     bookRepository: new BookRepository(),
    //     errorService: new ErrorService({ context: "RemoveBook usecase" })
    //   };
    //   const usecase = new RemoveBookUseCase(params);
    //   await usecase.execute(identifier);
    //   location.reload(true);
    // },
    async loadContainer() {
      const usecase = new FetchBookListUseCase({
        bookRepository: new BookRepository(),
        userId: this.presenter.userId,
        errorService: new ErrorService({ context: "FetchBookListUseCase" })
      });
      await usecase.execute();
    },
    createBookValidator(data: IFormData): boolean {
      return data.name.length > 0;
    }
  },
  async mounted() {
    await this.loadContainer();
  },
  async destroyed() {
    const usecase = new DestroyContainerUseCase({
      bookRepository: new BookRepository()
    });
    await usecase.execute();
  }
});
</script>

<style scoped>
.BookList {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.BookList__Body {
  width: 100%;
}

.BookList__Projects {
  display: flex;
  flex-flow: wrap;
}

.BookList__Project {
  margin-right: var(--space-lv4);
  margin-bottom: var(--space-lv4);
}
</style>
