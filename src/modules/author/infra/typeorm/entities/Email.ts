import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("email")
export class Email {
    @PrimaryColumn()
    private id?: string;

    @Column()
    private email: string;

    @CreateDateColumn()
    private created_at: Date;

    @UpdateDateColumn()
    private updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}
