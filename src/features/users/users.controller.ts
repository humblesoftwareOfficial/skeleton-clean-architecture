import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

// Protégé par défaut : JwtAuthGuard est enregistré en APP_GUARD dans AppModule.
// Utiliser @Public() (core/decorators/public.decorator.ts) pour exposer une route.
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}
}
