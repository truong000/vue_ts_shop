<script setup lang="ts">
import { ref, watch } from 'vue'
const emit = defineEmits(['close', 'confirm'])
const props = defineProps({
  productId: Number,
  title: String,
  price: Number,
  isShow: Boolean
})

const show = ref(props.isShow)

watch(
  () => props.isShow,
  (newVal) => {
    show.value = newVal
  }
)

function handleClose() {
  emit('close')
}

function handleConfirm() {
  emit('confirm')
  handleClose()
}
watch(
  () => props.isShow,
  (newVal) => {
    if (!newVal) document.getElementsByClassName('modal-backdrop fade in')[0].className = ''
  }
)
</script>

<template>
  <div
    v-if="show"
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
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="handleClose"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Are you sure you want to remove the product {{ title }} from your cart?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="handleConfirm">DELETE</button>
        </div>
      </div>
    </div>
  </div>
</template>
