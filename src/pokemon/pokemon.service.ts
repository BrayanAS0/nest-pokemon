import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';

@Injectable()
export class PokemonService {
  constructor(@InjectModel(Pokemon.name) private readonly PokemonModel: Model<Pokemon>) { }
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()
    try {
      const Pokemon = await this.PokemonModel.create(createPokemonDto)
      return Pokemon
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon already exists${JSON.stringify(error.keyValue)}`)
      }
      console.log(error)
      throw new InternalServerErrorException('Error creating Pokemon - Ckeck server log')
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon = null;

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

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id)
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase()

    try {
      await pokemon.updateOne(updatePokemonDto)
      return { ...pokemon.toJSON(), ...updatePokemonDto }
    } catch (error) {

      if (error.code === 11000) {
        let response = ``

        const verifyName = updatePokemonDto.name === pokemon.name
        const verifyNo = updatePokemonDto.no === pokemon.no
        if (!verifyName && (updatePokemonDto.name !== undefined)) {
          response += `The name ${pokemon.name} already exists\n`
        }
        if (!verifyNo && (updatePokemonDto.no !== undefined))
          response += `The No ${pokemon.no} already exists\n`
        return response
      }
    }
  }

 async remove(id: string) {
const result = await this.PokemonModel.deleteOne({_id:id})
if(result.deletedCount===0)
  throw new BadRequestException(`Pokeon with id ${id} not found`)
return result
}
}
