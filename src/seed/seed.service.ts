import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { Pokemon } from './interfaces/pokmeon-response.interfaces';

@Injectable()
export class SeedService {
  private readonly axios:AxiosInstance=axios
async executeSeed(){
const {data} =await this.axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon?limit=10`)
let array:any[]=[]
data.results.forEach(pokemon =>  {
  let url =pokemon.url
  let id =url.split('/')
array.push({name:pokemon.name,id:id[id.length-2]})
})
return array
}
}





