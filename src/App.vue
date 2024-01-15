<script setup lang="ts">
import { RouterView } from 'vue-router'
import Loading from '@/components/Loading/index.vue'
import { computed } from 'vue'
import useCommon from './core/hooks/useCommon'
import Layout from './layouts/BasicLayout/index.vue'

/**
 * Page: Root page
 */
const { storeGetters } = useCommon('useCommonStore')
const isLoading = computed(() => {
  const { loading } = storeGetters()

  return loading.value
})
</script>

<template>
  <Layout />
  <Loading :is-loading="isLoading" />
</template>
