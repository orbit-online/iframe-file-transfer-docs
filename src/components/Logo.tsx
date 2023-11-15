import { useRef } from 'react';
import logoPath from '../images/logos/orbit.svg';
import Image from 'next/image';

type Props = typeof Image extends React.ForwardRefExoticComponent<infer P>
	? P
	: never;

export function Logo(props: Omit<Props, 'alt' | 'src'>) {
	return (
		<div className="inline-flex items-center gap-1">
			<Image {...props} alt="Orbit logo" src={logoPath} unoptimized />
			<div className="flex-1 text-3xl font-thin">ORBIT</div>
		</div>
	);
}

const settings = {
	color: 'rgba(44, 165, 222, 1)',
	hexagon: {
		// Values are derived from the hexagon path:
		// d="M 0 0 L -1495 0 C -1497 -79, -1465 -185, -1436 -243 L -1173 -682 L -831 -480 Z"
		//            radius                                         innerRadius = sqrt(1173^2+682^2)
		radius: 1495,
		innerRadius: 1356,
	},
	ring: {
		radius: 1340,
		thickness: 172,
		// ringWidth should be "ringRadius - planetOutlineStrokeWidth / 2 - planetRadius" (322.5)
		// if it were to be realistic, but that just looks weirder
		width: 800,
		midsectionOffset: 318,
	},
	planet: {
		radius: 960,
		outlineWidth: 115,
	},
};
export function Logo2(props: React.ComponentPropsWithoutRef<'svg'>) {
	const hexagon = useRef<SVGGElement>(null);
	const ringTop = useRef<SVGUseElement>(null);
	const ringHole = useRef<SVGUseElement>(null);
	const ringSide = useRef<SVGRectElement>(null);
	const ringSideCurve = useRef<SVGUseElement>(null);

	return (
		<div className="inline-flex items-center">
			<svg
				{...props}
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				version="1.1"
				viewBox={`${-settings.hexagon.radius} ${-settings.hexagon
					.radius} ${settings.hexagon.radius * 2} ${
					settings.hexagon.radius * 2
				}`}
			>
				<defs>
					{/* Ring boundary, outside of which the ring should not show */}
					<circle
						id="ring-boundary"
						r={settings.hexagon.innerRadius}
					/>
					{/* The hole in the hexagon / the planet */}
					<circle id="hexagon-hole" r={settings.planet.radius} />
					{/* The disc around the planet, reused multiple times to create the full ring */}
					<circle id="disc" r={settings.ring.radius} />
					<g id="hexagon-sixth" ref={hexagon}>
						{/* build 1/12 of the hexagon, and then duplicate, mirror, and turn it to build 1/6 */}
						<path
							id="hexagon-twelfth"
							d="M 0 0 L -1495 0 C -1497 -79, -1465 -185, -1436 -243 L -1173 -682 L -831 -480 Z"
						/>
						<use
							xlinkHref="#hexagon-twelfth"
							transform="scale(1 -1) rotate(-60)"
						/>
					</g>
					{/* The transparent part of the ring on top */}
					<use id="ring-top" xlinkHref="#disc" ref={ringTop} />
				</defs>
				<mask id="hexagon-mask">
					<circle r={settings.hexagon.radius} fill="white" />
					{/* The hexagon is fully solid, mask the top of the ring and the planet */}
					<use xlinkHref="#ring-top" fill="black" />
					<use xlinkHref="#hexagon-hole" fill="black" />
				</mask>
				<mask id="planet-outline-mask">
					<use xlinkHref="#ring-boundary" fill="white" />
					{/* Mask the planet outline where the top of the ring is located */}
					<use xlinkHref="#ring-top" fill="black" />
					{/* The ring hole is the inner part where the ring does not occupy any space,
					show the part of the planet outline that intersects with that space */}
					<use xlinkHref="#disc" fill="white" ref={ringHole} />
				</mask>
				<mask id="ring-mask">
					<use xlinkHref="#ring-boundary" fill="white" />
					{/* The top of the ring should be transparent */}
					<use xlinkHref="#ring-top" fill="black" />
				</mask>
				<g fill={settings.color}>
					{/* Construct the full hexagon, add a stroke to the figure
					to avoid rendering issues with the spaces between the figures */}
					<g
						mask="url(#hexagon-mask)"
						stroke={settings.color}
						strokeWidth="5"
					>
						<use xlinkHref="#hexagon-sixth" transform="rotate(0)" />
						<use
							xlinkHref="#hexagon-sixth"
							transform="rotate(60)"
						/>
						<use
							xlinkHref="#hexagon-sixth"
							transform="rotate(120)"
						/>
						<use
							xlinkHref="#hexagon-sixth"
							transform="rotate(180)"
						/>
						<use
							xlinkHref="#hexagon-sixth"
							transform="rotate(240)"
						/>
						<use
							xlinkHref="#hexagon-sixth"
							transform="rotate(300)"
						/>
					</g>
					{/* The planet */}
					<use
						xlinkHref="#hexagon-hole"
						mask="url(#planet-outline-mask)"
						strokeWidth={settings.planet.outlineWidth}
						stroke={settings.color}
						fill="transparent"
					/>
					{/* The ring */}
					<g mask="url(#ring-mask)">
						{/* When the ring approaches 90° rotation, the circles that
						simulate the ring will stop showing.
						Use a rectangle to show the side of the ring. */}
						<rect
							width={settings.ring.radius * 2}
							height={settings.ring.thickness}
							ref={ringSide}
						/>
						{/* The curvature of the ring */}
						<use xlinkHref="#disc" ref={ringSideCurve} />
					</g>
				</g>
			</svg>
			<div className="flex-1 text-2xl font-thin">ORBIT</div>
		</div>
	);
}
