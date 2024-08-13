import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';
import { IsInt, IsString, Min, MinLength } from 'class-validator';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {

    @IsString()
    @MinLength(1)
    name?: string;
    @IsInt()
    @Min(1)
    no?: number;
}
