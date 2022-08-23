import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("email")
export class Email {
    @PrimaryColumn()
    private id: string;

    @Column()
    private email: string;

    @CreateDateColumn()
    private created_at: Date;

    @UpdateDateColumn()
    private updated_at: Date;

    cons;
}
