import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const WIDTH = 1080;
const HEIGHT = 1350;

const FALLBACK_IMAGE =
	"https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80";
const FALLBACK_TEXT = "Crafted with intention.";
const FALLBACK_CATEGORY = "깨알톡 · LOCAL";

const ORANGE = "#FF6B00";

// Canvas vertical midpoint
const CENTER_Y = HEIGHT / 2;

export async function GET(request: NextRequest) {
	const { searchParams, origin } = new URL(request.url);
	const image = searchParams.get("image")?.trim() || FALLBACK_IMAGE;
	const text = searchParams.get("text")?.trim() || FALLBACK_TEXT;
	const category = searchParams.get("category")?.trim() || FALLBACK_CATEGORY;

	// is_cta_slide=true → stack moves UP from center (call-to-action frame)
	// is_cta_slide=false / missing → stack moves DOWN from center (general slide)
	const isCtaSlide = searchParams.get("is_cta_slide") === "true";
	const stackTop = isCtaSlide ? CENTER_Y - 250 : CENTER_Y + 200;

	const profileUrl = `${origin}/logo.png`;

	return new ImageResponse(
		<div
			style={{
				position: "relative",
				display: "flex",
				width: "100%",
				height: "100%",
				backgroundColor: "#0a0a0a",
				fontFamily: "Inter, sans-serif",
			}}
		>
			{/* Full-bleed photo — 100% opacity, no overlays */}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={image}
				alt=""
				width={WIDTH}
				height={HEIGHT}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					objectFit: "cover",
					objectPosition: "center",
				}}
			/>

			{/* Profile image — top-right, 56px from each edge, rounded square */}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={profileUrl}
				alt="깨알톡"
				width={70}
				height={70}
				style={{
					position: "absolute",
					top: 30,
					right: 30,
					width: 70,
					height: 70,
					borderRadius: "15px",
					objectFit: "cover",
					opacity: 0.8,
				}}
			/>

			{/* Content stack — vertically offset from center based on slide type */}
			<div
				style={{
					position: "absolute",
					top: stackTop,
					left: 0,
					right: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				{/* Orange category pill */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "10px 24px",
						marginBottom: "24px",
						borderRadius: "999px",
						backgroundColor: ORANGE,
						fontSize: "22px",
						fontWeight: 700,
						letterSpacing: "0.1em",
						textTransform: "uppercase",
						color: "#ffffff",
						boxShadow: "0 4px 16px rgba(255,107,0,0.4)",
					}}
				>
					{category}
				</div>

				{/* Headline — multi-line, center-aligned, constrained width */}
				<div
					style={{
						display: "flex",
						maxWidth: "960px",
						fontSize: "64px",
						fontWeight: 900,
						lineHeight: 1.2,
						letterSpacing: "-0.025em",
						textAlign: "center",
						color: "#ffffff",
						textShadow: "0 2px 6px rgba(0,0,0,0.6), 0 8px 28px rgba(0,0,0,0.5)",
						whiteSpace: "pre-wrap",
						wordBreak: "keep-all",
						WebkitTextStroke: "2px #ffffff",
					}}
				>
					{text}
				</div>
			</div>
		</div>,
		{
			width: WIDTH,
			height: HEIGHT,
		},
	);
}
