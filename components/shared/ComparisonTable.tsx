'use client';

export interface DifferentiatorRow {
  feature: string;
  knacksters: string;
  freelance: string;
  staffing: string;
  fulltime: string;
  highlight: boolean;
}

export const differentiators: DifferentiatorRow[] = [
  {
    feature: "Time to Start",
    knacksters: "Hours",
    freelance: "1–2 weeks",
    staffing: "4–6 weeks",
    fulltime: "6–12 weeks",
    highlight: true,
  },
  {
    feature: "Who Manages",
    knacksters: "Dedicated CSM",
    freelance: "You do it all",
    staffing: "You do it all",
    fulltime: "You do it all",
    highlight: true,
  },
  {
    feature: "Try Before Committing",
    knacksters: "✓ 50 free hours",
    freelance: "✗ Pay upfront",
    staffing: "✗ Contract first",
    fulltime: "✗ Hire blind",
    highlight: true,
  },
  {
    feature: "Quality Vetting",
    knacksters: "Pre-screened (8% pass)",
    freelance: "Hit or miss",
    staffing: "Variable",
    fulltime: "Unknown until hired",
    highlight: false,
  },
  {
    feature: "True Monthly Cost*",
    knacksters: "From $7,000 managed",
    freelance: "$15–25K unmanaged",
    staffing: "$20–40K + agency fee",
    fulltime: "$10–15K + overhead",
    highlight: false,
  },
  {
    feature: "Flexibility",
    knacksters: "Scale monthly",
    freelance: "Per project",
    staffing: "6–12 mo contracts",
    fulltime: "Fixed forever",
    highlight: false,
  },
  {
    feature: "Can Hire Full-Time",
    knacksters: "✓ Anytime",
    freelance: "⚠ Complicated",
    staffing: "✗ Large fees",
    fulltime: "N/A",
    highlight: false,
  },
  {
    feature: "Multi-Domain",
    knacksters: "✓ 6 domains",
    freelance: "✗ Single skill",
    staffing: "⚠ Extra cost",
    fulltime: "✗ Single skill",
    highlight: true,
  },
];

interface ComparisonTableProps {
  heading?: string;
  subheading?: string;
  footerNote?: string;
}

export default function ComparisonTable({
  heading = "Knacksters vs. The Alternatives",
  subheading = "See how we compare to traditional hiring, freelance marketplaces, and staffing agencies",
  footerNote,
}: ComparisonTableProps) {
  return (
    <div>
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-[rgb(38,38,38)] mb-3">
          {heading}
        </h2>
        <p className="font-sans text-base sm:text-lg text-[rgb(89,89,89)] max-w-3xl mx-auto">
          {subheading}
        </p>
      </div>

      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <table className="w-full min-w-[680px] bg-white rounded-2xl shadow-lg overflow-hidden">
          <thead>
            <tr style={{ backgroundColor: '#5A1568' }} className="text-white">
              <th className="px-4 md:px-6 py-4 text-left font-bold font-sans text-xs sm:text-sm">Feature</th>
              <th className="px-4 md:px-6 py-4 text-center font-bold font-sans text-xs sm:text-sm">Knacksters</th>
              <th className="px-4 md:px-6 py-4 text-center font-sans text-xs sm:text-sm opacity-80">Freelance</th>
              <th className="px-4 md:px-6 py-4 text-center font-sans text-xs sm:text-sm opacity-80">Staffing</th>
              <th className="px-4 md:px-6 py-4 text-center font-sans text-xs sm:text-sm opacity-80">Full-Time</th>
            </tr>
          </thead>
          <tbody>
            {differentiators.map((row, index) => (
              <tr
                key={index}
                className={`border-b border-gray-100 ${row.highlight ? 'bg-orange-50' : 'bg-white'} hover:bg-gray-50 transition-colors`}
              >
                <td className="px-4 md:px-6 py-3.5 font-semibold text-[rgb(38,38,38)] font-sans text-xs sm:text-sm">{row.feature}</td>
                <td className="px-4 md:px-6 py-3.5 text-center font-bold font-sans text-xs sm:text-sm" style={{ color: '#5A1568' }}>{row.knacksters}</td>
                <td className="px-4 md:px-6 py-3.5 text-center text-gray-500 font-sans text-xs sm:text-sm">{row.freelance}</td>
                <td className="px-4 md:px-6 py-3.5 text-center text-gray-500 font-sans text-xs sm:text-sm">{row.staffing}</td>
                <td className="px-4 md:px-6 py-3.5 text-center text-gray-500 font-sans text-xs sm:text-sm">{row.fulltime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center space-y-2">
        <p className="text-sm text-gray-500 font-sans italic">
          * Full-time cost excludes employer taxes, benefits, equipment, onboarding, and management time — which typically add 30–50% on top of salary.
        </p>
        {footerNote && (
          <p className="text-base text-gray-700 font-sans font-medium">{footerNote}</p>
        )}
      </div>
    </div>
  );
}
