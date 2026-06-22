import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ResultatsService } from './resultats.service';

@Controller('resultats')
export class ResultatsController {
  constructor(private readonly svc: ResultatsService) {}

  @Post()
  enregistrer(@Body() body: any) {
    return this.svc.enregistrer(body);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }
}