import type { Metadata } from "next";
import { config } from "@/data/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${config.author}'s portfolio website (${config.site}).`,
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="mb-3 text-xl font-bold text-foreground">{title}</h2>
    <div className="space-y-3">{children}</div>
  </section>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="leading-relaxed text-muted-foreground">{children}</p>
);

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-14">
        Privacy Policy
      </h1>

      <Section title="Data We Collect">
        <P>
          {config.author} operates the portfolio website at{" "}
          <a href={config.site} className="underline underline-offset-2">
            {config.site}
          </a>{" "}
          (the &quot;Website&quot;). This policy explains what information is
          collected when you use the Website and how it is used.
        </P>
        <P>
          The Website may use cookies and third-party advertising services
          (including Google AdSense) to display ads and analyze site usage. When
          enabled, Google and its partners may collect information about your
          visits to this and other websites to provide personalized ads. You can
          opt out of personalized advertising at the{" "}
          <a
            href="https://www.google.com/settings/ads"
            className="underline underline-offset-2"
          >
            Google Ads Settings
          </a>
          , or learn more at the{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            className="underline underline-offset-2"
          >
            Google AdSense partner policy
          </a>
          .
        </P>
      </Section>

      <Section title="Cookies & Analytics">
        <P>
          The Website may use cookies — small text files stored on your device —
          to remember your preferences (such as theme and consent choices) and,
          where enabled, to support advertising and analytics. You may disable
          cookies in your browser settings, though some features may not work as
          intended.
        </P>
      </Section>

      <Section title="Contact">
        <P>
          Questions about this policy can be sent to{" "}
          <a
            href={`mailto:${config.email}`}
            className="underline underline-offset-2"
          >
            {config.email}
          </a>
          .
        </P>
        <P>Last updated: August 2026.</P>
      </Section>
    </main>
  );
}
