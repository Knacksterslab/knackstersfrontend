"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Clock,
  DollarSign,
  Shield,
  Users,
  Zap,
  Globe,
  FileText,
  CreditCard,
  Award,
  CheckCircle2
} from "lucide-react";
import PrimaryButton from "../svg/primary-button";

interface FAQItem {
  question: string;
  answer: string | JSX.Element;
}

interface FAQCategory {
  title: string;
  icon: React.ElementType;
  slug: string;
  faqs: FAQItem[];
}

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string>("overview");
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqCategories: FAQCategory[] = [
    {
      title: "Overview",
      icon: Globe,
      slug: "overview",
      faqs: [
        {
          question: "How does Knacksters work?",
          answer: (
            <>
              <p className="mb-3">Knacksters is a managed talent platform that provides on-demand access to vetted professionals across multiple domains. Here's how it works:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li><strong>Subscribe:</strong> Choose a plan that fits your needs (from $12,500/mo for 200 hours)</li>
                <li><strong>Meet Your Manager:</strong> Get assigned a dedicated Business Manager who understands your goals</li>
                <li><strong>Deploy Talent:</strong> We match you with expert professionals in minutes (not weeks)</li>
                <li><strong>Flexible Allocation:</strong> Spread your hours across multiple experts or focus on specific priorities</li>
                <li><strong>Managed Service:</strong> Your Business Manager handles coordination, quality control, and issue resolution</li>
              </ol>
            </>
          )
        },
        {
          question: "What makes Knacksters different from other talent platforms?",
          answer: (
            <>
              <p className="mb-3">Unlike traditional freelance marketplaces or staffing agencies, Knacksters offers:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Dedicated Management:</strong> Every client gets a Business Manager who handles coordination, vetting, and quality assurance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Deploy in Minutes:</strong> Average time from signup to expert assignment is 4-6 hours (record: 37 minutes)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Transparent Pricing:</strong> Fixed monthly subscription with clear hourly rates—no hidden fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Pre-Vetted Network:</strong> Only 8% of applicants pass our rigorous 3-step screening process</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Flexible Allocation:</strong> Use your hours however you need—spread across teams or focus on one priority</span>
                </li>
              </ul>
            </>
          )
        },
        {
          question: "How is the trial period no-risk?",
          answer: "We start each engagement with a trial period. This gives you time to ensure the expert is the right fit. If you're completely satisfied with the results, we'll bill you for the time and continue the engagement. If you're not satisfied, you won't be billed. We can then introduce you to another expert who may be a better match."
        },
        {
          question: "Is there a subscription fee?",
          answer: "Yes. Our pricing is simple and transparent. Plans start at $12,500/month for 200 hours (that's $62.50/hour). This includes access to our platform, a dedicated Business Manager, and our entire network of 9,999+ vetted professionals. Unused hours don't roll over, but you can scale up or down monthly."
        }
      ]
    },
    {
      title: "Talent & Quality",
      icon: Award,
      slug: "talent",
      faqs: [
        {
          question: "How do you vet your professionals?",
          answer: (
            <>
              <p className="mb-3">We have a rigorous 3-step screening process:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li><strong>Portfolio Review:</strong> We evaluate past work, client testimonials, and professional experience</li>
                <li><strong>Skills Assessment:</strong> Domain-specific tests and live problem-solving challenges</li>
                <li><strong>Background Check:</strong> Professional verification and reference checks</li>
              </ol>
              <p className="mt-3">Only 8% of applicants pass all three stages. This ensures you work with top-tier talent who can deliver results immediately.</p>
            </>
          )
        },
        {
          question: "What if I'm not satisfied with the professional assigned to me?",
          answer: "We allow clients to work with up to three professionals per position during the trial period before deciding. While we rigorously screen all applicants, we understand that fit matters. Your Business Manager will work closely with you to find the right match, and you won't be billed unless you're satisfied."
        },
        {
          question: "Where are your professionals located?",
          answer: "Our network spans over 50 countries, with most professionals located in North America, Europe, Latin America, and Asia. All experts speak fluent English and work in time zones compatible with western business hours. Many work remotely, but we can also facilitate on-site arrangements if needed."
        },
        {
          question: "Can I request specific expertise or certifications?",
          answer: "Absolutely. Your Business Manager will work with you to understand your exact requirements—whether you need specific certifications (e.g., AWS Certified Solutions Architect, PMP, CPA), industry experience (e.g., healthcare, fintech), or niche skills (e.g., Kubernetes, GDPR compliance). We match you with professionals who meet your precise needs."
        }
      ]
    },
    {
      title: "Pricing & Billing",
      icon: DollarSign,
      slug: "pricing",
      faqs: [
        {
          question: "What are your pricing plans?",
          answer: (
            <>
              <p className="mb-3">We offer three transparent pricing tiers:</p>
              <ul className="space-y-3">
                <li className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-1">Starter - $12,500/month</div>
                  <div className="text-sm text-gray-600">200 hours/month • Effective rate: $62.50/hour</div>
                </li>
                <li className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-1">Growth - $25,000/month</div>
                  <div className="text-sm text-gray-600">450 hours/month • Effective rate: $55.56/hour</div>
                </li>
                <li className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-1">Enterprise - Custom</div>
                  <div className="text-sm text-gray-600">Custom hours & pricing • Priority support</div>
                </li>
              </ul>
              <p className="mt-3 text-sm">Overage rate: $100/hour. All plans include a dedicated Business Manager and access to our full network.</p>
            </>
          )
        },
        {
          question: "How does billing work?",
          answer: "We bill twice monthly with Net 10 terms, giving you time to review charges before processing. Your dedicated Business Manager tracks all hours and provides detailed invoices showing which professionals worked on what tasks. Everything is transparent and easy to audit."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, Amex), ACH bank transfers, wire transfers, and PayPal. For Enterprise plans, we can also accommodate purchase orders and custom invoicing arrangements."
        },
        {
          question: "Can I change my plan or cancel at any time?",
          answer: "Yes. You can upgrade, downgrade, or cancel your subscription at any time. Plan changes take effect at the start of the next billing cycle. If you cancel, there are no termination fees, though we do not prorate or refund unused hours from the current billing period."
        },
        {
          question: "Do unused hours roll over?",
          answer: "No, unused hours do not roll over to the next month. However, your Business Manager will help you maximize your monthly allocation by planning projects strategically and spreading work across your team as needed."
        }
      ]
    },
    {
      title: "Getting Started",
      icon: Zap,
      slug: "getting-started",
      faqs: [
        {
          question: "How quickly can I start working with talent?",
          answer: "Most clients are matched with their first professional within 4-6 hours of signup. Our record is 37 minutes from signup to expert assignment. Once you subscribe and meet with your Business Manager, we immediately begin sourcing talent from our pre-vetted network of 9,999+ professionals."
        },
        {
          question: "What happens after I sign up?",
          answer: (
            <>
              <p className="mb-3">Here's what to expect:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li><strong>Immediate Access:</strong> You'll get instant access to your client dashboard</li>
                <li><strong>Onboarding Call (15 min):</strong> Meet your dedicated Business Manager via video call</li>
                <li><strong>Requirements Discussion:</strong> Your manager asks targeted questions to understand your needs</li>
                <li><strong>Talent Matching (Minutes):</strong> We search our network and present 2-3 top candidates</li>
                <li><strong>Trial Period Begins:</strong> Start working with your chosen professional risk-free</li>
              </ol>
            </>
          )
        },
        {
          question: "Do I need to provide project requirements upfront?",
          answer: "Not necessarily. Many clients come to us with a general sense of what they need but aren't sure about specifics. Your Business Manager is trained to ask the right questions to help you define requirements, break down projects, and identify the skills needed. We'll guide you through the process."
        },
        {
          question: "Can I scale my team up or down?",
          answer: "Absolutely. One of Knacksters' core benefits is flexibility. You can scale your team size monthly by upgrading or downgrading your plan. Within your current plan, you can also reallocate hours—for example, using multiple specialists for a few hours each, or dedicating all hours to one full-time equivalent professional."
        }
      ]
    },
    {
      title: "Working with Professionals",
      icon: Users,
      slug: "working",
      faqs: [
        {
          question: "How does the Business Manager role work?",
          answer: "Your dedicated Business Manager acts as your single point of contact. They handle talent sourcing, vetting, onboarding, quality control, issue resolution, and ongoing project coordination. Think of them as an extension of your team—they ensure everything runs smoothly so you can focus on your core business."
        },
        {
          question: "Can I work directly with the professionals, or does everything go through the Business Manager?",
          answer: "You can work directly with your assigned professionals via Slack, email, video calls, or your preferred tools. Your Business Manager is there to facilitate and oversee, not micromanage. They'll check in regularly to ensure quality and address any concerns, but day-to-day collaboration happens directly between you and your team."
        },
        {
          question: "What happens if a professional becomes unavailable?",
          answer: "While we take every measure to ensure reliability, if an expert becomes unavailable during scheduled work, Knacksters will credit back the time billed. Your Business Manager will immediately source a replacement if needed. Dependability is a top priority in our screening process."
        },
        {
          question: "Can I bring Knacksters professionals on-site?",
          answer: "Yes, depending on the professional's location and your specific needs. Most of our network works remotely, but for clients who need on-site presence, we can facilitate arrangements. Discuss your requirements with your Business Manager during onboarding."
        },
        {
          question: "Can I hire a Knacksters professional full-time for my company?",
          answer: (
            <>
              <p className="mb-3">Absolutely! We encourage clients to convert exceptional Knacksters into permanent team members when the fit is right. Here's how our contract-to-hire pathway works:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2 mb-3">
                <li><strong>Evaluate Risk-Free:</strong> Work with the expert through real projects to assess their skills, work style, and cultural fit</li>
                <li><strong>Proven Performance:</strong> By the time you're ready to hire, you already know they can deliver results</li>
                <li><strong>Streamlined Process:</strong> Your Business Manager coordinates the transition, handling paperwork and logistics</li>
                <li><strong>Transparent Fees:</strong> No hidden agency markups or surprise recruiting fees—just a simple, fair conversion process</li>
              </ol>
              <p className="text-sm">Contact your Business Manager to discuss conversion terms, timelines, and next steps. This is one of Knacksters' most popular benefits—try before you hire, with zero risk.</p>
            </>
          )
        }
      ]
    },
    {
      title: "Solutions & Services",
      icon: FileText,
      slug: "solutions",
      faqs: [
        {
          question: "What types of professionals do you offer?",
          answer: (
            <>
              <p className="mb-3">Knacksters provides experts across six core solution areas:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span><strong>AI Solutions:</strong> AI Engineers, ML Engineers, Data Scientists, NLP Specialists, AI Strategy Consultants</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span><strong>Cybersecurity:</strong> Penetration Testers, Security Engineers, GRC Analysts, SOC Analysts, CISO Consultants</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span><strong>Development & DevOps:</strong> Full-Stack Engineers, Cloud Architects, DevOps Engineers, Mobile Developers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span><strong>Design & Creative:</strong> UX/UI Designers, Brand Designers, Graphic Designers, Motion Designers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span><strong>Marketing:</strong> SEO Specialists, Content Strategists, Social Media Managers, Growth Marketers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span><strong>Healthcare & Life Sciences:</strong> Clinical Data Managers, Biostatisticians, Regulatory Affairs Specialists</span>
                </li>
              </ul>
            </>
          )
        },
        {
          question: "Can I use my hours across different solution areas?",
          answer: "Yes! Your monthly hour allocation can be spread across any combination of solution areas. For example, you could use 100 hours for development, 50 hours for design, and 50 hours for marketing—all within the same subscription. Your Business Manager will help coordinate specialists from different domains."
        },
        {
          question: "Do you offer team augmentation or entire project delivery?",
          answer: "Both. Some clients use Knacksters for team augmentation—adding specific expertise to their existing teams. Others rely on us for end-to-end project delivery, where we assemble and manage an entire team. Your Business Manager will work with you to determine the best approach for your needs."
        },
        {
          question: "Can you handle specialized or niche requirements?",
          answer: "Yes. While our six core solution areas cover most needs, our network includes specialists in niche domains like blockchain, IoT, AR/VR, fintech compliance, clinical trials, and more. If you have specialized requirements, let your Business Manager know—we'll source the right expert."
        }
      ]
    },
    {
      title: "Intellectual Property & Legal",
      icon: Shield,
      slug: "legal",
      faqs: [
        {
          question: "Who owns the intellectual property created by Knacksters professionals?",
          answer: "You do. All work created by Knacksters professionals is your property, not ours. Our contracts explicitly provide that all intellectual property rights transfer to you. Knacksters' only business is connecting you with talent—not claiming ownership of your work."
        },
        {
          question: "How is my IP protected?",
          answer: "We have agreements with every professional in our network that establish clear IP ownership and confidentiality terms. Through a clean pass-through arrangement, all IP created during your engagement transfers directly to you. If you require additional direct agreements or custom NDAs, your Business Manager can facilitate those."
        },
        {
          question: "What contracts do I need to sign?",
          answer: "You'll sign our standard Client Platform Access Agreement and Platform Subscription Terms of Service during onboarding. These outline the working relationship, IP terms, confidentiality, and service terms. The process is quick and streamlined—typically completed in minutes."
        },
        {
          question: "Can Knacksters professionals sign our company's NDA?",
          answer: "Yes. If you have specific confidentiality requirements or company NDAs, our professionals can sign them. Discuss your requirements with your Business Manager during onboarding, and we'll ensure all paperwork is handled properly."
        }
      ]
    },
    {
      title: "Support & Success",
      icon: Clock,
      slug: "support",
      faqs: [
        {
          question: "What kind of support do I get?",
          answer: "Every client gets a dedicated Business Manager who serves as your primary point of contact. You'll have their direct email and can schedule calls as needed. Additionally, you have access to our support team via the client dashboard for technical issues, billing questions, or urgent matters."
        },
        {
          question: "What happens if there's a quality issue with the work delivered?",
          answer: "Your Business Manager actively monitors quality and will address any concerns immediately. If work doesn't meet your standards, we'll have the professional revise it at no additional cost. If issues persist, we'll source a replacement and ensure you're satisfied with the outcome."
        },
        {
          question: "How do you handle time zone differences?",
          answer: "We carefully match professionals based on time zone compatibility. Most of our network works in time zones that overlap with US and European business hours. If you need real-time collaboration, let your Business Manager know during requirements discussion, and we'll prioritize candidates in compatible time zones."
        },
        {
          question: "Is there a minimum contract length?",
          answer: "No. While our billing is monthly, there's no long-term contract required. You can cancel at any time without penalties. However, most clients find ongoing value in maintaining their subscription to have on-demand access to talent as needs arise."
        }
      ]
    }
  ];

  const toggleCategory = (slug: string) => {
    setOpenCategory(openCategory === slug ? "" : slug);
    setOpenQuestion(null); // Reset open question when changing category
  };

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20 px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-mono text-gray-900">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-700 mb-8 font-sans max-w-3xl mx-auto">
              Everything you need to know about how Knacksters works, our pricing, and how we help businesses scale with expert talent.
            </p>
            <Link href="/signup" className="inline-block">
              <PrimaryButton
                width="200"
                height="56"
                wrapperClassName="primary-button-wrapper"
                gradientId="paint0_linear_faq_cta"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Categories Navigation */}
      <section className="py-8 px-4 bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {faqCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.slug}
                  onClick={() => {
                    setOpenCategory(category.slug);
                    setOpenQuestion(null);
                    document.getElementById(category.slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    openCategory === category.slug
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-sans text-sm">{category.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, catIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={category.slug} id={category.slug} className="mb-12 scroll-mt-24">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-orange-500">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500 to-red-600">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 font-mono">{category.title}</h2>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const questionId = catIndex * 100 + faqIndex;
                    const isOpen = openQuestion === questionId;

                    return (
                      <div
                        key={faqIndex}
                        className={`border border-gray-200 rounded-lg overflow-hidden transition-all ${
                          isOpen ? 'shadow-lg border-orange-300' : 'hover:border-gray-300'
                        }`}
                      >
                        {/* Question */}
                        <button
                          onClick={() => toggleQuestion(questionId)}
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-lg text-gray-900 font-sans pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-orange-500 flex-shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {/* Answer */}
                        {isOpen && (
                          <div className="px-5 pb-5 pt-2 text-gray-700 font-sans leading-relaxed border-t border-gray-100">
                            {typeof faq.answer === 'string' ? (
                              <p>{faq.answer}</p>
                            ) : (
                              faq.answer
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-300 mb-8 font-sans">
            Our team is here to help. Schedule a 15-minute consultation to discuss your specific needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="inline-block">
              <PrimaryButton
                width="200"
                height="56"
                wrapperClassName="primary-button-wrapper"
                gradientId="paint0_linear_faq_cta_bottom"
              />
            </Link>
            {/* Contact Support button removed - footer already has Support Chat via Crisp widget */}
          </div>
        </div>
      </section>
    </div>
  );
}
