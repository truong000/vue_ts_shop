<script setup lang="ts">
import Loading from '@/components/Loading/index.vue'
import { computed, watch } from 'vue'
import useCommon from './core/hooks/useCommon'
import Layout from './layouts/BasicLayout/index.vue'
import AuthLayout from './layouts/AuthenticationLayout/index.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from './stores/auth'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
/**
 * Page: Root page
 */
const { storeGetters } = useCommon('useCommonStore')
const isLoading = computed(() => {
  const { loading } = storeGetters()

  return loading.value
})

const { loginSuccess } = storeToRefs(useUserStore())

watch(loginSuccess, (newValue) => {
  if (newValue) {
    toast.success('Login successful!')
  }
})
</script>

<template>
  <!-- <Layout /> -->
  <AuthLayout v-if="!loginSuccess" />
  <Layout v-if="loginSuccess" />
  <!-- <RouterView v-if="loginSuccess" /> -->
  <Loading :is-loading="isLoading" />
</template>
