import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository, DeleteResult } from "typeorm";
import { UsersMapper } from "./users.mapper";
import { UserDTO } from "./user.dto";

@Injectable()
export class UsersRepository {

    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>, 
        private userMapper: UsersMapper
    ) {}

    getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    getUserById(id: string): Promise<UserEntity> {
        return this.userRepository.findOne(id);
    }

    newUser(userDTO: UserDTO): Promise<UserEntity> {
        const newUser = this.userMapper.dtoToEntity(userDTO);
        return this.userRepository.save(newUser);
    }

    async updateUser(id: string, userDTO: UserDTO): Promise<UserEntity> {

        const updateUserDTO = new UserDTO(id, userDTO.name);
        const updateUser = this.userMapper.dtoToEntity(updateUserDTO);
        await this.userRepository.update(id, updateUser);
        return this.userRepository.findOne(id);
    }

    deleteUser(id: string): Promise<DeleteResult> {
        return this.userRepository.delete(id);
    }
}