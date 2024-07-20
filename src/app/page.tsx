import { CardLink } from "@/app/card";

export default function Home() {
  return (
    <section className="flex flex-row gap-16">
        <CardLink
          href="/create"
          title="Create"
          index={3}
        />
        <CardLink
          href="/join"
          title="Join"
          index={9}
        />
      </section>
  );
}
