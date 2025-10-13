<script setup lang="ts">
import { Country } from '../types/data';
import { ref, onMounted } from 'vue' 

// --- FIXED: Define props interface correctly to expect an array of Country ---
interface SortCatalogProps {
    countries: Country[] // Expects an array of countries
}

// --- FIXED: Use the corrected interface name ---
const props = defineProps <SortCatalogProps>()

// Added type safety to sortOrder ref
const sortOrder = ref<'asc' | 'desc' | 'default'>('default');

const emit = defineEmits(['sort'])

const handleSort = () => {
    if(sortOrder.value === "default") {
        emit('sort', 'RESET_SORT')
        return 
    }
    
    const sorted = [...props.countries].sort((a, b) => {
        const aValue = a.name.common
        const bValue = b.name.common
        
        if (sortOrder.value === 'asc') {
            return aValue.localeCompare(bValue)
        } else {
            return bValue.localeCompare(aValue)
        }
    })

    emit('sort', sorted)
}
onMounted(() => {
    handleSort();
})
</script>

<template>
    <div class="p-2">
       <label for="country-sort" class="mr-5">Sort by Name</label>
        <select 
            id="country-sort"
            name="Sort" 
            class="p-2 border border-gray-300 rounded"
            v-model="sortOrder"
            @change="handleSort"
        >
            <option value="default">Default</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
        </select>
    </div>
</template> 