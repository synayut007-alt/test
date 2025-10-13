<script setup lang="ts">
import { ref } from 'vue';
import type { Country } from '@/types/data';

const props = defineProps<{
  catalog: Country[];
}>();

const API_URL = "https://restcountries.com/v3.1/name/";
const emit = defineEmits<{
  search: [countries: Country[]];
}>();

const searchQuery = ref<string>("");
const isLoading = ref<boolean>(false);
const message = ref<string>("");

const searchData = async () => {
  if (!searchQuery.value.trim()) {
    emit('search', props.catalog);
    return;
  }

  try {
    isLoading.value = true;
    const res = await fetch(`${API_URL}${searchQuery.value}`);
    
    if (res.status === 200) {
      const data: Country[] = await res.json();
      const filterCountry = data.filter(searchResult =>
        props.catalog.some(country => country.cca3 === searchResult.cca3)
      );
      message.value = "";
      emit('search', filterCountry);
    } else if (res.status === 404) {
      message.value = "No country found";
      emit('search', []);
    }
  } catch (error) {
    console.error(message.value);
    emit('search', []);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <div class="flex items-center justify-center mb-8">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search countries..."
        class="w-200 border border-gray-300 p-3 text-lg rounded"
        @keyup.enter="searchData"
      />
      <button
        class="p-3 bg-blue-500 text-white text-lg ml-4 rounded hover:bg-blue-600 transition disabled:opacity-50"
        :disabled="isLoading"
        @click="searchData"
      >
        {{ isLoading ? 'Loading...' : 'Search' }}
      </button>
    </div>
    <div v-if="message" class="text-red-500 text-center">{{ message }}</div>
  </div>
</template>