import DefaultLayout from "@/components/templates/defaultLayout/DefaultLayout";
import { Metadata } from "next";
import DefaultIcon from "@/shared/ui/icons/defaultIcon";
import { buildSEO } from "@/lib/seo/seo.utils";
import { aboutSEO } from "@/shared/data/seo/aboutSEO";
import { aboutPageContent } from "@/shared/data/consts/aboutPage/aboutPageContent";

import Link from "next/link";

export const metadata: Metadata = {
	...buildSEO(aboutSEO),
};

const ANIM =
	"animate-in fade-in-0 slide-in-from-bottom-6 duration-700 fill-mode-both";

const About = () => {
	const { badge, title, paragraphs, stats, skills, image } = aboutPageContent;

	return (
		<DefaultLayout>
			<main className="max-w-6xl mx-auto px-4 py-20 md:py-28">
				{/* Split layout */}
				<div className="flex flex-col-reverse gap-16 md:flex-row md:items-center md:gap-20">
					{/* Text side */}
					<div className="flex-1 space-y-8">
						<div className="space-y-4">
							<div
								className={ANIM}
								style={{ animationDelay: "0ms" }}
							>
								<span className="inline-flex items-center gap-2 rounded-full border border-(--color-accent)/30 bg-(--color-accent)/10 text-(--color-accent) text-sm font-semibold px-4 py-1.5">
									<span
										className="w-1.5 h-1.5 rounded-full bg-(--color-accent)"
										aria-hidden
									/>
									{badge}
								</span>
							</div>
							<div
								className={ANIM}
								style={{ animationDelay: "150ms" }}
							>
								<h1 className="text-4xl font-extrabold md:text-5xl bg-gradient-to-r from-(--gradient-hero-from) to-(--gradient-hero-to) bg-clip-text text-transparent">
									{title}
								</h1>
							</div>
							<div
								className={ANIM}
								style={{ animationDelay: "250ms" }}
							>
								<p className="text-lg font-medium text-(--color-text-secondary)">
									Full-Stack Developer &amp; Software Engineer
								</p>
							</div>
						</div>

						{/* Stats */}
						<div
							className={`${ANIM} flex flex-wrap gap-6`}
							style={{ animationDelay: "350ms" }}
						>
							{stats.map((stat) => (
								<div
									key={stat.label}
									className="text-center px-4 py-3 rounded-xl bg-(--color-bg-section) border border-(--color-border)"
								>
									<p className="text-2xl font-bold text-(--color-accent)">
										{stat.value}
									</p>
									<p className="text-xs text-(--color-text-secondary) mt-0.5">
										{stat.label}
									</p>
								</div>
							))}
						</div>

						{/* Paragraphs */}
						<div
							className={`${ANIM} space-y-4`}
							style={{ animationDelay: "450ms" }}
						>
							{paragraphs.map((p, i) => (
								<p
									key={i}
									className="text-(--color-text-secondary) leading-relaxed"
								>
									{p}
								</p>
							))}
						</div>

						{/* Skills */}
						<div
							className={`${ANIM} space-y-3`}
							style={{ animationDelay: "550ms" }}
						>
							<p className="text-sm font-semibold text-(--color-text) uppercase tracking-widest">
								Tech Stack
							</p>
							<div className="flex flex-wrap gap-2">
								{skills.map((skill) => (
									<span
										key={skill.name}
										className="text-sm px-3 py-1 rounded-full bg-(--color-bg-section) border border-(--color-border) text-(--color-text-secondary) font-medium"
									>
										{skill.name}
									</span>
								))}
							</div>
						</div>

						{/* CTA */}
						<div
							className={ANIM}
							style={{ animationDelay: "650ms" }}
						>
							<Link
								href="/contact"
								className="inline-flex items-center justify-center px-7 py-3 rounded-xl font-semibold text-sm bg-(--color-accent) text-white hover:bg-(--color-accent-hover) transition-all shadow-lg shadow-(--color-accent)/25 hover:shadow-xl hover:shadow-(--color-accent)/35"
							>
								Let&apos;s Work Together
							</Link>
						</div>
					</div>

					{/* Image side */}
					<div
						className="animate-in fade-in-0 zoom-in-90 duration-700 fill-mode-both flex justify-center md:justify-end shrink-0"
						style={{ animationDelay: "200ms" }}
					>
						<div className="relative">
							{/* Glow blob */}
							<div className="absolute inset-0 rounded-full bg-(--color-accent) opacity-20 blur-3xl scale-110 pointer-events-none" />
							<div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-(--color-accent) shadow-2xl shadow-(--color-accent)/30 hover:scale-105 transition-transform duration-500">
								<DefaultIcon
									src={image.src}
									alt={image.alt}
									width={400}
									height={400}
									priority
									fetchPriority="high"
									className="w-full h-full object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
		</DefaultLayout>
	);
};

export default About;
