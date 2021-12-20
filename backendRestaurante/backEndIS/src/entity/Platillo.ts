import {Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, Column} from "typeorm";
import { MinLength, IsNotEmpty} from "class-validator";

@Entity()
@Unique(['nombre'])
export class Platillo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    nombre: string;

    @Column("float")
    precio: number;

    @Column()
    @CreateDateColumn()
    createAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

}
