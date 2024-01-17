<script setup lang="ts">
const emit = defineEmits(['close', 'confirm'])
const props = defineProps({
  productId: Number,
  title: String,
  price: Number,
  isShow: Boolean
})

function confirmRemove() {
  emit('confirm')
}
</script>

<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    :style="isShow ? { display: 'block' } : { display: 'none' }"
    v-if="isShow"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Remove product</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">You must remove this product {{ props.title }} from your cart?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="confirmRemove">DELETE</button>
        </div>
      </div>
    </div>
  </div>
</template>
