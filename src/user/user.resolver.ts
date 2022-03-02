import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from './services/user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query()
  async getUser() {
    return this.userService.getAll();
  }
}
