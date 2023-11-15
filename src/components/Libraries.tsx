import Image from 'next/image';

import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import logoJavascript from '@/images/logos/javascript.svg';
import logoReact from '@/images/logos/react.svg';

const libraries = [
	{
		href: '#',
		name: 'Vanilla JS',
		description:
			'A popular general-purpose scripting language that is especially suited to web development.',
		logo: logoJavascript,
		links: [
			{ href: '/api/vanilla/receiver', title: 'Receiver' },
			{ href: '/api/vanilla/sender', title: 'Sender' },
		],
	},
	{
		href: '#',
		name: 'React',
		description:
			'A dynamic, open source programming language with a focus on simplicity and productivity.',
		logo: logoReact,
		links: [
			{ href: '/api/react/receiver', title: 'Receiver' },
			{ href: '/api/react/sender', title: 'Sender' },
		],
	},
];

export function Libraries() {
	return (
		<div className="my-16 xl:max-w-none">
			<Heading level={2} id="official-libraries">
				Official libraries
			</Heading>
			<div className="not-prose mt-4 grid grid-cols-1 gap-x-6 gap-y-10 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:max-w-none xl:grid-cols-3">
				{libraries.map((library) => (
					<div
						key={library.name}
						className="flex flex-row-reverse gap-6"
					>
						<div className="flex-auto">
							<h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
								{library.name}
							</h3>
							<p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
								{library.description}
							</p>
							<ul>
								{library.links.map((link) => (
									<li key={link.href}>
										<Button
											variant="text"
											arrow="right"
											href={link.href}
										>
											{link.title}
										</Button>
									</li>
								))}
							</ul>
						</div>
						<Image
							src={library.logo}
							alt=""
							className="h-12 w-12"
							unoptimized
						/>
					</div>
				))}
			</div>
		</div>
	);
}
