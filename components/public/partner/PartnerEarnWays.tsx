/* ────────── Partner home — "Anyone can earn with us" ────────── */

const WAYS = [
  {
    img: "/partner/earn-traffic.png",
    title: "Do you have a personal traffic source?",
    body: "For example, your website, forum, YouTube channel, social media account, or other sources of traffic.",
  },
  {
    img: "/partner/earn-arbitrage.png",
    title: "Are you involved in traffic arbitrage?",
    body: "We work with all types of advertising networks and other means of traffic sources.",
  },
  {
    img: "/partner/earn-provide.png",
    title: "Do you provide services in the field of trading?",
    body: "For example, training courses, trading webinars, trade signal services, financial consultations, or client portfolio management.",
  },
];

export default function PartnerEarnWays() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-center text-2xl font-extrabold tracking-tight text-white sm:text-[32px]">
        Anyone can earn with us
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {WAYS.map((w) => (
          <article
            key={w.title}
            className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111C30]"
          >
            <img
              src={w.img}
              alt=""
              aria-hidden
              className="h-40 w-full object-cover"
            />
            <div className="-mt-8 mx-4 rounded-xl border border-white/[0.06] bg-[#16233B] p-4 shadow-lg">
              <h3 className="text-sm font-bold text-white">{w.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#8b93a7]">
                {w.body}
              </p>
            </div>
            <div className="h-4" />
          </article>
        ))}
      </div>
    </section>
  );
}
