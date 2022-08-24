import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
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

    @ManyToOne(() => Author)
    @JoinColumn({ name: "author_id" })
    author?: Author;
    author_id?: string;

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
