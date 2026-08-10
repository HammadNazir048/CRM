import "@crm/env/load";
import { primaryWorkspaceDomain, workspaceAddresses } from "./workspace";

export const DEV_SIGN_IN_PATH = "/api/dev/sign-in";

export const DEV_SIGN_IN_NAME = "Dev";

export const DEV_SIGN_IN_PASSWORD = "dev-auth-bypass";

export function isDevAuthBypass(): boolean {
	if (process.env.NODE_ENV === "production") return false;

	return process.env.DEV_AUTH_BYPASS === "true";
}

export function devSignInEmail(): string | undefined {
	const domain = primaryWorkspaceDomain();

	return domain ? `dev@${domain}` : workspaceAddresses()[0];
}
