<script setup lang="ts">
import { computed } from 'vue'
import type { Country } from '../types/data'

// Define prop types with interface
interface CountryModalProps {
  country: Country
  isOpen: boolean
}

// Define emit types
interface CountryModalEmits {
  close: []
}

// Props with TypeScript
const props = defineProps<CountryModalProps>()

// Emit with TypeScript
const emit = defineEmits<CountryModalEmits>()

// Function with clear return type
const closeModal = (): void => {
  emit('close')
}

// Computed property with return type
const getNativeName = computed((): string => {
  if (!props.country?.name?.nativeName) {
    return props.country?.name?.official || 'N/A'
  }
  
  const firstNativeLanguage: string = Object.keys(props.country.name.nativeName)[0]
  return props.country?.name?.nativeName[firstNativeLanguage]?.official || 'N/A'
})

const getCurrency = computed((): string => {
  if (!props.country?.currencies) {
    return 'N/A'
  }
  
  return Object.entries(props.country.currencies)
    .map(([code, curr]) => {
      const symbol: string = curr?.symbol || 'N/A'
      const name: string = curr?.name || 'Unknown'
      return `${name} (${code}) - Symbol: ${symbol}`
    })
    .join(', ')
})

// Computed property with explicit type
const getRegion = computed((): string => {
  if (!props.country?.region) {
    return 'N/A'
  }
  return props.country.region
})

// Computed property with explicit type
const getSubRegion = computed((): string => {
  if (!props.country?.subregion) {
    return 'N/A'
  }
  return props.country.subregion
})

// Computed property with object transformation
const getLanguages = computed((): string => {
  if (!props.country?.languages) {
    return 'N/A'
  }
  
  const languageEntries: Array<[string, string]> = Object.entries(props.country.languages)
  
  return languageEntries
    .map(([code, name]: [string, string]) => `${name} (${code})`)
    .join(', ')
})

// Computed property with array handling
const getCapitals = computed((): string => {
  if (!props.country?.capital || props.country.capital.length === 0) {
    return 'N/A'
  }
  
  return props.country.capital.join(', ')
})

// Regular function with type annotation
const getAllAlterSpells = (country: Country | null | undefined): string => {
  if (!country?.altSpellings || country.altSpellings.length === 0) {
    return 'N/A'
  }
  
  return country.altSpellings[0]
}
</script>

<template>
  <div>
    <div>
      <div>
        <img 
          :src="country?.flags?.png" 
          :alt="country?.name?.official || 'Country flag'"
          class="w-full"
        />
        <h1 class="text-3xl p-2 font-bold">
          Official name: {{ country?.name?.official }}
        </h1>
      </div>


      <div>
        <div class="pl-2">
          <p>CCA3: {{ country?.cca3 }}</p>
          <p>CCA2: {{ country?.cca2 }}</p>
          <p>Native Name: {{ getNativeName }}</p>
          <p>Alternative Country Name: {{ getAllAlterSpells(country) }}</p>
          <p>
            Country Calling Codes: Root: {{ country?.idd?.root }}, 
            Suffixes: {{ country?.idd?.suffixes?.[0] || 'N/A' }}
          </p>
          <p>Currency: {{ getCurrency }}</p>
          <p>Capital: {{ getCapitals }}</p>
          <p>Languages: {{ getLanguages }}</p>
          <p>Region: {{ getRegion }}</p>
          <p>Subregion: {{ getSubRegion }}</p>
        </div>
      </div>

      <div class="flex justify-center mt-8">
        <button 
          @click="closeModal"
          class="px-8 py-3 bg-blue-500 text-white hover:bg-blue-600 text-xl"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>