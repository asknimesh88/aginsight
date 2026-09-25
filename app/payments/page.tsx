import { PageTitle, Heading, Button } from "@/components/ui";
import CopyButton from "@/components/copy-button";
import JsonLd from "@/components/json-ld";
import { breadcrumbs, graph, pageMeta, webPage } from "@/lib/seo";

const bank = [
  ["Account name", "Sabaragamuwa University of Sri Lanka"],
  ["Account number", "0003416128"],
  ["Account type", "Current account"],
  ["Bank", "Bank of Ceylon"],
  ["Bank code", "7010"],
  ["Branch", "Balangoda"],
  ["Branch code", "688"],
  ["SWIFT code", "BCEYLKLX"],
];

const copyable = new Set(["Account name", "Account number", "SWIFT code"]);

const Icon = ({ d }: { d: string }) => (
  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white" aria-hidden>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
  </span>
);

const seo = {
  path: "/payments/",
  title: "Payments",
  description: "Pay AgInsight 2024 conference fees by direct deposit to the Sabaragamuwa University of Sri Lanka Bank of Ceylon account or online through the payment portal.",
  keywords: ["AgInsight payments", "AgInsight 2024 registration fee", "Sabaragamuwa University payment", "conference payment Sri Lanka"],
};
export const metadata = pageMeta(seo);
const schema = graph(webPage(seo), breadcrumbs([{ name: "Payments", path: seo.path }]));

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageTitle title="Payments" lead="Pay by direct bank deposit or online through the university’s payment portal." />

      <section className="mx-auto max-w-6xl px-4 py-24">
        <Heading title="Choose how to pay" />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Bank */}
          <article className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm sm:p-10">
            <Icon d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
            <h3 className="mt-6 font-slab text-2xl font-semibold text-field">Direct bank deposit</h3>
            <p className="mt-2 text-ink/75">Deposit or transfer to the university account below.</p>
            <dl className="mt-8 divide-y divide-black/5 rounded-2xl bg-leaf px-5">
              {bank.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="text-sm text-muted">{k}</dt>
                  <dd className="flex items-center gap-1 text-right font-medium">
                    <span className={k === "Account number" || k === "SWIFT code" ? "font-slab text-lg tracking-wide" : ""}>{v}</span>
                    {copyable.has(k) ? <CopyButton value={v} label={k.toLowerCase()} /> : <span className="w-16 shrink-0" aria-hidden />}
                  </dd>
                </div>
              ))}
            </dl>
          </article>

          {/* Online */}
          <article className="flex flex-col rounded-3xl bg-field p-8 text-white sm:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-white" aria-hidden>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM3 10h18M7 15h4" />
              </svg>
            </span>
            <h3 className="mt-6 font-slab text-2xl font-semibold">Online payment</h3>
            <p className="mt-2 text-white/75">Pay by card through the university’s Bank of Ceylon payment portal.</p>
            <ol className="mt-8 flex flex-col gap-4">
              {["Open the payment portal and read the instructions.", "Follow the steps on the portal to complete your payment."].map((s, i) => (
                <li key={s} className="flex gap-4 rounded-2xl bg-white/5 p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary font-semibold">{i + 1}</span>
                  <span className="pt-1 leading-relaxed">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-auto pt-8">
              <Button href="https://www.sab.ac.lk/payment-boc/">Go to the payment portal</Button>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-leaf p-8 sm:p-10 md:flex-row md:items-center">
          <div>
            <h2 className="font-slab text-2xl font-semibold text-field">Questions about payment?</h2>
            <p className="mt-2 text-ink/75">Contact the conference secretariat before you pay.</p>
          </div>
          <Button href="/contact-us/" variant="light">Contact us</Button>
        </div>
      </section>
    </>
  );
}
