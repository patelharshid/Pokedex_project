import PokrmonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./pokedex.css"
function Pokedex(){
    return(
        <div className="pokedex-wrapper">
            <h1 id="pokedex-heading"> Pokedex</h1>
           <Search />
           <PokrmonList />
        </div>
    )

}
export default Pokedex;