import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersMapper } from './users.mapper';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [
        UsersController
    ],
    providers: [
        UsersMapper, 
        UsersRepository,
        UsersService
    ]
})
export class UsersModule {}
