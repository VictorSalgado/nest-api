import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UsersMapper } from "./users.mapper";
import { UserEntity } from "./user.entity";
import { UserDTO } from "./user.dto";

@Injectable()
export class UsersService {

    constructor(
        private usersRepository: UsersRepository,
        private usersMapper: UsersMapper
    ) {}

    async getAllUsers(): Promise<UserDTO[]> {
        const users: UserEntity[] = await this.usersRepository.getAllUsers();
        return users.map(user => this.usersMapper.entityToDto(user));
    }

    async getUserById(id: string): Promise<UserDTO> {
        const user: UserEntity = await this.usersRepository.getUserById(id);
        return this.usersMapper.entityToDto(user);
    }

    async newUser(userDTO: UserDTO) {
        const newUser: UserEntity = await this.usersRepository.newUser(userDTO);
        return this.usersMapper.entityToDto(newUser);
    }

    async updateUser(id: string, userDTO: UserDTO): Promise<UserDTO> {
        const updateUser: UserEntity = await this.usersRepository.updateUser(id, userDTO);
        return this.usersMapper.entityToDto(updateUser);
    }

    async deleteUser(id: string): Promise<void> {
        await this.usersRepository.deleteUser(id);
    }
}