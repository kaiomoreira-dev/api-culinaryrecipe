import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Ingredient } from "./Ingredient";

@Entity("produtos")
export class Produto {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  // one-to-many nos permite receber uma lista de ingredients
  // que pertencem a produto
  @OneToMany(() => Ingredient, (ingredient) => ingredient.produto)
  ingredients?: Ingredient[];

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
