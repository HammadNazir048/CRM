export const API_URL =
	process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export function isMarketing(): boolean {
	return process.env.IS_MARKETING === "true";
}

export function isDevAuthBypass(): boolean {
	return (
		process.env.NODE_ENV !== "production" &&
		process.env.DEV_AUTH_BYPASS === "true"
	);
}
