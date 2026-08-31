import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { IGenericDataServices } from '../../core/generics/generic-data.services';

@Injectable()
export class UsersService {
  constructor(
    private dataServices: IGenericDataServices,
    private httpService: HttpService,
  ) {}
  //, private httpService: HttpService, private mailerService: MailService
}
