/** One of the Two Layers — AVAN (patrimony) / PFI (institutional trust). */
export function LayerPanel({
  label,
  role,
  note,
}: {
  label: string;
  role: string;
  note: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-serif text-display-l font-medium leading-none">{label}</span>
      <span className="font-mono text-overline uppercase text-(--avan-text-eyebrow)">
        {role}
      </span>
      <p className="font-sans text-body text-(--avan-text-secondary)">{note}</p>
    </div>
  );
}
