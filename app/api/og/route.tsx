import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const WIDTH = 1080;
const HEIGHT = 1350;

const FALLBACK_IMAGE =
	"https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80";
const FALLBACK_TEXT = "Crafted with intention.";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const image = searchParams.get("image")?.trim() || FALLBACK_IMAGE;
	const text = searchParams.get("text")?.trim() || FALLBACK_TEXT;

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

				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(0, 0, 0, 0.3)",
						display: "flex",
					}}
				/>

				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundImage:
							"linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0) 75%)",
						display: "flex",
					}}
				/>

				<div
					style={{
						position: "absolute",
						top: 40,
						right: 56,
						display: "flex",
						fontSize: "20px",
						fontWeight: 600,
						letterSpacing: "0.2em",
						textTransform: "uppercase",
						color: "rgba(255, 255, 255, 0.6)",
						textShadow: "0 1px 6px rgba(0, 0, 0, 0.4)",
					}}
				>
					KKAERTALK
				</div>

				<div
					style={{
						position: "absolute",
						left: 56,
						right: 56,
						bottom: 64,
						display: "flex",
						padding: "48px",
						borderRadius: "16px",
						backgroundColor: "rgba(255, 255, 255, 0.1)",
						backdropFilter: "blur(20px)",
						border: "1px solid rgba(255, 255, 255, 0.15)",
						boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
					}}
				>
					<div
						style={{
							display: "flex",
							fontSize: "64px",
							fontWeight: 800,
							lineHeight: 1.1,
							letterSpacing: "-0.02em",
							color: "#ffffff",
							textShadow: "0 2px 10px rgba(0, 0, 0, 0.35)",
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
