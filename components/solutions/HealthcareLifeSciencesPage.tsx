"use client";

import Link from "next/link";
import { 
  Stethoscope,
  Database,
  FileCheck,
  BarChart3,
  Microscope,
  FileText,
  Activity,
  ShieldCheck,
  Rocket,
  Users,
  CheckCircle2,
  ArrowRight,
  Zap,
  Target,
  Award,
  ClipboardList,
  Pill,
  TestTube,
  Heart,
  Brain,
  Laptop
} from "lucide-react";
import PrimaryButton from "../svg/primary-button";

export default function HealthcareLifeSciencesPage() {
  const healthcareCategories = [
    {
      icon: Database,
      title: "Clinical Data Management",
      description: "Ensure data integrity and regulatory compliance throughout clinical trials.",
      roles: [
        "Clinical Data Managers",
        "Clinical Data Coordinators",
        "EDC Specialists (Electronic Data Capture)",
        "CDISC Standards Experts (CDASH, SDTM, ADaM)",
        "Medical Coders (MedDRA, WHO-Drug, ICD-10)",
        "Data Quality Analysts",
        "Clinical Database Programmers",
        "Data Management Scientists"
      ],
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: FileCheck,
      title: "Regulatory Affairs & Compliance",
      description: "Navigate complex regulations and ensure submission readiness.",
      roles: [
        "Regulatory Affairs Specialists (FDA, EMA, ICH)",
        "Regulatory Writers",
        "Clinical Trial Managers (CTM)",
        "Quality Assurance (QA) Specialists",
        "Compliance Officers (GCP, GMP, GLP)",
        "Submission Managers (IND, NDA, BLA, MAA)",
        "Post-Market Surveillance Specialists"
      ],
      color: "from-red-500 to-orange-600"
    },
    {
      icon: BarChart3,
      title: "Biostatistics & Programming",
      description: "Statistical analysis and programming for clinical trial data.",
      roles: [
        "Biostatisticians",
        "Statistical Programmers (SAS, R, Python)",
        "Statistical Analysts",
        "Clinical SAS Programmers",
        "TLF (Tables, Listings, Figures) Programmers",
        "Pharmacokineticists (PK/PD Analysts)",
        "Statistical Directors"
      ],
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Microscope,
      title: "Clinical Operations & Research",
      description: "Manage and execute clinical trials from start to finish.",
      roles: [
        "Clinical Research Associates (CRA)",
        "Clinical Research Coordinators (CRC)",
        "Site Monitors",
        "Clinical Trial Managers",
        "Patient Recruitment Specialists",
        "Clinical Operations Managers",
        "Vendor Management Specialists"
      ],
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: FileText,
      title: "Medical Writing & Documentation",
      description: "Create clear, compliant clinical and regulatory documents.",
      roles: [
        "Medical Writers",
        "Regulatory Medical Writers",
        "Clinical Study Report (CSR) Writers",
        "Protocol Writers",
        "Scientific Writers",
        "Medical Communications Specialists",
        "Publication Managers"
      ],
      color: "from-indigo-500 to-blue-600"
    },
    {
      icon: ShieldCheck,
      title: "Pharmacovigilance & Safety",
      description: "Monitor and report adverse events and drug safety.",
      roles: [
        "Pharmacovigilance (PV) Specialists",
        "Drug Safety Physicians",
        "Medical Reviewers",
        "Case Processors",
        "Safety Database Specialists",
        "Signal Detection Analysts",
        "ICSR (Individual Case Safety Report) Specialists",
        "Risk Management Specialists"
      ],
      color: "from-rose-500 to-red-600"
    },
    {
      icon: Laptop,
      title: "Healthcare IT & Systems",
      description: "Implement and maintain clinical trial technology platforms.",
      roles: [
        "EDC System Administrators (Medidata, Veeva, Oracle)",
        "CTMS (Clinical Trial Management System) Specialists",
        "eTMF (Electronic Trial Master File) Administrators",
        "Healthcare Software Developers",
        "Clinical Systems Analysts",
        "Data Integration Engineers"
      ],
      color: "from-teal-500 to-cyan-600"
    },
    {
      icon: Activity,
      title: "Emerging & Specialized",
      description: "Cutting-edge roles for modern healthcare innovation.",
      roles: [
        "Real-World Evidence (RWE) Specialists",
        "Digital Health Strategists",
        "Decentralized Clinical Trial (DCT) Coordinators",
        "Health Economics & Outcomes Research (HEOR) Analysts",
        "Precision Medicine Specialists",
        "Clinical Informatics Scientists",
        "AI/ML Healthcare Data Scientists"
      ],
      color: "from-amber-500 to-orange-600"
    }
  ];

  const healthcareSolutions = [
    {
      icon: Database,
      title: "Clinical Data Management",
      description: "Full-service CDM including EDC setup, data cleaning, and CDISC conversions."
    },
    {
      icon: FileCheck,
      title: "Regulatory Submissions",
      description: "Expert support for IND, NDA, BLA, and MAA submissions to global authorities."
    },
    {
      icon: BarChart3,
      title: "Biostatistical Analysis",
      description: "Statistical analysis plans, programming, and TLF generation for trials."
    },
    {
      icon: Microscope,
      title: "Clinical Trial Management",
      description: "End-to-end trial execution from site selection to database lock."
    },
    {
      icon: ShieldCheck,
      title: "Pharmacovigilance",
      description: "Adverse event monitoring, case processing, and safety reporting."
    },
    {
      icon: FileText,
      title: "Medical Writing",
      description: "Clinical study reports, protocols, investigator brochures, and publications."
    },
    {
      icon: TestTube,
      title: "Clinical Data Standards",
      description: "CDISC implementation (SDTM, ADaM, CDASH) and eCRF design."
    },
    {
      icon: ClipboardList,
      title: "Quality & Compliance",
      description: "GCP audits, quality management systems, and regulatory inspections."
    },
    {
      icon: Heart,
      title: "Patient-Centric Trials",
      description: "Decentralized trials, remote monitoring, and patient engagement."
    },
    {
      icon: Brain,
      title: "Real-World Evidence",
      description: "RWE studies, observational research, and post-market surveillance."
    },
    {
      icon: Laptop,
      title: "Clinical Systems",
      description: "EDC, CTMS, eTMF, and IRT system implementation and validation."
    },
    {
      icon: Pill,
      title: "Medical Affairs",
      description: "Medical information, publications, speaker programs, and KOL engagement."
    }
  ];

  const industryExpertise = [
    "Pharmaceutical", "Biotechnology", "Medical Devices", "CROs (Contract Research Organizations)",
    "Diagnostics", "Digital Health", "Gene Therapy", "Cell Therapy",
    "Oncology", "Rare Diseases", "Vaccines", "Clinical Labs"
  ];

  const benefits = [
    {
      icon: Award,
      title: "Domain Expertise",
      description: "Professionals with deep therapeutic area knowledge and regulatory experience."
    },
    {
      icon: ShieldCheck,
      title: "Regulatory Compliance",
      description: "All talent trained in GCP, ICH guidelines, and global regulatory requirements."
    },
    {
      icon: Zap,
      title: "Rapid Deployment",
      description: "Pre-vetted experts ready to start immediately for trial timelines."
    },
    {
      icon: Target,
      title: "Global Coverage",
      description: "Support for FDA, EMA, PMDA, and other global regulatory authorities."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-20 px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-mono">
              Healthcare & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">Life Sciences</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-sans">
              Specialized talent for clinical trials, regulatory affairs, and medical research. From clinical data management to biostatistics, we connect you with experts who understand the unique demands of pharma, biotech, and medical device development.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup" className="inline-block">
                <div style={{ width: '200px' }}>
                  <PrimaryButton
                    width="200"
                    height="56"
                    wrapperClassName="primary-button-wrapper"
                    gradientId="paint0_linear_healthcare_hero"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Categories Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-mono">
              Healthcare Specializations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans">
              Access specialized healthcare professionals across all phases of clinical development and regulatory compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {healthcareCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 font-sans">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-6 font-sans">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.roles.map((role, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="font-sans">{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Healthcare Solutions Grid */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-mono">
              Healthcare Solutions We Deliver
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans">
              Comprehensive services across the entire clinical development lifecycle
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {healthcareSolutions.map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-sans">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-sans">
                    {solution.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-mono">
              Industry Expertise
            </h2>
            <p className="text-lg text-gray-600 font-sans">
              Serving the full spectrum of healthcare and life sciences sectors
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {industryExpertise.map((industry, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 text-gray-800 rounded-full font-medium text-sm border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all font-sans"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
              Why Choose Knacksters Healthcare?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-sans">
              Partner with healthcare professionals who understand regulatory requirements and clinical trial complexities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-sans">{benefit.title}</h3>
                  <p className="text-gray-300 font-sans">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-mono">
            Ready to Accelerate Your Clinical Programs?
          </h2>
          <p className="text-xl text-gray-700 mb-8 font-sans">
            Connect with specialized healthcare professionals who deliver compliant, high-quality results for your clinical trials and regulatory submissions.
          </p>
          <Link href="/signup" className="inline-block">
            <div style={{ width: '200px' }} className="mx-auto">
              <PrimaryButton
                width="200"
                height="56"
                wrapperClassName="primary-button-wrapper"
                gradientId="paint0_linear_healthcare_cta"
              />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
