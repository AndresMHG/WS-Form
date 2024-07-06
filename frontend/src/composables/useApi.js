import { ref } from 'vue';

// Obtiene el dominio de la API desde el archivo .env
const apiDomain = import.meta.env.VITE_API_DOMAIN || 'http://localhost:3010';

export function useApi() {
  const isLoading = ref(false);
  const error = ref(null);
  const successMessage = ref(null);

  const apiFetch = async (url, options = {}) => {
    isLoading.value = true;
    error.value = null;
    successMessage.value = null;

    // Asegura que la URL completa sea utilizada
    const fullUrl = `${apiDomain}${url}`;

    try {
      const response = await fetch(fullUrl, options);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch ${fullUrl}: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      if (result.status === 'error') {
        throw new Error(result.error || 'An error occurred');
      }
      successMessage.value = result.message;
      return result;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    successMessage,
    apiFetch
  };
}
