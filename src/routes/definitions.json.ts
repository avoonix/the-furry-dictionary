import { getPages } from '$lib/definitions';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url: { searchParams } }) => {
	const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') || '') : undefined;
	const page = searchParams.get('page') ? parseInt(searchParams.get('page') || '') : undefined;

	return {
		body: JSON.stringify(getPages({ limit, page }))
	};
};
