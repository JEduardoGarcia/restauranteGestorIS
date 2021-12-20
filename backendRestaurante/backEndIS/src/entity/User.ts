import {Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, Column} from "typeorm";
import { MinLength, IsNotEmpty, IsEmail} from "class-validator";
import * as bcrypt from 'bcrypt';
//Todo IsEmail

@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(6)
    @IsEmail()
    @IsNotEmpty()
    username: string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    createAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    hashPassworrd():void{
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password: string): boolean{
        return bcrypt.compareSync(password, this.password);
    }
}
