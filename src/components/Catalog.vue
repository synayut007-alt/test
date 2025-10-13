<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import CountryModal from './CountryModal.vue';
import SearchCountry from './SearchCountry.vue';
import SortCatalog from './SortCatalog.vue';
import type { Country } from '../types/data';

    const API_URL = "https://restcountries.com/"
    const catalog = ref <Country[]>([])
    const message = ref<string | null>()
    let isLoading = ref <boolean> ( false);
    const currentPage = ref <number>(1)
    const perPage = ref <number> (25)
    const filteredCatalog = ref <Country []>([])
    const isOpenModal = ref<boolean>(false)
    const selectModal = ref<Country | null>(null)

    const getModal = (country: Country) => {
        selectModal.value = country;
        isOpenModal.value = true
        document.body.style.overflow = 'hidden';
    }

    const closeModal = () => {
        isOpenModal.value = false
        selectModal.value = null
        document.body.style.overflow = 'auto';
    }

    const calculatedPage = computed(():number => {
        if(!filteredCatalog.value || filteredCatalog.value.length === 0){
            return 0
        }
        return Math.ceil(filteredCatalog.value.length / perPage.value)
    })

    const startIndex = computed (():number => {
        return (currentPage.value -1) * perPage.value
    })
    const endIndex = computed (():number => {
        return (startIndex.value) + perPage.value
    })

    const paginatedCatalog = computed(():Country[] => {
        if(!filteredCatalog.value || filteredCatalog.value.length === 0) {
            return [];
        }
        return filteredCatalog.value.slice(startIndex.value,endIndex.value)
    })
    const nextPage = (): void=> {
        if(currentPage.value <= calculatedPage.value){
            currentPage.value ++ 
            window.scrollTo({top: 0 , behavior: 'smooth'})
        }
    }
    const prevPage = (): void=> {
        if(currentPage.value >= 1 ){
            currentPage.value -- 
            window.scrollTo({top: 0 , behavior: 'smooth'})
        }
    }    
    const isPrevDisable = computed(():boolean => {
        return currentPage.value ===1
    })
    const isNextDisable = computed(():boolean  => {
        return currentPage.value === calculatedPage.value
    })
    
    const catalogInfor = async () => {
        try{
            isLoading.value = true
            const res = await fetch (`${API_URL}v3.1/independent?status=true`)
            console.log(isLoading.value)
            isLoading.value = false
            if(res.status === 200) {    
                catalog.value = await res.json()
                filteredCatalog.value = catalog.value
            }
        }catch(error) {
            message.value = error.message;
            console.error(error)
        }finally {
            isLoading.value = false
        }
    } 
        const handleSearch = (result : Country[]) => {
            filteredCatalog.value =  result
            currentPage.value = 1
        }
    const getNativeLanguage = (country:Country) => {
        if(!country.name.nativeName){
            return country.name.official
        }
        const firstNativeLanguage = Object.keys(country.name.nativeName)[0];
        return country.name.nativeName[firstNativeLanguage].official;
    }
    const getAllAlterSpells = (country:Country) => {
    if(!country.altSpellings || country.altSpellings.length === 0){
        return ""
    }
    
    return country.altSpellings[0]
    }
    onMounted(catalogInfor)

    const handleSort = (data) => {
  if (data === 'RESET_SORT') {
        // When the 'RESET_SORT' signal is received, revert to the original data 
        // fetched from the API (catalog.value)
        filteredCatalog.value = catalog.value
    } else {
        // For A-Z or Z-A sort, or a search result, use the data that was passed
        filteredCatalog.value = data
    }
    
    currentPage.value = 1
    }

</script>
<template >
    <div class="w-screen h-screen">
        <div class="mt-30 mb-20">
            <h1 class="text-6xl text-center font-bold text-blue-500"> Countries Catalogs</h1>
        </div>
        <div>
            <SearchCountry 
            @search="handleSearch"
            :catalog="catalog"
            /> 
        </div>
        <div class="flex justify-center items-center">
                <div class="w-410 flex items-center justify-start mb-5">
                    <button
                    @click="prevPage"
                    :disabled="isPrevDisable"
                    class=" p-3 border-1 mr-5"
                    >
                        Previos
                    </button>
                    <div class="border-1 p-3">
                        <p class="text-1xl ">
                            Page {{ currentPage }} of {{ calculatedPage }}
                        </p>
                    </div>                   
                    <button
                    @click="nextPage"
                    :disabled="isNextDisable"
                    class=" p-3 border-1 ml-5"
                    >
                        Next
                    </button>  
                    <div class="ml-5"> 
                            <SortCatalog
                                :countries="filteredCatalog" 
                                @sort="handleSort"
                            />
                        </div>                 
                </div>
        </div>       
        <div class="flex items-center justify-center ">
            
            <div v-if="isLoading">
               <h1 class="text-3xl">Loading...</h1>
                <div v-if="message">
                    <p>{{ message }}</p>
                </div>            
            </div>
            <div v-else class= "flex overflow-hidden w-450 flex-wrap justify-center"> 
                <div v-for="countryInfor in paginatedCatalog" :key="countryInfor.name.common" class="">
                    <div class="w-80 p-2 mb-20 h-100 border-1 flex flex-col items-center m-1" @click="getModal(countryInfor)">
                        <div class="w-70 h-40 overflow-hidden">
                            <img class="w-70" :src="countryInfor.flags.png">
                        </div>
                        <div class="pl-5 pt-5">
                            <h2 class="text-1xl font-bold">Official Name: {{ countryInfor.name.official }}</h2>
                            <p>CCA2 : {{ countryInfor.cca2 }}</p>
                            <p>CCA3 : {{ countryInfor.cca3 }}</p>
                            <p>Native Name : {{getNativeLanguage(countryInfor)}}</p>
                            <p>Alternative Country Name : {{getAllAlterSpells(countryInfor)}}</p>
                            <p>Country Calling Codes : Root: {{countryInfor.idd.root}}, Suffixes: {{countryInfor.idd.suffixes[0]}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isOpenModal" class="fixed inset-0 z-50 flex items-center justify-center p-2">
        <CountryModal
            :country="selectModal"
            :isOpen="isOpenModal"
            @close="closeModal"
            class="w-full max-w-xl border-1 bg-white p-6 shadow-2xl"
        />
        </div>
    </div>
</template>