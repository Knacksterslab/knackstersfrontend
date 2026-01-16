interface SectionContentProps {
  children: React.ReactNode;
}

export default function SectionContent({ children }: SectionContentProps) {
  return (
    <div className="border border-t-0 border-gray-300 rounded-b-lg p-5">
      {children}
    </div>
  );
}

