import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border px-6 pb-16 pt-32">
      <div className="mx-auto max-w-7xl">
        {eyebrow && (
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-6xl uppercase tracking-tighter md:text-8xl">
          {title}
        </h1>
        {children && <div className="mt-6 max-w-2xl text-muted">{children}</div>}
      </div>
    </section>
  );
}
