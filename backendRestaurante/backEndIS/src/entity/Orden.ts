import {Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, Column} from "typeorm";
import { IsNotEmpty} from "class-validator";

@Entity()
@Unique(['id'])
export class Orden {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('json', {nullable: true})
    @IsNotEmpty()
    platillos: object[];

    @Column("float")
    total: number;

    @Column()
    @CreateDateColumn()
    createAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

}
