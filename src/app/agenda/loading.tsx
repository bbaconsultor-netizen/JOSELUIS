import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="py-16">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-1/3 rounded bg-slate-200" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 rounded-xl bg-slate-100" />
          ))}
        </div>
      </div>
    </Container>
  );
}
