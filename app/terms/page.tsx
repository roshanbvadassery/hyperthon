"use client";

import { ArrowLeft, Zap, FileText, Shield, Users, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function TermsAndConditions() {
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

      {/* Terms Content */}
      <section className="container mx-auto px-4 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12">
            <div className="text-center mb-8">
              <div className="inline-block bg-lime-400 text-black px-6 py-2 rounded-full font-black text-sm uppercase tracking-wide mb-6">
                <FileText className="inline mr-2 h-4 w-4" />
                LEGAL DOCUMENT
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-4 leading-tight tracking-tight uppercase">
                TERMS & CONDITIONS
              </h1>
              
              <p className="text-lg text-black/80 mb-6 font-bold">
                Hyperthon 2025 - Speed Coding Competition
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
                    <Users className="mr-3 h-6 w-6" />
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-black/80 font-semibold mb-4">
                    By registering for Hyperthon 2025, you agree to be bound by these Terms and Conditions. 
                    If you do not agree to these terms, please do not register for the event.
                  </p>
                </div>

                {/* Section 2 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase flex items-center">
                    <FileText className="mr-3 h-6 w-6" />
                    2. Event Overview
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>Hyperthon 2025 is a nationwide speed coding competition touring multiple cities across India.</p>
                    <p><strong>Event Features:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Competitive programming challenges</li>
                      <li>Time-bound coding exercises</li>
                      <li>Individual and team competitions</li>
                      <li>Prizes and recognition for winners</li>
                    </ul>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase flex items-center">
                    <Shield className="mr-3 h-6 w-6" />
                    3. Participant Eligibility
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p><strong>To participate in Hyperthon 2025, you must:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Be at least 16 years of age</li>
                      <li>Have basic programming knowledge</li>
                      <li>Provide accurate registration information</li>
                      <li>Have a valid GitHub profile demonstrating coding activity</li>
                      <li>Agree to follow the code of conduct</li>
                    </ul>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase">
                    4. Registration and Fees
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>Registration for Hyperthon 2025 is currently free for all participants.</p>
                    <p><strong>Registration Requirements:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Complete and accurate personal information</li>
                      <li>Valid email address and phone number</li>
                      <li>Active GitHub profile URL (mandatory)</li>
                      <li>Programming experience level declaration</li>
                    </ul>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase">
                    5. Competition Rules
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p><strong>During the competition:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>All code must be written by the participant</li>
                      <li>No external assistance or collaboration allowed</li>
                      <li>Standard libraries and documentation may be used</li>
                      <li>Plagiarism will result in immediate disqualification</li>
                      <li>Judges' decisions are final</li>
                    </ul>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase flex items-center">
                    <AlertCircle className="mr-3 h-6 w-6" />
                    6. Code of Conduct
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>All participants must:</p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Treat all participants, organizers, and volunteers with respect</li>
                      <li>Maintain a professional and inclusive environment</li>
                      <li>Report any inappropriate behavior to organizers</li>
                      <li>Follow venue rules and guidelines</li>
                    </ul>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase">
                    7. Intellectual Property
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>Participants retain ownership of their code submissions. However, by participating:</p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>You grant Hyperthon the right to use your code for evaluation</li>
                      <li>Solutions may be discussed in post-event analysis</li>
                      <li>Hyperthon may showcase winning solutions with attribution</li>
                    </ul>
                  </div>
                </div>

                {/* Section 8 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase">
                    8. Liability and Disclaimers
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>Hyperthon and its organizers:</p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Are not liable for any personal injury or property damage</li>
                      <li>Do not guarantee internet connectivity or equipment availability</li>
                      <li>Reserve the right to modify or cancel events due to unforeseen circumstances</li>
                      <li>Are not responsible for travel or accommodation arrangements</li>
                    </ul>
                  </div>
                </div>

                {/* Section 9 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase">
                    9. Privacy and Data Usage
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>Your personal information will be used in accordance with our Privacy Policy:</p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Registration data for event management</li>
                      <li>Contact information for event updates</li>
                      <li>Performance data for ranking and results</li>
                      <li>Optional marketing communications (with consent)</li>
                    </ul>
                  </div>
                </div>

                {/* Section 10 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-black text-black mb-4 uppercase">
                    10. Modifications and Contact
                  </h2>
                  <div className="text-black/80 font-semibold space-y-3">
                    <p>Hyperthon reserves the right to modify these terms at any time. Continued participation constitutes acceptance of updated terms.</p>
                    <p><strong>Contact Information:</strong></p>
                    <p>For questions about these terms, contact: <a href="mailto:support@hyperthon.org" className="text-[#0000ff] font-black underline">support@hyperthon.org</a></p>
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