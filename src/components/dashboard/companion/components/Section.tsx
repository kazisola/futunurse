const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">{title}</p>
      {children}
    </div>
  );
}

export default Section;