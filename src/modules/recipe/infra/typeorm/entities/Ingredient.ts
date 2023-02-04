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

import { Produto } from "./Produto";

@Entity("ingredients")
export class Ingredient {
  @PrimaryColumn()
  id?: string;

  // relacionamento de many-to-one apontando para produto qual
  // ingrediente deve pertencer a produto, mas não queremos
  // relacionar um produto com uma lista de ingredients que eles
  // podem pertecer
  @ManyToOne(() => Produto, (produto) => produto.ingredients)
  @JoinColumn({ name: "produto_id" })
  produto?: Produto;

  @Column()
  produto_id: string;

  @Column()
  weight: number;

  @Column()
  unity: number;

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
