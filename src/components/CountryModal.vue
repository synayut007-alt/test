<script setup>
import { computed } from 'vue'


    const props = defineProps(
        {
            country:{
                type: Object,
                required : true
            },
            isOpen: {
                type: Boolean,
                default: false
            }
        }
    )

    const emit = defineEmits(['close'])
    
    const closeModal = () => {
        emit('close')
    }

    const getNativeName = computed(() => {
        if (!props.country.name?.nativeName){
            return props.country.name.official;
        }
        const firstNativeLanguage = Object.keys(props.country.name.nativeName)[0];
        return props.country?.name.nativeName[firstNativeLanguage]?.official
    })
    const getCurrency= computed(() =>{
        if(!props.country.currencies){
            return 'N/A'
        }
        return Object.entries(props.country.currencies)
        .map(([code, curr]) => `${curr.name} (${code}) - Symbol: ${curr.symbol || 'N/A'}`)
        .join(', ');
    })

    const getRegion = computed(()=> {
        if(!props.country.region){
            return "N/A"
        }
        return props.country.region
    })
    const getSubRegion = computed(()=> {
        if(!props.country.subregion){
            return "N/A"
        }
        return props.country.subregion
    })    
    const getLanguages = computed(() => {
        if(!props.country.languages) return 'N/A';
        return Object.entries(props.country.languages)
            .map(([code, name]) => `${name} (${code})`)
            .join(', ');
    });
    const getCapitals = computed(() => {
        if(!props.country.capital || props.country.capital.length === 0) return 'N/A';
        return props.country.capital.join(', ');
    });
    const formatPopulation = computed(() => {
        if(!props.country.population) return 'N/A';
        return props.country.population.toLocaleString();
    });
    const getAllAlterSpells = (country) => {
    if(!country.altSpellings || country.altSpellings.length === 0){
        return ""
    }
    
    return country.altSpellings[0]
    }
</script>

<template>
    <div>
        <div>
            <div>
                <img :src="country?.flags?.png" alt="#" class="w-full"/>
                <h1 class="text-3xl p-2 font-bold">Official name: {{country?.name?.official}}</h1>
            </div>
            <div>
                <div class="pl-2 ">
                    <p>CCA3: {{ country?.cca3 }}</p>
                    <p>CCA2: {{ country?.cca2 }}</p>
                    <p>Native Name: {{ getNativeName }}</p>
                    <p>Alternative Country Name: {{ getAllAlterSpells(country) }}</p>
                    <p>Country Calling Codes : Root: {{country.idd.root}}, Suffixes: {{country.idd.suffixes[0]}}</p>
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