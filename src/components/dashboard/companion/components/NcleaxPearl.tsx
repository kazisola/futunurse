import { Sparkles } from "lucide-react";

const NclexPearl = ({ text }: { text: string }) => {
  return (
    <div className="flex gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200">
      <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-600 mb-1">NCLEX Pearl</p>
        <p className="text-sm text-amber-900 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
export default NclexPearl;