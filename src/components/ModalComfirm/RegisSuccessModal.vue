<script setup lang="ts">
const props = defineProps({
  isShow: Boolean
})
console.log('show', props.isShow)
</script>

<template>
  <div v-if="props.isShow" class="modal fade" :class="{ show: props.isShow }">
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Remove product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">You must remove this product from your cart?</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">LOGIN</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
