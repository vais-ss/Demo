import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно создан',
    schema: {
      example: {
        id: 1,
        username: 'testuser',
        message: 'Пользователь создан',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Неверные входные данные' })
  @ApiBody({
    type: CreateAuthDto,
    examples: {
      example1: {
        value: {
          username: 'testuser',
          password: 'Test123!',
        },
      },
    },
  })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Список пользователей',
    schema: {
      example: [
        {
          id: 1,
          username: 'user1',
        },
        {
          id: 2,
          username: 'user2',
        },
      ],
    },
  })
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiParam({ name: 'id', description: 'ID пользователя', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Найденный пользователь',
    schema: {
      example: {
        id: 1,
        username: 'testuser',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить пользователя' })
  @ApiParam({ name: 'id', description: 'ID пользователя', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Обновленные данные пользователя',
    schema: {
      example: {
        id: 1,
        username: 'updatedUser',
        message: 'Данные обновлены',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @ApiBody({
    type: UpdateAuthDto,
    examples: {
      example1: {
        value: {
          username: 'updatedUser',
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiParam({ name: 'id', description: 'ID пользователя', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Результат удаления',
    schema: {
      example: {
        message: 'Пользователь удален',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
