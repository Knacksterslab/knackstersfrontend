interface SectionHeaderProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function SectionHeader({ children, icon }: SectionHeaderProps) {
  return (
    <div className="bg-gray-800 text-white px-4 py-3 rounded-t-lg flex items-center gap-2.5 text-sm font-semibold mb-0 font-mono">
      {icon && <span className="w-[18px] h-[18px]">{icon}</span>}
      {children}
    </div>
  );
}

