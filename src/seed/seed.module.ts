import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule,MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }])],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
