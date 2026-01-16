"use client";

import Link from "next/link";
import { Shield, CheckCircle, Clock, Lock, Eye, Database, Globe, UserCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 3, 2026";

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: Shield,
      content: `Knacksters ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, website, and services (collectively, the "Services").

By using our Services, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies and practices, please do not use our Services.`
    },
    {
      id: "information-collect",
      title: "2. Information We Collect",
      icon: Database,
      subsections: [
        {
          title: "2.1 Information You Provide Directly",
          items: [
            "**Account Information:** Name, email address, company name, job title, phone number, and billing address when you register.",
            "**Payment Information:** Credit card details, billing address, and transaction history (processed securely through third-party payment processors).",
            "**Profile Information:** Business details, project requirements, industry, team size, and preferences.",
            "**Communications:** Content of messages, emails, and support requests you send to us.",
            "**Project Data:** Files, documents, specifications, and other materials you upload for projects."
          ]
        },
        {
          title: "2.2 Information Collected Automatically",
          items: [
            "**Usage Data:** Pages visited, features used, time spent, click patterns, and interaction with Services.",
            "**Device Information:** IP address, browser type, operating system, device identifiers, and mobile network information.",
            "**Cookies & Tracking:** We use cookies, web beacons, and similar technologies to track activity and store preferences. See Section 10 for details.",
            "**Analytics Data:** Performance metrics, error logs, and aggregated usage statistics."
          ]
        },
        {
          title: "2.3 Information from Third Parties",
          items: [
            "**Authentication Services:** Information from Google, Microsoft, or other SSO providers if you use social login.",
            "**Payment Processors:** Transaction confirmation and payment status from Stripe, PayPal, or other payment services.",
            "**Business Information:** Publicly available business data to verify company details and prevent fraud."
          ]
        }
      ]
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      icon: Eye,
      content: `We use collected information for the following purposes:`,
      items: [
        "**Provide Services:** Deliver, operate, and maintain our platform; match you with appropriate Talent; coordinate projects through Business Managers.",
        "**Process Payments:** Handle billing, invoicing, and payment processing; detect and prevent fraud.",
        "**Communications:** Send service updates, transaction confirmations, security alerts, and support messages.",
        "**Personalization:** Customize your experience, remember preferences, and provide relevant recommendations.",
        "**Improvement:** Analyze usage patterns, identify bugs, improve features, and develop new Services.",
        "**Security:** Monitor for suspicious activity, prevent fraud, enforce Terms of Service, and protect our legal rights.",
        "**Marketing:** Send promotional materials, newsletters, and product updates (you can opt out anytime).",
        "**Compliance:** Meet legal obligations, respond to legal requests, and enforce our agreements."
      ]
    },
    {
      id: "legal-basis",
      title: "4. Legal Basis for Processing (GDPR)",
      icon: CheckCircle,
      content: `If you are in the European Economic Area (EEA), our legal basis for processing your personal data includes:`,
      items: [
        "**Contract Performance:** Processing necessary to provide Services you've requested.",
        "**Consent:** You've given clear consent for specific purposes (e.g., marketing communications).",
        "**Legitimate Interests:** Processing necessary for our legitimate business interests (e.g., fraud prevention, service improvement) that don't override your rights.",
        "**Legal Obligations:** Processing required to comply with applicable laws and regulations."
      ]
    },
    {
      id: "sharing",
      title: "5. How We Share Your Information",
      icon: Globe,
      content: `We do not sell your personal information. We may share information in the following circumstances:`,
      subsections: [
        {
          title: "5.1 With Talent Network",
          content: "We share relevant project details and requirements with matched Talent to enable them to perform Services. Talent access is limited to information necessary for their assignments."
        },
        {
          title: "5.2 Service Providers",
          content: "We work with third-party companies who provide services on our behalf:",
          items: [
            "**Payment Processors:** Stripe, PayPal for secure payment processing",
            "**Cloud Hosting:** AWS, Google Cloud for data storage and computing",
            "**Analytics:** Google Analytics, Mixpanel for usage analysis",
            "**Communication:** SendGrid, Twilio for email and SMS delivery",
            "**Customer Support:** Zendesk, Intercom for support services"
          ]
        },
        {
          title: "5.3 Business Transfers",
          content: "If Knacksters is involved in a merger, acquisition, or sale of assets, your information may be transferred. We'll notify you before your information becomes subject to a different privacy policy."
        },
        {
          title: "5.4 Legal Requirements",
          content: "We may disclose information if required by law, court order, or government request; to protect our rights, property, or safety; or to prevent fraud or illegal activity."
        },
        {
          title: "5.5 With Your Consent",
          content: "We may share information for any other purpose with your explicit consent."
        }
      ]
    },
    {
      id: "data-retention",
      title: "6. Data Retention",
      icon: Clock,
      content: `We retain your information for as long as necessary to provide Services and fulfill purposes described in this Privacy Policy:`,
      items: [
        "**Active Accounts:** Account and usage data retained while your account is active.",
        "**Post-Cancellation:** After cancellation, we retain data for 90 days for account recovery, then archive for legal/compliance purposes (7 years).",
        "**Project Data:** Work product and project files retained for 2 years after project completion unless you request earlier deletion.",
        "**Financial Records:** Billing and payment data retained for 7 years for tax and legal compliance.",
        "**Marketing Data:** Contact information retained until you opt out of marketing communications."
      ]
    },
    {
      id: "your-rights",
      title: "7. Your Privacy Rights",
      icon: UserCheck,
      subsections: [
        {
          title: "7.1 All Users",
          items: [
            "**Access:** Request a copy of personal information we hold about you.",
            "**Correction:** Update or correct inaccurate information.",
            "**Deletion:** Request deletion of your personal information (subject to legal retention requirements).",
            "**Opt-Out:** Unsubscribe from marketing emails using the link in each email.",
            "**Data Portability:** Receive your data in a structured, machine-readable format."
          ]
        },
        {
          title: "7.2 Additional Rights (GDPR - EEA Residents)",
          items: [
            "**Right to Object:** Object to processing based on legitimate interests.",
            "**Right to Restrict:** Request restriction of processing in certain circumstances.",
            "**Right to Withdraw Consent:** Withdraw consent at any time where processing is based on consent.",
            "**Right to Lodge Complaint:** File a complaint with your local data protection authority."
          ]
        },
        {
          title: "7.3 Additional Rights (CCPA - California Residents)",
          items: [
            "**Know:** What personal information is collected, used, shared, or sold.",
            "**Delete:** Request deletion of personal information (subject to exceptions).",
            "**Opt-Out of Sale:** We don't sell personal information, but you can opt out of sharing for targeted advertising.",
            "**Non-Discrimination:** We won't discriminate against you for exercising your privacy rights."
          ]
        },
        {
          title: "7.4 How to Exercise Rights",
          content: "To exercise any of these rights, contact us at privacy@knacksters.com. We'll respond within 30 days. We may need to verify your identity before processing requests."
        }
      ]
    },
    {
      id: "security",
      title: "8. Data Security",
      icon: Lock,
      content: `We implement comprehensive security measures to protect your information:`,
      items: [
        "**Encryption:** Data encrypted in transit (TLS 1.3) and at rest (AES-256).",
        "**Access Controls:** Role-based access, multi-factor authentication, and principle of least privilege.",
        "**Infrastructure:** Enterprise-grade cloud infrastructure with SOC 2 Type II compliance.",
        "**Monitoring:** 24/7 security monitoring, intrusion detection, and incident response procedures.",
        "**Regular Audits:** Quarterly security audits and annual penetration testing.",
        "**Employee Training:** All staff complete annual security and privacy training.",
        "**Vendor Management:** Third-party vendors undergo security assessment before engagement."
      ],
      note: "While we strive to protect your information, no method of transmission or storage is 100% secure. We cannot guarantee absolute security."
    },
    {
      id: "international",
      title: "9. International Data Transfers",
      content: `Knacksters operates globally, and your information may be transferred to and processed in countries other than your own. We ensure adequate protection through:`,
      items: [
        "**Standard Contractual Clauses:** EU-approved clauses for transfers outside the EEA.",
        "**Adequacy Decisions:** Transfers to countries recognized by the EU as providing adequate protection.",
        "**Data Processing Agreements:** Contracts requiring third parties to provide equivalent protection.",
        "**Privacy Shield (where applicable):** Adherence to recognized international frameworks."
      ]
    },
    {
      id: "cookies",
      title: "10. Cookies & Tracking Technologies",
      content: `We use cookies and similar technologies to enhance your experience:`,
      subsections: [
        {
          title: "10.1 Types of Cookies",
          items: [
            "**Essential Cookies:** Required for basic functionality (authentication, security, preferences).",
            "**Performance Cookies:** Collect anonymous usage data to improve Services.",
            "**Functional Cookies:** Remember your choices and provide enhanced features.",
            "**Analytics Cookies:** Help us understand how you use Services (Google Analytics, Mixpanel).",
            "**Advertising Cookies:** Deliver relevant ads and measure campaign effectiveness."
          ]
        },
        {
          title: "10.2 Cookie Management",
          content: "You can control cookies through your browser settings. Note that disabling cookies may limit functionality. You can opt out of Google Analytics using the Google Analytics Opt-out Browser Add-on."
        },
        {
          title: "10.3 Do Not Track",
          content: "We currently do not respond to Do Not Track (DNT) signals due to lack of industry standards."
        }
      ]
    },
    {
      id: "children",
      title: "11. Children's Privacy",
      content: `Our Services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we've inadvertently collected information from a child, please contact us immediately, and we'll delete it.`
    },
    {
      id: "third-party",
      title: "12. Third-Party Links & Services",
      content: `Our Services may contain links to third-party websites or integrate with third-party services. We're not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any information.`
    },
    {
      id: "changes",
      title: "13. Changes to This Privacy Policy",
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Material changes will be communicated via:`,
      items: [
        "**Email Notification:** Sent to your registered email address at least 30 days before changes take effect.",
        "**In-App Notice:** Prominent notification when you log into your dashboard.",
        "**Website Banner:** Alert banner on our website during the notice period."
      ],
      note: "Your continued use of Services after changes take effect constitutes acceptance of the updated Privacy Policy. The \"Last Updated\" date at the top indicates when changes were made."
    },
    {
      id: "contact",
      title: "14. Contact Us & Data Protection Officer",
      content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices:

**Email:** privacy@knacksters.com  
**Data Protection Officer:** dpo@knacksters.com  
**Support:** support@knacksters.com  
**Address:** [Your Company Address]

**For EEA Residents:**  
Our EU Representative: [EU Representative Details]

**For UK Residents:**  
Our UK Representative: [UK Representative Details]

We aim to respond to all legitimate requests within 30 days. Occasionally it may take longer if your request is complex; we'll notify you if this is the case.`
    }
  ];

  const quickFacts = [
    {
      icon: Shield,
      title: "We Don't Sell Your Data",
      description: "We never sell your personal information to third parties. Your data is used solely to provide Services."
    },
    {
      icon: Lock,
      title: "Enterprise-Grade Security",
      description: "SOC 2 Type II compliant with 256-bit encryption, 24/7 monitoring, and regular security audits."
    },
    {
      icon: UserCheck,
      title: "You Control Your Data",
      description: "Access, correct, or delete your data anytime. Full data portability and easy opt-out options."
    },
    {
      icon: Globe,
      title: "GDPR & CCPA Compliant",
      description: "We comply with international data protection laws including GDPR, CCPA, and emerging regulations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10" style={{ color: '#5A1568' }} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-mono">
              Privacy Policy
            </h1>
          </div>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-6 font-sans">
            Your privacy matters. Learn how we collect, use, and protect your personal information.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 px-4 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-sans">Our Privacy Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickFacts.map((fact, index) => {
              const IconComponent = fact.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#F3E8FF' }}>
                    <IconComponent className="w-8 h-8" style={{ color: '#5A1568' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">{fact.title}</h3>
                  <p className="text-xs text-gray-600">{fact.description}</p>
                </div>
              );
            })}
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
                  className="text-sm hover:underline flex items-center gap-2"
                  style={{ color: '#5A1568' }}
                >
                  {section.icon && <section.icon className="w-4 h-4" />}
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  {section.icon && <section.icon className="w-6 h-6" style={{ color: '#5A1568' }} />}
                  <h2 className="text-2xl font-bold text-gray-900 font-sans">
                    {section.title}
                  </h2>
                </div>
                {section.content && (
                  <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                    {section.content}
                  </p>
                )}
                {section.items && (
                  <ul className="space-y-3 mb-4">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#5A1568' }} />
                        <span className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                )}
                {section.note && (
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
                    <p className="text-sm text-amber-900">
                      <strong>Important:</strong> {section.note}
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
                        {subsection.content && (
                          <p className="text-gray-700 leading-relaxed mb-3">
                            {subsection.content}
                          </p>
                        )}
                        {subsection.items && (
                          <ul className="space-y-2">
                            {subsection.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2">
                                <span className="text-gray-400 mt-1.5">•</span>
                                <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Have Privacy Questions?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're committed to transparency. Contact our Data Protection Officer for any privacy-related inquiries.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:privacy@knacksters.com"
                className="px-6 py-3 rounded-lg font-bold transition-all text-white"
                style={{ backgroundColor: '#5A1568' }}
              >
                Contact Privacy Team
              </a>
              <Link
                href="/signup"
                className="px-6 py-3 rounded-lg font-bold transition-all bg-white border-2 hover:bg-gray-50"
                style={{ borderColor: '#5A1568', color: '#5A1568' }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
