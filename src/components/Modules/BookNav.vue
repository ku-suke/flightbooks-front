<template>
  <div class="BookNavi">
    <div class="BookNavi__Navi">
      <Nav label="設定">
        <NavItem>
          プロジェクト設定
        </NavItem>
        <NavItem>
          出版設定
        </NavItem>
        <Nav label="設定">
          <NavItem>
            プロジェクト設定
          </NavItem>
          <NavItem>
            出版設定
          </NavItem>
          <Nav label="設定">
            <NavItem>
              プロジェクト設定
            </NavItem>
            <NavItem>
              出版設定
            </NavItem>
          </Nav>
        </Nav>
      </Nav>
      <Nav label="チャプター管理">
      </Nav>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Nav from '@/components/Base/Nav.vue'
import NavItem from '@/components/Base/NavItem.vue'

export default Vue.extend({
  components: {
    Nav,
    NavItem
  }
})
</script>


<style scoped>
.BookNavi {
  height: 100%;
  width: 100%;
  background-color: #2E3235;
}
</style>
