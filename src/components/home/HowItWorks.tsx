import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries/type";

interface HowItWorksProps {
  dict: Dictionary;
}

export default function HowItWorks({ dict }: HowItWorksProps) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          title={dict.howItWorks.heading}
          subtitle={dict.howItWorks.subHeading}
        />

        <div className="mt-14 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-border-light" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {dict.howItWorks.steps.map((step, i) => (
              <div key={i} className="relative">
                {/* Step number */}
                <div className="relative z-10 w-16 h-16 bg-carbon-dark text-white flex items-center justify-center font-black text-lg mb-5">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-base font-bold text-carbon-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
