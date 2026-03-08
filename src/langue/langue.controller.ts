import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, BadRequestException, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { LangueService } from './langue.service';
import { Prisma } from '@prisma/client';
@Controller('langue')
export class LangueController {
  constructor(private readonly langueService: LangueService) { }

 

  @Post()
  @HttpCode(201)
  create(@Body() createLangue: Prisma.LangueCreateInput) {
    const langue = this.langueService.create(createLangue);
    if (!langue) {
      throw new BadRequestException('echec d\'ajout de langue')
    }
    return langue;

  }

  @Get()
  findAll() {
    const langues = this.langueService.findAll();
    if (!langues) {
      throw new NotFoundException('aucune langue trouvé')
    }
    return langues;
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const langue = this.langueService.findOne(+id);
    if (!langue) {
      throw new NotFoundException('aucune langue trouvé')
    }
    return langue

  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateLangue: Prisma.LangueUpdateInput) {
    const langue = this.langueService.update(+id, updateLangue);
    if (!langue) {
      throw new BadRequestException('EChec de la maj de la langue')

    }
    return langue
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id', ParseIntPipe) id: number) {
    const langue = this.langueService.remove(+id);
    if (!langue) {
      throw new BadRequestException('EChec de la maj de la langue')

    }
    return langue
  }
}
