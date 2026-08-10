import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthHooksService } from "./auth-hooks.service";
import { DevSignInController } from "./dev-sign-in.controller";

@Module({
	controllers: [AuthController, DevSignInController],
	providers: [AuthService, AuthHooksService],
	exports: [AuthService],
})
export class AuthModule {}
