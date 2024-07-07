<template>
    <div class="notification-container">
      <transition-group name="fade" tag="div">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="['notification-container__notification', `notification-container__notification--${notification.type}`]"
        >
          {{ notification.message }}
        </div>
      </transition-group>
    </div>
  </template>
  
  <script setup>
  import { useNotification } from '@/composables/useNotification';
  const { notifications } = useNotification();
  </script>
  
  <style scoped>
    @import './WsNotification.scss'
  </style>
  