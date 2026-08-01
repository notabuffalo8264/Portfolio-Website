import { Reveal } from "@/components/reveal";

type CapabilityGroup = {
  readonly title: string;
  readonly items: readonly string[];
};

export function CapabilitiesGrid({ groups }: { groups: readonly CapabilityGroup[] }) {
  return (
    <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
      {groups.map((group, index) => (
        <Reveal
          key={group.title}
          delay={index * 0.06}
          className="border-t border-border pt-7"
        >
          <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {group.title}
          </h3>
          <p className="mt-5 max-w-xl text-sm leading-7 text-foreground-secondary">
            {group.items.join("  /  ")}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
