<script setup> 
import { ref } from 'vue';
 const props = defineProps({
    catalog: {
        type: Array,
        required: true
    }
 });
 const API_URL = "https://restcountries.com/v3.1/name/"
 const emit = defineEmits(['search'])

 const searchQuery = ref("")
 const isLoading = ref(false)
 const message = ref("")

 const searchData = async () => {
    if(!searchQuery.value.trim()){
        emit('search' , props.catalog)
        return
    }

    try{
        isLoading.value = true
       console.log(isLoading)
        const res = await fetch(`${API_URL}${searchQuery.value}`)
        if(res.status === 200) {
            const data = await res.json()
            const filterCountry = data.filter(searchResult => props.catalog.some(country => country.cca3 === searchResult.cca3))
            emit('search' , filterCountry)
        }else if ( res.status === 404){
            message.value = "No country"
            emit('search' , [])
        }
    }catch(error){
        message.value = error.message;
        console.error(message.value)
        emit ('search' , [])
    }finally{
        isLoading.value =false
    }
 }  

//  const clearSearch = () => {
//     search.value = ""
//     emit('search', props.catalog)
//  }

</script>

<template>
    <div>
        <div class="flex items-center justify-center mb-30">
            <input type="text" v-model="searchQuery" placeholder="search"
            class="w-200 border-1 p-3 text-2xl flex items-center justify-center"
            @keyup.enter="searchData"
            >
            <button class="p-3 bg-blue-500 text-2xl ml-5 text-white"
            @click="searchData">{{ isLoading ? 'Loading...' : 'Search' }}</button>
        </div>
    </div>
</template>