import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    example: 'имя_пользователя',
    description: 'Логин пользователя',
  })
  username: string;

  @ApiProperty({ example: 'пароль123', description: 'Пароль пользователя' })
  password: string;
}
