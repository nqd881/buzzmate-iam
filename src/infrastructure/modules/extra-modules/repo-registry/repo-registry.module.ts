import {Module} from "@nestjs/common";
import {UserRepoModule} from "./user/user-repo.module";

@Module({
  imports: [UserRepoModule],
  providers: [],
  exports: [UserRepoModule],
})
export class RepoRegistryModule {}
