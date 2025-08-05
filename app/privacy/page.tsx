"use client";

import { ArrowLeft, Zap, Shield, Eye, Database, Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0000ff]">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/register" className="flex items-center space-x-3 group">
            <ArrowLeft className="h-6 w-6 text-white group-hover:text-lime-300 transition-colors" />
            <span className="text-white hover:text-lime-300 transition-colors font-bold uppercase">Back to Registration</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-lime-400 rounded-2xl flex items-center justify-center">
              <Zap className="h-5 w-5 sm:h-7 sm:w-7 text-black font-bold" />
            </div>
            <span className="text-xl sm:text-2xl md:text-4xl font-black text-white uppercase tracking-tight">HYPERTHON</span>
          </div>
        </div>
      </nav>

      {/* Privacy Content */}
      <section className="container mx-auto px-4 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12">
            <div className="text-center mb-8">
              <div className="inline-block bg-lime-400 text-black px-6 py-2 rounded-full font-black text-sm uppercase tracking-wide mb-6">
                <Shield className="inline mr-2 h-4 w-4" />
                PRIVACY PROTECTION
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-4 leading-tight tracking-tight uppercase">
                PRIVACY POLICY
              </h1>
              
              <p className="text-lg text-black/80 mb-6 font-bold">
                Hyperthon 2025 - Your Data Protection Rights
              </p>
              
              <p className="text-sm text-black/60 font-semibold">
                Last Updated: January 2025
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="space-y-8">
                
                {/* Section 1 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase flex items-center">
                    <Eye className="mr-3 h-6 w-6" />
                    1. Information We Collect
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>We collect the following information when you register for Hyperthon 2025:</p>
                    <p><strong>Personal Information:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Full name (first and last)</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Telegram handle (optional)</li>
                      <li>City of participation</li>
                    </ul>
                    <p><strong>Professional Information:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Programming experience level</li>
                      <li>Preferred programming languages</li>
                      <li>GitHub profile URL (mandatory)</li>
                      <li>LinkedIn profile URL (optional)</li>
                    </ul>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase flex items-center">
                    <Database className="mr-3 h-6 w-6" />
                    2. How We Use Your Information
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>Your information is used for the following purposes:</p>
                    <p><strong>Event Management:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Processing your registration</li>
                      <li>Organizing participants by city and skill level</li>
                      <li>Managing competition logistics</li>
                      <li>Verifying participant eligibility</li>
                    </ul>
                    <p><strong>Communication:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Sending event updates and notifications</li>
                      <li>Sharing important announcements</li>
                      <li>Providing competition results</li>
                      <li>Emergency communications if necessary</li>
                    </ul>
                    <p><strong>Optional Marketing (with consent):</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Information about future Hyperthon events</li>
                      <li>Partnership opportunities</li>
                      <li>Programming-related content and resources</li>
                    </ul>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase flex items-center">
                    <Lock className="mr-3 h-6 w-6" />
                    3. Data Protection and Security
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>We implement appropriate security measures to protect your personal information:</p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Secure encrypted storage using industry-standard protocols</li>
                      <li>Access control - only authorized personnel can access participant data</li>
                      <li>Regular security audits and updates</li>
                      <li>Secure transmission of data using HTTPS encryption</li>
                      <li>Data backup and recovery procedures</li>
                    </ul>
                    <p className="font-black text-[#0000ff]">
                      We never sell, rent, or share your personal information with third parties for marketing purposes.
                    </p>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase">
                    4. Information Sharing
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>We may share your information only in the following circumstances:</p>
                    <p><strong>Public Information:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>First name and city for competition leaderboards</li>
                      <li>Winner names and achievements for recognition</li>
                      <li>GitHub profiles for verification purposes (as provided by you)</li>
                    </ul>
                    <p><strong>Service Providers:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Email service providers for event communications</li>
                      <li>Database hosting services with strict privacy agreements</li>
                      <li>Payment processors (if applicable for future paid events)</li>
                    </ul>
                    <p><strong>Legal Requirements:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>If required by law or legal process</li>
                      <li>To protect the rights and safety of participants</li>
                    </ul>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase">
                    5. Your Rights and Choices
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>You have the following rights regarding your personal information:</p>
                    <p><strong>Access and Control:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Request a copy of your personal data</li>
                      <li>Update or correct your information</li>
                      <li>Delete your account and associated data</li>
                      <li>Opt out of marketing communications at any time</li>
                    </ul>
                    <p><strong>Communication Preferences:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Choose which types of communications you receive</li>
                      <li>Unsubscribe from non-essential emails</li>
                      <li>Update your contact preferences</li>
                    </ul>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase">
                    6. Cookies and Tracking
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>Our website uses minimal tracking technologies:</p>
                    <p><strong>Essential Cookies:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Session management for form completion</li>
                      <li>Security tokens to prevent fraud</li>
                      <li>User preferences for better experience</li>
                    </ul>
                    <p><strong>Analytics (Optional):</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Anonymous usage statistics to improve our website</li>
                      <li>Performance monitoring for better user experience</li>
                      <li>You can opt out of analytics tracking</li>
                    </ul>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase">
                    7. Data Retention
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>We retain your information for the following periods:</p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li><strong>Active participants:</strong> Until you request deletion or opt out</li>
                      <li><strong>Competition data:</strong> 2 years for historical records and analytics</li>
                      <li><strong>Marketing data:</strong> Until you unsubscribe or request removal</li>
                      <li><strong>Legal compliance:</strong> As required by applicable laws</li>
                    </ul>
                    <p className="font-black text-[#0000ff]">
                      You can request immediate deletion of your data at any time.
                    </p>
                  </div>
                </div>

                {/* Section 8 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase">
                    8. International Data Transfers
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>Your data is primarily stored and processed in India. If international transfers are necessary:</p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>We ensure adequate protection through standard contractual clauses</li>
                      <li>We use services with equivalent privacy protections</li>
                      <li>We inform you of any significant changes to data location</li>
                    </ul>
                  </div>
                </div>

                {/* Section 9 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase">
                    9. Children's Privacy
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>Hyperthon is designed for participants aged 16 and above. For participants under 18:</p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Parental consent may be required</li>
                      <li>Special protections apply to data collection and use</li>
                      <li>Parents can request access to or deletion of their child's data</li>
                    </ul>
                  </div>
                </div>

                {/* Section 10 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase flex items-center">
                    <Mail className="mr-3 h-6 w-6" />
                    10. Contact Us
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>For any privacy-related questions, concerns, or requests:</p>
                    <div className="bg-white rounded-lg p-4 border-2 border-[#0000ff]">
                      <p><strong>Email:</strong> <a href="mailto:support@hyperthon.org" className="text-[#0000ff] font-black underline">support@hyperthon.org</a></p>
                      <p><strong>Subject Line:</strong> "Privacy Policy Inquiry - [Your Name]"</p>
                      <p><strong>Response Time:</strong> Within 72 hours for all privacy requests</p>
                    </div>
                    <p className="text-sm">
                      We are committed to addressing your privacy concerns promptly and transparently.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="text-center mt-12 pt-8 border-t-2 border-gray-200">
              <Link 
                href="/register"
                className="bg-[#0000ff] text-white px-8 py-4 rounded-full font-black text-lg uppercase tracking-wide hover:bg-[#0000cc] transition-colors inline-flex items-center"
              >
                <ArrowLeft className="mr-3 h-5 w-5" />
                Back to Registration
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-lime-400 rounded-2xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-black font-bold" />
              </div>
              <span className="text-xl font-black text-white uppercase">HYPERTHON</span>
            </div>
            
            <div className="text-white/80 text-center md:text-right font-semibold">
              <p className="text-base">&copy; 2025 Hyperthon.org. All rights reserved.</p>
              <p className="text-sm mt-1">
                The ultimate speed coding competition.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 