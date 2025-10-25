"use client";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          
          {/* Left side content */}
          <div className="relative">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Draw and Collaborate in Real-Time
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Create beautiful diagrams, wireframes, and illustrations together with your team. 
              Etherdraw makes it simple to bring your ideas to life.
            </p>
            <div className="mt-8 flex gap-4">
              <a 
                href="/signin" 
                className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Signin
              </a>
              <a 
                href="/signup" 
                className="inline-flex items-center px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
              >
                Sign Up Free
              </a>
            </div>
          </div>

          {/* Right side preview */}
          <div className="relative mt-10 lg:mt-0">
            <div className="relative rounded-2xl bg-card p-4 shadow-xl ring-1 ring-border/5">
              <div className="h-[400px] w-full bg-accent rounded-lg flex items-center justify-center">
                <span className="text-2xl text-muted-foreground">Canvas Preview</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}