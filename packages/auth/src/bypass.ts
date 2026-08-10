import "@crm/env/load";
import { primaryWorkspaceDomain, workspaceAddresses } from "./workspace";

export const BYPASS_SIGN_IN_PATH = "/api/bypass/sign-in";

export const BYPASS_SIGN_IN_NAME = "Shared";

export const BYPASS_SIGN_IN_PASSWORD = "dev-auth-bypass";

export function isAuthBypass(): boolean {
	return process.env.AUTH_BYPASS === "true";
}

export function bypassSignInEmail(): string | undefined {
	const domain = primaryWorkspaceDomain();

	return domain ? `dev@${domain}` : workspaceAddresses()[0];
}
