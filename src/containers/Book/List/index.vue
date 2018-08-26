<template>
  <div class="BookList">
    <div class="BookList__Header">
      <div class="BookList__Title">執筆するプロジェクトを選択してください</div>
    </div>
    <div class="BookList__Body">
      <div class="BookList__Projects">
        <button class="BookList__Project empty" @click="showModal = !showModal">
          <div class="BookList__EmptyIcon">
            <i class="el-icon-plus" />
          </div>
          <div class="BookList__EmptyText">新規プロジェクトを作成</div>
        </button>
        <Book v-for="book in presenter.books" class="BookList__Project" :book="book" :key="book.identifier" @remove="removeItem" />
      </div>
    </div>
    <Modal v-show="showModal" @close="showModal = false">
      <div slot="header">
        <h2>プロジェクトを作成</h2>
      </div>
      <template slot="body">
        <form class="BookList__Form" @submit.prevent="register">
          <FormBlock label="プロジェクト名" :required="true">
            <baseInput placeholder="My New Project" v-model="project.title"/>
          </FormBlock>
          <FormBlock label="技術カテゴリ">
            <baseInput/>
          </FormBlock>
          <el-button type="primary" native-type="submit" :disabled="!verified" round>追加</el-button>
        </form>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Presenter, { PresenterParams, IPresenter } from "./presenter";

import { IBook } from "@/entities/Book";
import BookEntity from "@/entities/Book";
import BookRepository from "@/repositories/BookRepository";
import UserRepository from "@/repositories/UserRepository";
import ErrorService from "@/services/ErrorService";

// Use Case
import RegisterBookUseCase, {
  IRegisterMuseumUseCase
} from "@/usecases/RegisterBookUseCase";
import RemoveBookUseCase, {
  IRemoveBookUseCase
} from "@/usecases/RemoveBookUseCase";
import LoadContainerUseCase, {
  ILoadContainerUseCase
} from "./LoadContainerUseCase";

// components
import Modal from "@/components/Base/Modal.vue";
import FormBlock from "@/components/Base/FormBlock.vue";
import BaseInput from "@/components/Base/Input.vue";
import Book from "@/components/Modules/Book.vue";

interface IData {
  project: IBook;
  showModal: boolean;
}

export default Vue.extend({
  components: {
    Modal,
    FormBlock,
    BaseInput,
    Book
  },
  data(): IData {
    return {
      project: {
        title: "",
        genre: 0
      },
      showModal: false
    };
  },
  computed: {
    verified(): boolean {
      return this.project.title.length > 0;
    },
    presenter(): IPresenter {
      const params: PresenterParams = {
        userRepository: new UserRepository(),
        bookRepository: new BookRepository()
      };

      return Presenter(params);
    }
  },
  methods: {
    async register() {
      const bookEntity = new BookEntity({
        ...this.project,
        userId: this.presenter.userId
      });
      const params: IRegisterMuseumUseCase = {
        bookRepository: new BookRepository(),
        errorService: new ErrorService({ context: "RegisterMuseumUseCase" })
      };
      const usecase = new RegisterBookUseCase(params);
      const identifier = await usecase.execute(bookEntity);
    },
    async removeItem(identifier: string) {
      const result1 = window.confirm(
        "このプロジェクトを削除してもよろしいですか？\n(この操作は取り消せません)"
      );
      if (!result1) return;

      const result2 = window.confirm(
        "本当にプロジェクトを削除してもよろしいですか？\n(この操作は取り消せません)"
      );
      if (!result2) return;

      const params: IRemoveBookUseCase = {
        bookRepository: new BookRepository(),
        errorService: new ErrorService({ context: "RemoveBook usecase" })
      };
      const usecase = new RemoveBookUseCase(params);
      await usecase.execute(identifier);
      location.reload(true);
    }
  },
  async mounted() {
    const params: ILoadContainerUseCase = {
      bookRepository: new BookRepository(),
      userId: this.presenter.userId,
      errorService: new ErrorService({ context: "LoadContainerUseCase" })
    };
    const usecase = new LoadContainerUseCase(params);
    await usecase.execute();
  }
});
</script>

<style scoped>
.BookList__Header {
  margin-bottom: 32px;
}

.BookList__Title {
  font-size: 24px;
}

.BookList__Projects {
  display: flex;
  flex-flow: wrap;
}

.BookList__Project {
  margin-right: 32px;
  margin-bottom: 32px;
}

.BookList__Project {
  height: 240px;
  width: 240px;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  cursor: pointer;
  transition: 0.3s;
}

.BookList__Project.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

.BookList__EmptyIcon {
  margin-bottom: 8px;
}

.BookList__Project:hover {
  background-color: #eee;
}
</style>
