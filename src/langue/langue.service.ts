import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LangueService {
  constructor(private readonly databaseService: DatabaseService) {

  }
  create(createLangue: Prisma.LangueCreateInput) {
    return this.databaseService.langue.create({
      data: createLangue
    })
  }

  findAll() {
    return this.databaseService.langue.findMany();
  }

  findOne(id: number) {
    return this.databaseService.langue.findUnique({
      where: { id }
    });
  }

  update(id: number, updateLangueDto: Prisma.LangueUpdateInput) {
    return this.databaseService.langue.update({
      where: { id },
      data: updateLangueDto
    });
  }

  remove(id: number) {
    return this.databaseService.langue.delete({
      where: { id }
    });
  }
}