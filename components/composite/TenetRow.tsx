import { Divider } from "@/components/primitives/Divider";

/** A tenet of the Stone: label + one line. Rendered on the dark surface. */
export function TenetRow({ label, line }: { label: string; line: string }) {
  return (
    <div className="flex flex-col gap-3 py-6">
      <Divider className="w-10" />
      <h3 className="font-serif text-display-m font-medium">{label}</h3>
      <p className="font-sans text-body text-[color:var(--avan-text-secondary)]">{line}</p>
    </div>
  );
}
