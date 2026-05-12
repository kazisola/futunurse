const PillList = ({ items, variant = "default" }: { items: string[]; variant?: "default" | "warning" | "danger" }) => {
  const styles = {
    default: "bg-slate-100 text-slate-700",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
    danger:  "bg-red-50 text-red-700 border border-red-200",
  };
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item, i) => (
        <span key={i} className={`text-xs px-2.5 py-1 rounded-full font-medium ${styles[variant]}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

export default PillList;