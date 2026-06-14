import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param 
} from '@nestjs/common';
import { DonneursService } from './donneurs.service';

@Controller('donneurs')
export class DonneursController {
  constructor(private readonly svc: DonneursService) {}

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  // ⚠️ IMPORTANT : compatibles AVANT :id sinon NestJS confond les deux
  @Get('compatibles/:groupe')
  findCompatibles(@Param('groupe') groupe: string) {
    return this.svc.findCompatibles(groupe);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.svc.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.svc.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}