<script lang="ts">
import Vue, { VNode } from "vue";
export default Vue.extend({
  props: {
    vnode: {
      type: Object as () => VNode,
      required: true
    }
  },
  render() {
    return this.vnode;
  }
});
</script>
