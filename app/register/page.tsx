"use client";

import { useState } from "react";
import { ArrowLeft, Zap, MapPin, Calendar, User, Mail, Phone, Code, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    telegram: "",
    city: "",
    experience: "",
    github: "",
    linkedin: "",
    preferredLanguages: [] as string[],
    agreedToTerms: false,
    agreedToMarketing: false
  });

  const cities = [
    { name: "Bangalore", date: "10th August 2025", venue: "Zo House", available: true },
    { name: "Goa", date: "16th August 2025", venue: "Stay Vista", available: true },
    { name: "Mumbai", date: "17th August 2025", venue: "TBD", available: false },
    { name: "Pune", date: "23rd August 2025", venue: "TBD", available: false },
    { name: "Ahmedabad", date: "24th August 2025", venue: "TBD", available: false },
    { name: "Delhi / Gurgaon", date: "30th August 2025", venue: "TBD", available: false },
    { name: "Jaipur", date: "31st August 2025", venue: "Jaipur University", available: true },
    { name: "Kochi", date: "6th Sept 2025", venue: "TBD", available: false },
    { name: "Hyderabad", date: "Coming Soon", venue: "TBD", available: false }
  ];

  const programmingLanguages = [
    "JavaScript", "Python", "Java", "C++", "TypeScript", "Go", "Rust", 
    "C#", "PHP", "Ruby", "Swift", "Kotlin", "Dart", "Solidity"
  ];

  const experienceLevels = [
    "Beginner (0-1 years)",
    "Intermediate (1-3 years)", 
    "Advanced (3-5 years)",
    "Expert (5+ years)"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      preferredLanguages: prev.preferredLanguages.includes(language)
        ? prev.preferredLanguages.filter(l => l !== language)
        : [...prev.preferredLanguages, language]
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage({
          type: 'success',
          text: `🎉 Registration successful! Welcome to Hyperthon ${result.data.city}, ${result.data.name}!`
        });
        // Reset form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          telegram: "",
          city: "",
          experience: "",
          github: "",
          linkedin: "",
          preferredLanguages: [],
          agreedToTerms: false,
          agreedToMarketing: false
        });
      } else {
        setSubmitMessage({
          type: 'error',
          text: result.error || 'Registration failed. Please try again.'
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0000ff]">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <ArrowLeft className="h-6 w-6 text-white group-hover:text-lime-300 transition-colors" />
            <span className="text-white hover:text-lime-300 transition-colors font-bold uppercase">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-lime-400 rounded-2xl flex items-center justify-center">
              <Zap className="h-5 w-5 sm:h-7 sm:w-7 text-black font-bold" />
            </div>
            <span className="text-xl sm:text-2xl md:text-4xl font-black text-white uppercase tracking-tight">HYPERTHON</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 mb-8">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <div className="inline-block bg-lime-400 text-black px-4 sm:px-6 py-2 rounded-full font-black text-xs sm:text-sm uppercase tracking-wide mb-4 sm:mb-6">
                🚀 REGISTRATION OPEN
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-black mb-4 sm:mb-6 leading-tight sm:leading-none tracking-tight uppercase">
                REGISTER FOR<br />HYPERTHON 2025
              </h1>
              
              <p className="text-sm sm:text-lg md:text-xl text-black/80 mb-6 sm:mb-8 leading-relaxed font-bold max-w-2xl mx-auto px-4 sm:px-0">
                Join India's ultimate <span className="text-[#0000ff] font-black">SPEED CODING</span> competition. 
                Register for your city and compete with the best.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-[1.5rem] p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-black mb-4 sm:mb-6 uppercase flex items-center">
                  <User className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                  Personal Information
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-black font-bold mb-2 uppercase text-xs sm:text-sm">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-[#0000ff] focus:outline-none font-semibold"
                        placeholder="Enter your first name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-black font-bold mb-2 uppercase text-xs sm:text-sm">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-[#0000ff] focus:outline-none font-semibold"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-black font-bold mb-2 uppercase text-xs sm:text-sm">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-[#0000ff] focus:outline-none font-semibold"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-black font-bold mb-2 uppercase text-xs sm:text-sm">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-[#0000ff] focus:outline-none font-semibold"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-black font-bold mb-2 uppercase text-xs sm:text-sm">Telegram Handle</label>
                      <input
                        type="text"
                        name="telegram"
                        value={formData.telegram}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-[#0000ff] focus:outline-none font-semibold"
                        placeholder="@yourusername"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* City Selection */}
              <div className="bg-gray-50 rounded-[1.5rem] p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-black mb-4 sm:mb-6 uppercase flex items-center">
                  <MapPin className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                  Choose Your City
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {cities.map((city, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        if (city.available) {
                          setFormData(prev => ({ ...prev, city: city.name }));
                        }
                      }}
                      disabled={!city.available}
                      className={`relative text-left p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all ${
                        formData.city === city.name
                          ? 'border-[#0000ff] bg-[#0000ff] text-white'
                          : 'border-gray-200 bg-white hover:border-[#0000ff]'
                      } ${!city.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-black text-sm sm:text-lg uppercase">{city.name}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-black uppercase ${
                          city.available 
                            ? (formData.city === city.name ? 'bg-lime-400 text-black' : 'bg-lime-400 text-black')
                            : 'bg-gray-400 text-white'
                        }`}>
                          {city.available ? 'Open' : 'Soon'}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center text-xs sm:text-sm font-semibold">
                          <Calendar className="mr-1 sm:mr-2 h-3 w-3" />
                          {city.date}
                        </div>
                        <div className="flex items-center text-xs sm:text-sm font-semibold">
                          <MapPin className="mr-1 sm:mr-2 h-3 w-3" />
                          {city.venue}
                        </div>
                      </div>
                      {formData.city === city.name && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center">
                          <span className="text-black font-black text-sm">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Hidden input for form validation */}
                <input
                  type="hidden"
                  name="city"
                  value={formData.city}
                  required
                />
              </div>

              {/* Technical Information */}
              <div className="bg-gray-50 rounded-[1.5rem] p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-black mb-4 sm:mb-6 uppercase flex items-center">
                  <Code className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                  Technical Background
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-black font-bold mb-2 uppercase text-xs sm:text-sm">Experience Level *</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-[#0000ff] focus:outline-none font-semibold appearance-none bg-white"
                    >
                      <option value="">Select your experience level</option>
                      {experienceLevels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-black font-bold mb-2 uppercase text-xs sm:text-sm">Preferred Programming Languages</label>
                    <p className="text-black/70 text-xs sm:text-sm mb-3 sm:mb-4 font-semibold">
                      Select all languages you're comfortable with {formData.preferredLanguages.length > 0 && (
                        <span className="text-[#0000ff] font-black">({formData.preferredLanguages.length} selected)</span>
                      )}:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                      {programmingLanguages.map((language) => (
                        <button
                          key={language}
                          type="button"
                          onClick={() => handleLanguageToggle(language)}
                          className={`px-2 sm:px-3 py-2 rounded-lg font-bold text-xs sm:text-sm uppercase transition-all transform ${
                            formData.preferredLanguages.includes(language)
                              ? 'bg-[#0000ff] text-white border-2 border-[#0000ff] scale-95 shadow-lg'
                              : 'bg-white text-black border-2 border-gray-200 hover:border-[#0000ff] hover:scale-105'
                          }`}
                        >
                          {formData.preferredLanguages.includes(language) && '✓ '}{language}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-black font-bold mb-2 uppercase text-xs sm:text-sm">GitHub Profile *</label>
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-[#0000ff] focus:outline-none font-semibold"
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-black font-bold mb-2 uppercase text-xs sm:text-sm">LinkedIn Profile</label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-[#0000ff] focus:outline-none font-semibold"
                        placeholder="https://linkedin.com/in/yourusername"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-50 rounded-[1.5rem] p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-5 h-5 text-[#0000ff] bg-white border-2 border-gray-300 rounded focus:ring-[#0000ff] focus:ring-2"
                    />
                    <label htmlFor="terms" className="text-black font-semibold text-sm">
                      I agree to the <Link href="/terms" className="text-[#0000ff] font-black underline hover:text-[#0000cc] transition-colors">Terms and Conditions</Link> and 
                      <Link href="/privacy" className="text-[#0000ff] font-black underline hover:text-[#0000cc] transition-colors"> Privacy Policy</Link> of Hyperthon 2025. *
                    </label>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="marketing"
                      name="agreedToMarketing"
                      checked={formData.agreedToMarketing}
                      onChange={handleInputChange}
                      className="mt-1 w-5 h-5 text-[#0000ff] bg-white border-2 border-gray-300 rounded focus:ring-[#0000ff] focus:ring-2"
                    />
                    <label htmlFor="marketing" className="text-black font-semibold text-sm">
                      I agree to receive updates, event notifications, and promotional content from Hyperthon.
                    </label>
                  </div>
                </div>
              </div>

              {/* Success/Error Messages */}
              {submitMessage && (
                <div className={`p-4 sm:p-6 rounded-xl border-2 text-center font-bold ${
                  submitMessage.type === 'success' 
                    ? 'bg-green-50 border-green-500 text-green-800'
                    : 'bg-red-50 border-red-500 text-red-800'
                }`}>
                  <p className="text-sm sm:text-base">{submitMessage.text}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.agreedToTerms || !formData.city || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.experience || !formData.github}
                  className="bg-[#0000ff] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-black text-lg sm:text-xl uppercase tracking-wide cursor-pointer hover:bg-[#0000cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      SUBMITTING...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                      REGISTER NOW
                    </>
                  )}
                </button>
                
                <p className="text-black/60 font-semibold text-sm mt-4">
                  {isSubmitting 
                    ? "Please wait while we process your registration..."
                    : "Registration confirmation will be sent to your email"
                  }
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4 mb-4 md:mb-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-lime-400 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-black font-bold" />
              </div>
              <span className="text-lg sm:text-xl font-black text-white uppercase">HYPERTHON</span>
            </div>
            
            <div className="text-white/80 text-center md:text-right font-semibold">
              <p className="text-sm sm:text-base">&copy; 2025 Hyperthon.org. All rights reserved.</p>
              <p className="text-xs sm:text-sm mt-1">
                Sponsored by <span className="text-lime-400 font-black">Base</span> • 
                The ultimate speed coding competition.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 