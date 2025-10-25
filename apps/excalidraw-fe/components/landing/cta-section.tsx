"use client";

export function CTASection() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-20 shadow-xl sm:px-12 sm:py-28">
          <div className="relative">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Start Creating Today
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
                Join thousands of users who are already bringing their ideas to life with Etherdraw.
                No credit card required.
              </p>
              <div className="mt-8">
                <a
                  href="/draw"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-background text-foreground font-medium hover:bg-background/90 transition-colors"
                >
                  Try it Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}