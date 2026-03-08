import { Module } from '@nestjs/common';
import { LangueService } from './langue.service';
import { LangueController } from './langue.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
 
  controllers: [LangueController],
  providers: [LangueService,DatabaseService],
})
export class LangueModule {}
