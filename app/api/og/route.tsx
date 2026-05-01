import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const WIDTH = 1080;
const HEIGHT = 1350;

const FALLBACK_IMAGE =
	"https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80";
const FALLBACK_CATEGORY = "깨알톡 · LOCAL";

const ORANGE = "#FF6B00";
const CENTER_Y = HEIGHT / 2;

export async function GET(request: NextRequest) {
	const { searchParams, origin } = new URL(request.url);
	const image = searchParams.get("image")?.trim() || FALLBACK_IMAGE;
	const category = searchParams.get("category")?.trim() || FALLBACK_CATEGORY;
	const isCtaSlide = searchParams.get("is_cta_slide") === "true";

	// Support both legacy "text" (possibly containing \n) and explicit title/description params
	const rawText = searchParams.get("text")?.trim() || "";
	const textParts = rawText.split("\n");

	let title =
		searchParams.get("title")?.trim() ||
		textParts[0] ||
		"Crafted with intention.";
	let description =
		searchParams.get("description")?.trim() ||
		textParts.slice(1).join(" ").trim();

	// CTA slide: override title to brand CTA, suppress description
	if (isCtaSlide) {
		title = "우리 동네 진짜 정보,\n깨알톡 에서";
		description = "";
	}

	const stackTop = isCtaSlide ? CENTER_Y - 150 : CENTER_Y + 150;
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
			{/* Full-bleed background photo */}
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

			{/* Logo — top-right */}
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

			{/* Content stack */}
			<div
				style={{
					position: "absolute",
					top: stackTop,
					left: 0,
					right: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					padding: "0 40px",
				}}
			>
				{/* Category pill */}
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
						color: "#ffffff",
						boxShadow: "0 4px 16px rgba(255,107,0,0.4)",
					}}
				>
					{category}
				</div>

				{/* Title */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						maxWidth: "960px",
						fontSize: "68px",
						fontWeight: 900,
						lineHeight: 1.25,
						letterSpacing: "-0.02em",
						textAlign: "center",
						color: "#ffffff",
						whiteSpace: "pre-wrap",
						textShadow: "0 2px 6px rgba(0,0,0,0.6), 0 8px 28px rgba(0,0,0,0.5)",
						wordBreak: "keep-all",
						WebkitTextStroke: "3px rgba(255,255,255,0.3)",
					}}
				>
					{title.split(/\\n|\n/).map((line, index) => (
						<div key={index}>{line}</div>
					))}
				</div>

				{/* Description — hidden on CTA slide */}
				{description && !isCtaSlide && (
					<div
						style={{
							display: "flex",
							maxWidth: "800px",
							fontSize: "45px",
							fontWeight: 900,
							lineHeight: 1.4,
							marginTop: "20px",
							textAlign: "center",
							color: "rgba(255, 255, 255, 0.9)",
							textShadow: "0 2px 8px rgba(0,0,0,0.8)",
							whiteSpace: "pre-wrap",
							wordBreak: "keep-all",
							WebkitTextStroke: "2px rgba(255,255,255,0.3)",
						}}
					>
						{description}
					</div>
				)}
			</div>
		</div>,
		{
			width: WIDTH,
			height: HEIGHT,
		},
	);
}
