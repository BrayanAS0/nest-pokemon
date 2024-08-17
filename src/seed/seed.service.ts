import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { InjectModel } from '@nestjs/mongoose';

import { PokemonResponse } from './interfaces/pokmeon-response.interfaces';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { retry } from 'rxjs';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
  private defaultlimit:number;
  constructor(
    @InjectModel(Pokemon.name)
     private readonly PokemonModel: Model<Pokemon>,
     private readonly configService:ConfigService) { 
    console.log(configService.get<number>(`defaultLimit`))

  }

  private readonly axios: AxiosInstance = axios
  async executeSeed() {
    await this.PokemonModel.deleteMany()
    const { data } = await this.axios.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon?limit=650`)
    let array: { name: string, no: string }[] = []
    data.results.forEach(pokemon => {
      let url = pokemon.url
      let id = url.split('/')
      array.push({ name: pokemon.name, no: id[id.length - 2] })
    })

    try {
      await this.PokemonModel.insertMany(array)
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon already exists${JSON.stringify(error.keyValue)}`)
      }
      console.log(error)
      throw new InternalServerErrorException('Error creating Pokemon - Ckeck server log')
    }

    return array
  }
  async findOne(term: string) {
    let pokemon = null;

    if (!isNaN(parseInt(term))) {
      pokemon = await this.PokemonModel.findOne({ no: term });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.PokemonModel.findById(term);
    }

    if (!pokemon) {
      pokemon = await this.PokemonModel.findOne({ name: term.toLowerCase().trim() });
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with term ${term} not found`);
    }

    return pokemon;
  }

  async findAll(PaginationDto?:PaginationDto){
    if(!PaginationDto.limit)
      PaginationDto.limit=this.configService.get(`DEFAULT_LIMIT`)
      return this.PokemonModel.find().skip((PaginationDto.offset)).limit(PaginationDto.limit).sort({no:1}).select(`-__v`)
  }
}





