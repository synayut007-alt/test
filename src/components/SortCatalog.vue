<script setup>
import { ref } from 'vue'

const props = defineProps({
    catalog: {
        type: Array,
        required: true
    }
})

const sortOrder = ref('');

const emit = defineEmits(['sort'])

const handleSort = () => {
    if(sortOrder.value === "") {
        emit('sort', props.catalog)
        return []
    }
    
    const sorted = [...props.catalog].sort((a, b) => {
        const aValue = a.name.common // Adjust this to your actual property path
        const bValue = b.name.common // e.g., a.name, a.title, etc.
        
        if (sortOrder.value === 'asc') {
            return aValue.localeCompare(bValue)
        } else {
            return bValue.localeCompare(aValue)
        }
    })

    emit('sort', sorted)
}
</script>

<template>
    <div class="p-2">
       <label for="" class="mr-5">Sort</label>
        <select 
            name="Sort" 
            class="p-2 border-1"
            v-model="sortOrder"
            @change="handleSort"
        >
            <option value="">-- Select --</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
        </select>
    </div>
</template>