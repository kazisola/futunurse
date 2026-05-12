const BulletList = ({ items }: { items: string[] }) => {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2.5 text-sm text-slate-600 leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default BulletList;