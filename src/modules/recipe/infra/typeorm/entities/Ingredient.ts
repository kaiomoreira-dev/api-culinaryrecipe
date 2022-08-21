import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("ingredients")
export class Ingredient {
    @PrimaryColumn()
    id: string;

    @Column()
    description: string;

    @Column()
    name: string;

    @Column()
    weight: number;

    @Column()
    unity: number;

    @Column()
    animal?: string;

    @Column()
    color?: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}
