import InquiryForm from "./InquiryForm.jsx";

export default function ContactSales() {
  return (
    <section id="inquiry" className="section">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div>
            <span className="eyebrow">Contact sales</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
              Bring your pipeline into orbit
            </h2>
            <p className="mt-4 text-inkLight-mid dark:text-ink-mid">
              Tell us about your team and what you're trying to solve. We'll follow up with a
              plan tailored to your company size and industry — usually within one business day.
            </p>
            <div className="mt-8 space-y-4 font-mono text-xs text-inkLight-low dark:text-ink-low">
              <p>→ Response within 1 business day</p>
              <p>→ No obligation, no spam</p>
              <p>→ Talk to a real sales engineer, not a bot</p>
            </div>
          </div>
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
