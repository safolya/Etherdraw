"use client";

export function FeatureSection() {
  const features = [
    {
      icon: "🎨",
      title: "Intuitive Drawing Tools",
      description: "Simple yet powerful tools for creating diagrams and illustrations."
    },
    {
      icon: "👥",
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time, see changes as they happen."
    },
    {
      icon: "💾",
      title: "Auto-saving",
      description: "Never lose your work with automatic saving and version history."
    },
    {
      icon: "🔄",
      title: "Export Options",
      description: "Export your drawings in multiple formats including PNG, SVG, and more."
    }
  ];

  return (
    <section className="py-20 bg-accent/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need to Create
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features that make drawing and collaboration seamless
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="relative p-6 bg-card rounded-2xl shadow-sm ring-1 ring-border/5"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}