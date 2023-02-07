import { container } from "tsyringe";

import { IAuthorRepository } from "../IAuthorRepository";
import { IEmailRepository } from "../IEmailRepository";
import { AuthorRepositoryInMemory } from "./AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "./EmailRepositoryInMemory";

container.registerSingleton<IEmailRepository>(
  "EmailRepositoryInMemory",
  EmailRepositoryInMemory
);

container.registerSingleton<IAuthorRepository>(
  "AuthorRepositoryInMemory",
  AuthorRepositoryInMemory
);
