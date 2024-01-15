<script setup lang="ts">
import useCommon from '@/core/hooks/useCommon'
import { computed } from 'vue'

const { storeGetters } = useCommon('useCartStore')
const count = computed(() => {
  const { countItem } = storeGetters()
  return countItem.value
})
</script>

<template>
  <div class="basic-layout">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <div>ShoppingCart</div>

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/cart">Cart {{ count }}</RouterLink>
        </nav>
      </div>
    </header>
    <div class="layout-root">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './styles.scss';
</style>
