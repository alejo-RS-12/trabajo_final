import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
