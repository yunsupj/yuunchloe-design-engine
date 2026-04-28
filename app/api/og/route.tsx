import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const WIDTH = 1080;
const HEIGHT = 1350;

const FALLBACK_IMAGE =
	"https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80";
const FALLBACK_TEXT = "Crafted with intention.";

const PICKLE_GREEN = "#1E3F20";
const ORANGE = "#FF6B00";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const image = searchParams.get("image")?.trim() || FALLBACK_IMAGE;
	const text = searchParams.get("text")?.trim() || FALLBACK_TEXT;
	const category = searchParams.get("category")?.trim() ?? "";

	return new ImageResponse(
		(
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
				{/* Full-bleed photo at 100% opacity — no dark overlays */}
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

				{/* Lower-third content stack — top 2/3 left empty for the photo */}
				<div
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						bottom: 0,
						height: "33.333%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-end",
						alignItems: "flex-start",
						padding: "0 56px 64px 56px",
					}}
				>
					{/* Brand mark — Pickle Green on a light pill for legibility */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							padding: "8px 20px",
							marginBottom: "20px",
							borderRadius: "999px",
							backgroundColor: "rgba(255, 255, 255, 0.95)",
							fontSize: "26px",
							fontWeight: 800,
							letterSpacing: "0.01em",
							color: PICKLE_GREEN,
						}}
					>
						깨알톡
					</div>

					{/* Orange category pill — only renders when category param is present */}
					{category ? (
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								padding: "8px 18px",
								marginBottom: "20px",
								borderRadius: "999px",
								backgroundColor: ORANGE,
								fontSize: "20px",
								fontWeight: 700,
								letterSpacing: "0.12em",
								textTransform: "uppercase",
								color: "#ffffff",
							}}
						>
							{category}
						</div>
					) : null}

					{/* Headline */}
					<div
						style={{
							display: "flex",
							fontSize: "64px",
							fontWeight: 900,
							lineHeight: 1.08,
							letterSpacing: "-0.025em",
							color: "#ffffff",
							textShadow:
								"0 2px 6px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.45)",
						}}
					>
						{text}
					</div>
				</div>
			</div>
		),
		{
			width: WIDTH,
			height: HEIGHT,
		},
	);
}
