 <template>
   <div class="wrapper">
     <div class="header">
       <div class="title">書籍設定</div>
     </div>
     <div class="content" v-if="presenter.book">
      <FormBlock label="書籍名">
        <Input v-model="presenter.book.name" placeholder="猫でもわかるflightbooks" :disabled="isLoading"/>
      </FormBlock>
      <FormBlock label="コピーライト">
        <Input v-model="presenter.book.copyright" placeholder="(c)2015 neko" :disabled="isLoading"/>
      </FormBlock>
      <FormBlock>
        <Button text="保存" @click="save" :loading="isLoading" :disabled="isLoading"/>
      </FormBlock>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

import Presenter, { IPresenter } from "./presenter";

import FetchBookUseCase from "@/usecases/Book/FetchBookUseCase";
import SaveBookUseCase from "@/usecases/Book/SaveBookUseCase";

import BookEntity from "@/entities/Book";

import BookRepository from "@/repositories/BookRepository";
import ErrorService from "@/services/ErrorService";

import Input from "@/components/Base/Input.vue";
import Select from "@/components/Base/Select.vue";
import FormBlock from "@/components/Base/FormBlock.vue";
import Button, {
  Type as ButtonType,
  Size as ButtonSize
} from "@/components/Base/Button.vue";

interface IData {
  isLoading: boolean;
}

export default Vue.extend({
  components: {
    FormBlock,
    Input,
    Button
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data(): IData {
    return {
      isLoading: false
    };
  },
  computed: {
    presenter(): IPresenter {
      let p = Presenter({
        bookRepository: new BookRepository()
      });
      return p;
    }
  },
  methods: {
    async fetchBook() {
      const usecase = new FetchBookUseCase({
        bookRepository: new BookRepository(),
        errorService: new ErrorService({ context: "LoadContainer UseCase" })
      });
      await usecase.execute(this.id);
    },
    async save() {
      this.isLoading = true;

      // Bookを保存する
      const saveBookUseCase = new SaveBookUseCase({
        BookRepository: new BookRepository(),
        errorService: new ErrorService({ context: "saveBookJob UseCase" })
      });

      const item = new BookEntity({
        ...this.presenter.Book,
        identifier: this.id
      });
      await saveBookUseCase.execute(item);

      this.isLoading = false;
      alert("Bookを保存しました");
    }
  },
  async mounted() {
    await this.fetchBook();
  }
});
</script>

<style scoped>
.title {
  padding: 24px;
  font-size: 24px;
}

.content {
  width: 640px;
  margin: 0 auto;
}

.select {
  box-sizing: border-box;
  font-size: 14px;
  min-height: 50px;
  padding: 10px 18px;
  line-height: 30px;
  color: #070707;
  background-color: #f6f6f6;
  outline: none;
  border: 1px solid #dadbe3;
  border-radius: 4px;
  transition: 0.3s;
  appearance: none;
}
</style>
