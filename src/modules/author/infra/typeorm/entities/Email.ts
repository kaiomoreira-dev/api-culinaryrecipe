import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Author } from "./Author";

@Entity("emails")
export class Email {
    @PrimaryColumn()
    id?: string;

    @Column()
    e_mail: string;

    @ManyToOne(() => Author, (author) => author.emails)
    author: Author;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}
