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
      <span className="font-sans text-overline uppercase text-eyebrow">
        {role}
      </span>
      <p className="font-sans text-body text-fg-muted">{note}</p>
    </div>
  );
}
