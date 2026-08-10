import {
	auth,
	BYPASS_SIGN_IN_NAME,
	BYPASS_SIGN_IN_PASSWORD,
	bypassSignInEmail,
	isAuthBypass,
} from "@crm/auth";
import {
	Controller,
	Get,
	Logger,
	NotFoundException,
	Query,
	Res,
	ServiceUnavailableException,
} from "@nestjs/common";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import type { Response as ExpressResponse } from "express";

@Controller("api/bypass")
export class DevSignInController {
	private readonly logger = new Logger(DevSignInController.name);

	@Get("sign-in")
	@AllowAnonymous()
	async signIn(
		@Query("next") next: string | undefined,
		@Res() res: ExpressResponse,
	): Promise<void> {
		if (!isAuthBypass()) throw new NotFoundException();

		const email = bypassSignInEmail();

		if (!email) {
			throw new ServiceUnavailableException(
				'AUTH_BYPASS has nobody to sign in as. Set ALLOWED_SIGN_IN in .env, for example ALLOWED_SIGN_IN="acme.com".',
			);
		}

		const body = { email, password: BYPASS_SIGN_IN_PASSWORD };

		const existing = await auth.api
			.signInEmail({ body, asResponse: true })
			.catch(() => null);

		const minted = existing?.ok
			? existing
			: await this.enrol({ ...body, name: BYPASS_SIGN_IN_NAME });

		for (const cookie of minted.headers.getSetCookie()) {
			res.append("Set-Cookie", cookie);
		}

		this.logger.warn({ message: "Signed in through AUTH_BYPASS" });

		res.redirect(302, path(next));
	}

	private async enrol(body: {
		email: string;
		password: string;
		name: string;
	}): Promise<Response> {
		const created = await auth.api
			.signUpEmail({ body, asResponse: true })
			.catch((error: unknown) => {
				this.logger.error(
					{ message: "AUTH_BYPASS could not create the shared account" },
					error instanceof Error ? error.stack : String(error),
				);
				return null;
			});

		if (!created?.ok) {
			throw new ServiceUnavailableException(
				`AUTH_BYPASS could not sign in as ${body.email}. Either that address is not on ALLOWED_SIGN_IN, or a user already exists under it with a different password.`,
			);
		}

		return created;
	}
}

function path(next: string | undefined): string {
	return next?.startsWith("/") && !next.startsWith("//") ? next : "/";
}
