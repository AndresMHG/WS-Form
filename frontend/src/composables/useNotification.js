import { ref } from 'vue';

const notifications = ref([]);

export function useNotification() {
  const addNotification = (type, message) => {
    const id = Date.now();
    notifications.value.push({ id, type, message });
    setTimeout(() => {
      notifications.value = notifications.value.filter(notification => notification.id !== id);
    }); // Deleted notification away after 2 seconds
  };

  return {
    notifications,
    addNotification
  };
}
