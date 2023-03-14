import { CreateAccountDto } from '../dtos/account.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AccountService } from '../services/account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':rut')
  getAccounts(@Param('rut') rut: string) {
    return this.accountService.getAccounts(rut);
  }

  @Post()
  create(@Body() payload: CreateAccountDto) {
    return this.accountService.create(payload);
  }

  @Delete(':rut/:id')
  delete(@Param('rut') rut: string, @Param('id', ParseIntPipe) id: number) {
    return this.accountService.delete(rut, id);
  }
}
