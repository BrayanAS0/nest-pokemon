import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SeedService } from './seed.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  findAll(@Query()paginationDto:PaginationDto){

    return this.seedService.findAll(paginationDto);
  }
  @Post()
  executeSeed() {
    return this.seedService.executeSeed();
  }
@Get(`:term`)
findOne(@Param(`term`) term:string){
  return this.seedService.findOne(term);
}

}
