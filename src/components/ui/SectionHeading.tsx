interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] ${
          dark ? "text-white" : "text-carbon-dark"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          } ${dark ? "text-white/50" : "text-text-muted"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
