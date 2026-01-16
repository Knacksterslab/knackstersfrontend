"use client";

import Link from "next/link";
import { CheckCircle, FileText, Clock } from "lucide-react";

export default function TermsOfServicePage() {
  const lastUpdated = "January 3, 2026";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: `By accessing or using Knacksters' platform, services, or website (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you're using our Services on behalf of an organization, you agree to these Terms on behalf of that organization and represent that you have the authority to do so.`
    },
    {
      id: "services",
      title: "2. Our Services",
      content: `Knacksters provides an on-demand talent platform that connects businesses ("Clients") with pre-vetted professionals ("Talent") across six core domains: AI Solutions, Cybersecurity, Development & DevOps, Design & Creative, Marketing, and Healthcare & Life Sciences. Each Client engagement includes a dedicated Business Manager who coordinates all aspects of the project.`,
      subsections: [
        {
          title: "2.1 Service Plans",
          content: "We offer flexible subscription plans starting at $12,500/month for 200 hours, $25,000/month for 450 hours, and custom Enterprise plans. All plans include access to our full talent network and dedicated Business Manager support."
        },
        {
          title: "2.2 Additional Hours",
          content: "Hours beyond your plan allocation are billed at $100 per hour. Additional hours are invoiced monthly with no minimum commitment required."
        },
        {
          title: "2.3 Unused Hours",
          content: "Unused hours do not roll over to subsequent billing periods unless explicitly agreed in a custom Enterprise agreement."
        }
      ]
    },
    {
      id: "eligibility",
      title: "3. Eligibility",
      content: `You must be at least 18 years old and have the legal capacity to enter into contracts to use our Services. By using our Services, you represent and warrant that you meet these eligibility requirements.`
    },
    {
      id: "account",
      title: "4. Account Registration & Security",
      subsections: [
        {
          title: "4.1 Account Creation",
          content: "To access our Services, you must create an account with accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials."
        },
        {
          title: "4.2 Account Responsibility",
          content: "You are solely responsible for all activities that occur under your account. Notify us immediately of any unauthorized use or security breach."
        },
        {
          title: "4.3 Business Manager Access",
          content: "Your dedicated Business Manager will have limited access to your account to coordinate talent assignments and project management on your behalf."
        }
      ]
    },
    {
      id: "payment",
      title: "5. Payment Terms",
      subsections: [
        {
          title: "5.1 Billing Cycle",
          content: "Subscription plans are billed monthly in advance. Your first payment is due upon signup, and subsequent payments are automatically charged on the same day each month."
        },
        {
          title: "5.2 Payment Methods",
          content: "We accept major credit cards, ACH transfers, and wire transfers for Enterprise clients. Enterprise clients may request net-30 payment terms subject to credit approval."
        },
        {
          title: "5.3 Price Changes",
          content: "We reserve the right to modify our pricing with 30 days' written notice. Price changes will take effect at the start of your next billing cycle."
        },
        {
          title: "5.4 Late Payments",
          content: "Late payments may result in service suspension until payment is received. A late fee of 1.5% per month (or the maximum permitted by law) may be applied to overdue balances."
        },
        {
          title: "5.5 Refunds",
          content: "Monthly subscription fees are non-refundable. If you cancel mid-month, you retain access to Services through the end of your current billing period."
        }
      ]
    },
    {
      id: "cancellation",
      title: "6. Cancellation & Termination",
      subsections: [
        {
          title: "6.1 Cancellation by Client",
          content: "You may cancel your subscription at any time with no cancellation fees. Cancellation takes effect at the end of your current billing period. You will not be charged for subsequent periods."
        },
        {
          title: "6.2 Termination by Knacksters",
          content: "We may suspend or terminate your account if you violate these Terms, engage in fraudulent activity, or fail to pay fees when due. We'll provide notice when possible, except in cases of immediate legal or security concerns."
        },
        {
          title: "6.3 Effect of Termination",
          content: "Upon termination, your access to Services will cease. You remain responsible for any fees incurred before termination. Provisions that should survive termination (including intellectual property rights, indemnification, and limitation of liability) will remain in effect."
        }
      ]
    },
    {
      id: "talent",
      title: "7. Talent Relationships",
      subsections: [
        {
          title: "7.1 Independent Contractors",
          content: "All Talent in our network are independent contractors, not employees of Knacksters or our Clients. Knacksters handles all aspects of Talent engagement, including sourcing, vetting, coordination, and payment."
        },
        {
          title: "7.2 Direct Hiring Restrictions",
          content: "During your active subscription and for 12 months after your last project, you may not directly hire or contract with Talent introduced through Knacksters without our written consent and payment of a placement fee."
        },
        {
          title: "7.3 Talent Quality",
          content: "We maintain rigorous vetting standards (8% acceptance rate) and continuously monitor Talent performance. If you're unsatisfied with assigned Talent, your Business Manager will arrange a replacement."
        }
      ]
    },
    {
      id: "intellectual-property",
      title: "8. Intellectual Property Rights",
      subsections: [
        {
          title: "8.1 Work Product Ownership",
          content: "Unless otherwise agreed in writing, all work product created by Talent specifically for your projects becomes your exclusive property upon full payment of applicable fees."
        },
        {
          title: "8.2 Pre-Existing Materials",
          content: "Talent may use pre-existing code, templates, or materials in delivering Services. You receive a perpetual, non-exclusive license to use such materials as incorporated into your work product."
        },
        {
          title: "8.3 Platform Rights",
          content: "Knacksters retains all rights to our platform, website, dashboard, processes, methodologies, and any proprietary tools or technologies we provide."
        },
        {
          title: "8.4 Confidential Information",
          content: "Both parties agree to protect each other's confidential information and use it only for purposes of performing under these Terms."
        }
      ]
    },
    {
      id: "warranties",
      title: "9. Warranties & Disclaimers",
      subsections: [
        {
          title: "9.1 Service Quality",
          content: "We warrant that Services will be performed in a professional and workmanlike manner consistent with industry standards. Your sole remedy for breach of this warranty is re-performance of deficient work."
        },
        {
          title: "9.2 Disclaimer",
          content: "EXCEPT AS EXPRESSLY PROVIDED, SERVICES ARE PROVIDED \"AS IS\" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. We do not guarantee that Services will be uninterrupted, error-free, or meet your specific requirements."
        }
      ]
    },
    {
      id: "limitation",
      title: "10. Limitation of Liability",
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, KNACKSTERS' TOTAL LIABILITY ARISING FROM OR RELATING TO THESE TERMS OR SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM. IN NO EVENT SHALL KNACKSTERS BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, DATA LOSS, OR BUSINESS INTERRUPTION, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.`,
      note: "Some jurisdictions do not allow exclusion of certain warranties or limitation of liability, so the above limitations may not fully apply to you."
    },
    {
      id: "indemnification",
      title: "11. Indemnification",
      content: `You agree to indemnify, defend, and hold harmless Knacksters, our affiliates, and our respective officers, directors, employees, and agents from any claims, losses, damages, liabilities, and expenses (including reasonable attorneys' fees) arising from: (a) your use of Services; (b) your breach of these Terms; (c) your violation of any law or rights of a third party; or (d) content or materials you provide.`
    },
    {
      id: "data-privacy",
      title: "12. Data Privacy & Security",
      subsections: [
        {
          title: "12.1 Data Protection",
          content: "We implement enterprise-grade security measures to protect your data. See our Privacy Policy for detailed information about data collection, use, and protection practices."
        },
        {
          title: "12.2 Client Data",
          content: "You retain all rights to data and materials you provide. We use your data only to deliver Services and as described in our Privacy Policy."
        },
        {
          title: "12.3 GDPR & CCPA Compliance",
          content: "We comply with applicable data protection laws, including GDPR and CCPA. Contact us to exercise your data rights or with any privacy concerns."
        }
      ]
    },
    {
      id: "modifications",
      title: "13. Modifications to Terms",
      content: `We may modify these Terms at any time by posting updated Terms on our website. Material changes will be communicated via email at least 30 days before taking effect. Your continued use of Services after changes become effective constitutes acceptance of the modified Terms.`
    },
    {
      id: "dispute-resolution",
      title: "14. Dispute Resolution",
      subsections: [
        {
          title: "14.1 Informal Resolution",
          content: "Before filing any formal claim, you agree to first contact us to attempt informal resolution. Email legal@knacksters.com with a detailed description of the dispute."
        },
        {
          title: "14.2 Binding Arbitration",
          content: "Any dispute not resolved informally within 60 days shall be resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. The arbitration will be conducted in [Your State/Country] and judgment on the award may be entered in any court having jurisdiction."
        },
        {
          title: "14.3 Class Action Waiver",
          content: "You agree that disputes will be resolved individually, not as part of a class action, consolidated, or representative proceeding."
        },
        {
          title: "14.4 Exceptions",
          content: "Either party may seek injunctive relief in court for intellectual property infringement or unauthorized access to Services."
        }
      ]
    },
    {
      id: "governing-law",
      title: "15. Governing Law",
      content: `These Terms shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions. You consent to the exclusive jurisdiction of courts in [Your Location] for any disputes not subject to arbitration.`
    },
    {
      id: "general",
      title: "16. General Provisions",
      subsections: [
        {
          title: "16.1 Entire Agreement",
          content: "These Terms constitute the entire agreement between you and Knacksters regarding Services and supersede all prior agreements and understandings."
        },
        {
          title: "16.2 Severability",
          content: "If any provision is found unenforceable, the remaining provisions will continue in full effect."
        },
        {
          title: "16.3 Waiver",
          content: "Our failure to enforce any right or provision is not a waiver of that right or provision."
        },
        {
          title: "16.4 Assignment",
          content: "You may not assign or transfer these Terms without our prior written consent. We may assign these Terms without restriction."
        },
        {
          title: "16.5 Force Majeure",
          content: "Neither party shall be liable for delays or failure to perform due to causes beyond reasonable control, including natural disasters, war, terrorism, pandemics, or government actions."
        }
      ]
    },
    {
      id: "contact",
      title: "17. Contact Information",
      content: `If you have questions about these Terms, please contact us at:

**Email:** legal@knacksters.com  
**Support:** support@knacksters.com  
**Address:** [Your Company Address]

For general inquiries, visit our website at knacksters.com or contact your dedicated Business Manager.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-10 h-10" style={{ color: '#5A1568' }} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-mono">
              Terms of Service
            </h1>
          </div>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-6 font-sans">
            Please read these terms carefully before using Knacksters' platform and services.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Quick Summary Section */}
      <section className="py-12 px-4 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-sans">Quick Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#5A1568' }} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Flexible, No Contracts</h3>
                <p className="text-sm text-gray-600">Cancel anytime. Month-to-month billing with no long-term commitment required.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#5A1568' }} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Your Work, Your Rights</h3>
                <p className="text-sm text-gray-600">You own all work product created for your projects upon full payment.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#5A1568' }} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Managed For You</h3>
                <p className="text-sm text-gray-600">Dedicated Business Manager coordinates all talent and handles project logistics.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#5A1568' }} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Enterprise Security</h3>
                <p className="text-sm text-gray-600">Your data is protected with enterprise-grade security measures and compliance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-12 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-sans">Table of Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm hover:underline"
                  style={{ color: '#5A1568' }}
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-sans">
                  {section.title}
                </h2>
                {section.content && (
                  <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                    {section.content}
                  </p>
                )}
                {section.note && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                    <p className="text-sm text-blue-900">
                      <strong>Note:</strong> {section.note}
                    </p>
                  </div>
                )}
                {section.subsections && (
                  <div className="space-y-6 ml-4">
                    {section.subsections.map((subsection, idx) => (
                      <div key={idx}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {subsection.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {subsection.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Our Terms?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our team is here to help clarify any questions you have about our Terms of Service.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="px-6 py-3 rounded-lg font-bold transition-all text-white"
                style={{ backgroundColor: '#5A1568' }}
              >
                Get Started
              </Link>
              <Link
                href="/support"
                className="px-6 py-3 rounded-lg font-bold transition-all bg-white border-2 hover:bg-gray-50"
                style={{ borderColor: '#5A1568', color: '#5A1568' }}
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
