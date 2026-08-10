export const API_URL =
	process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export function isMarketing(): boolean {
	return process.env.IS_MARKETING === "true";
}

export function isAuthBypass(): boolean {
	return process.env.AUTH_BYPASS === "true";
}
