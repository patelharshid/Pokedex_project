import { useEffect, useState} from "react"
import axios from "axios"
import  './PokemonList.css'
import Pokemon from "../pokemon/pokemon"

function PokrmonList(){

    const [ pokemonList , setpokemonList]=useState([])
    const [isLoding ,setisLoding]=useState(true)
    const POKEMON_URL='https://pokeapi.co/api/v2/pokemon'

   async function dowloadpokemons(){
        const response=await axios.get(POKEMON_URL);//this downloads  list of 20  pokemon

        const pokemonResult=response.data.results; //we get the arrrat of pokemon from result

        //iterating over the array of pokemon and using their yrl to crate an array of promises
        //that will download those 20 pokemon
       const pokemonResultPromise= pokemonResult.map((pokemon)=>axios.get(pokemon.url));

       //passing that promise array to axios.all
       const pokemonData=await axios.all(pokemonResultPromise)
       console.log(pokemonData)

       //now iterate on the data of each pokemon, and extaract id ,name ,image and type
       const pokeListresult = pokemonData.map((pokedata)=>{
        const pokemon=pokedata.data;
        return {
            id:pokemon.id,
            name: pokemon.name , 
            image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, 
            types: pokemon.types}
       });
       console.log(pokeListresult)
       setpokemonList(pokeListresult)
        setisLoding(false)
    }

    useEffect(async()=>{
        dowloadpokemons();
    },[])

   
    return (
        <div className="pokemon-list-wrapper">
          <div>Pokemon List....</div>
          {(isLoding) ? 'Loding...' : 
                pokemonList.map((p)=> <Pokemon name={p.name} image={p.image}  key={p.id}/>)
          }
        </div>
    )

}
export default PokrmonList