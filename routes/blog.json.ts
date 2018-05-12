import { Request, Response } from 'polka';
import posts from './blog/_posts';

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug
	};
}));

export function get(req: Request, res: Response) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}