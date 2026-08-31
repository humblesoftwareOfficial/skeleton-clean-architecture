import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { IGenericDataServices } from '../../core/generics/generic-data.services';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const dataServicesMock = {
    users: {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
    },
  };

  const httpServiceMock = {
    get: jest.fn(),
    post: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: IGenericDataServices, useValue: dataServicesMock },
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
