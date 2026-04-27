import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const WIDTH = 1080;
const HEIGHT = 1350;

const FALLBACK_IMAGE =
	"https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80";
const FALLBACK_TEXT = "Crafted with intention.";

const ACCENT = "#FF5A1F";

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

				{/* Flat darken layer to lift white text off any photo */}
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(0, 0, 0, 0.45)",
						display: "flex",
					}}
				/>

				{/* Dramatic vertical gradient — heavy at top & bottom, lighter in the middle */}
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundImage:
							"linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.85) 100%)",
						display: "flex",
					}}
				/>

				{/* Radial spotlight to focus on the headline */}
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundImage:
							"radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)",
						display: "flex",
					}}
				/>

				{/* Top-center brand mark */}
				<div
					style={{
						position: "absolute",
						top: 56,
						left: 0,
						right: 0,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							padding: "10px 22px",
							borderRadius: "999px",
							border: "1.5px solid rgba(255, 255, 255, 0.7)",
							fontSize: "30px",
							fontWeight: 800,
							letterSpacing: "0.02em",
							color: "#ffffff",
							textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
						}}
					>
						깨알톡
					</div>
				</div>

				{/* Centered editorial stack: badge + headline */}
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						padding: "0 80px",
					}}
				>
					{/* Vibrant pill badge */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							padding: "12px 24px",
							marginBottom: "32px",
							borderRadius: "999px",
							backgroundColor: ACCENT,
							fontSize: "22px",
							fontWeight: 800,
							letterSpacing: "0.18em",
							textTransform: "uppercase",
							color: "#ffffff",
							boxShadow: "0 6px 20px rgba(255, 90, 31, 0.45)",
						}}
					>
						주민 인증 · LOCAL PICK
					</div>

					{/* Massive magazine headline */}
					<div
						style={{
							display: "flex",
							fontSize: "80px",
							fontWeight: 900,
							lineHeight: 1.05,
							letterSpacing: "-0.03em",
							textAlign: "center",
							color: "#ffffff",
							textShadow:
								"0 2px 4px rgba(0,0,0,0.55), 0 8px 28px rgba(0,0,0,0.6)",
						}}
					>
						{text}
					</div>

					{/* Thin accent rule under headline */}
					<div
						style={{
							display: "flex",
							marginTop: "40px",
							width: "80px",
							height: "4px",
							backgroundColor: ACCENT,
							borderRadius: "2px",
						}}
					/>
				</div>
			</div>
		),
		{
			width: WIDTH,
			height: HEIGHT,
		},
	);
}
