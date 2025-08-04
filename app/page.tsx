import { Calendar, MapPin, Trophy, Zap, Users, Play, Layers, Menu } from "lucide-react";
import RegisterMovingBanner from "./components/RegisterMovingBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0000ff]">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-lime-400 rounded-2xl flex items-center justify-center">
                <Zap className="h-5 w-5 sm:h-7 sm:w-7 text-black font-bold" />
              </div>
              <span className="text-xl sm:text-2xl md:text-4xl font-black text-white uppercase tracking-tight">HYPERTHON</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-white hover:text-lime-300 transition-colors font-bold uppercase">About</a>
            <a href="#tour" className="text-white hover:text-lime-300 transition-colors font-bold uppercase">Tour</a>
            <a href="#register" className="text-white hover:text-lime-300 transition-colors font-bold uppercase">Register</a>
            <div className="bg-lime-400 text-black px-6 py-3 rounded-full font-black text-sm uppercase tracking-wide cursor-pointer hover:bg-lime-300 transition-colors">
              WATCH LIVE
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Menu className="h-6 w-6 text-white" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 mb-8 relative overflow-hidden">
            {/* Large bold title */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-block bg-lime-400 text-black px-3 py-1 sm:px-6 sm:py-2 rounded-full font-black text-xs sm:text-sm uppercase tracking-wide mb-4 sm:mb-6">
                🚀 INDIA TOUR 2025 • AUGUST-SEPTEMBER
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-black mb-4 sm:mb-8 leading-none tracking-tight uppercase">
                <div>THE ULTIMATE</div>
                <div>SPEED CODING</div>
                <div>COMPETITION</div>
              </h1>
              
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-black/80 mb-6 sm:mb-8 leading-relaxed font-bold max-w-3xl mx-auto">
                The fastest <span className="text-[#0000ff] font-black">SPEED CODING</span> competition touring India. 
                Code under pressure. Compete with legends. 
                <span className="text-[#0000ff] font-black">Become the champion.</span>
              </p>
            </div>

            <RegisterMovingBanner />

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
              <div className="bg-[#0000ff] text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-black text-sm sm:text-lg uppercase tracking-wide cursor-pointer hover:bg-[#0000cc] transition-colors flex items-center justify-center">
                <Zap className="mr-2 h-4 w-4 sm:h-6 sm:w-6" />
                REGISTER NOW
              </div>
              <a
                href="https://youtu.be/pA76_X43RdM"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-black text-sm sm:text-lg uppercase tracking-wide cursor-pointer hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                <Play className="mr-2 h-4 w-4 sm:h-6 sm:w-6" />
                WATCH HIGHLIGHTS
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <div className="bg-[#0000ff] text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1 sm:gap-2">
                <MapPin className="h-3 w-3 sm:h-5 sm:w-5" />
                9 CITIES
              </div>
              <div className="bg-[#0000ff] text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1 sm:gap-2">
                <Trophy className="h-3 w-3 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">NATIONAL</span> CHAMPIONSHIP
              </div>
              <div className="bg-[#0000ff] text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1 sm:gap-2">
                <Users className="h-3 w-3 sm:h-5 sm:w-5" />
                LIVE STREAMED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Base Partnership Banner */}
      <section className="container mx-auto px-4 mb-6 sm:mb-8">
        <div className="bg-white rounded-[1rem] sm:rounded-[2rem] p-4 sm:p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-black font-bold uppercase tracking-wider text-xs sm:text-sm">POWERED BY</span>
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-black text-blue-600">base</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 uppercase tracking-tight">
              SPEED CODING<br />REVOLUTION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#0000ff] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-black mb-3 sm:mb-4 uppercase">Speed Coding</h3>
              <p className="text-black/70 font-semibold leading-relaxed text-sm sm:text-base">
                Lightning-fast programming under pressure. Test your skills, speed, and problem-solving abilities.
              </p>
            </div>

            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-lime-400 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-black mb-3 sm:mb-4 uppercase">Live Competition</h3>
              <p className="text-black/70 font-semibold leading-relaxed text-sm sm:text-base">
                Real-time coding battles. Live audiences. Streaming worldwide. This is coding as entertainment.
              </p>
            </div>

            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Layers className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-black mb-3 sm:mb-4 uppercase">Mini Apps on Base</h3>
              <p className="text-black/70 font-semibold leading-relaxed text-sm sm:text-base">
                Speed build mini apps on Base blockchain. Fast, efficient, and deployed on the Base App.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 uppercase tracking-tight">
              INDIA TOUR 2025
            </h2>
            <p className="text-lg sm:text-xl text-white/80 font-bold">
              9 cities, 1 epic journey. August to September 2025.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { 
                city: "Bangalore", 
                date: "10th August 2025", 
                venue: "Zo House", 
                status: "upcoming"
              },
              { 
                city: "Goa", 
                date: "16th August 2025", 
                venue: "Stay Vista", 
                status: "upcoming"
              },
              { 
                city: "Mumbai", 
                date: "17th August 2025", 
                venue: "TBD", 
                status: "planned"
              },
              { 
                city: "Pune", 
                date: "23rd August 2025", 
                venue: "TBD", 
                status: "planned"
              },
              { 
                city: "Ahmedabad", 
                date: "24th August 2025", 
                venue: "TBD", 
                status: "planned"
              },
              { 
                city: "Delhi / Gurgaon", 
                date: "30th August 2025", 
                venue: "TBD", 
                status: "planned"
              },
              { 
                city: "Jaipur", 
                date: "31st August 2025", 
                venue: "Jaipur University", 
                status: "upcoming"
              },
              { 
                city: "Kochi", 
                date: "6th Sept 2025", 
                venue: "TBD", 
                status: "planned"
              },
              { 
                city: "Hyderabad", 
                date: "Coming Soon", 
                venue: "TBD", 
                status: "planned"
              },
            ].map((event, index) => (
              <div key={index} className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-2xl font-black text-black uppercase">{event.city}</h3>
                  <div className={`${event.status === 'upcoming' 
                    ? 'bg-lime-400 text-black' 
                    : 'bg-gray-400 text-white'} px-2 sm:px-3 py-1 rounded-full font-black text-xs uppercase`}>
                    {event.status}
                  </div>
                </div>
                
                <div className="space-y-2 mb-4 sm:mb-6">
                  <div className="flex items-center text-black/70 font-semibold text-sm sm:text-base">
                    <Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-black/70 font-semibold text-sm sm:text-base">
                    <MapPin className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    {event.venue}
                  </div>
                </div>
                
                <div 
                  className={`w-full py-2 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wide text-center cursor-pointer transition-colors ${
                    event.status === 'planned' 
                      ? 'bg-gray-400 text-white' 
                      : 'bg-[#0000ff] text-white hover:bg-[#0000cc]'
                  }`}
                >
                  {event.status === 'planned' ? 'COMING SOON' : `REGISTER FOR ${event.city.toUpperCase()}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 uppercase tracking-tight">
              HOW IT WORKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-lime-400 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-4xl font-black text-black">1</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 uppercase">City Competition</h3>
              <p className="text-white/80 font-semibold leading-relaxed text-sm sm:text-base">
                Speed code your way to victory in your city. Fastest coder advances to nationals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-[#4040ff] rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-4xl font-black text-white">2</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 uppercase">National Championship</h3>
              <p className="text-white/80 font-semibold leading-relaxed text-sm sm:text-base">
                City champions battle in the ultimate speed coding showdown. Live streamed globally.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-pink-400 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-4xl font-black text-white">3</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 uppercase">Coding Legend</h3>
              <p className="text-white/80 font-semibold leading-relaxed text-sm sm:text-base">
                Winner becomes India's Speed Coding Champion. Fame, recognition, and legendary status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Base Partnership */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black uppercase">What is <span className="text-blue-700 lowercase">base?</span></h2>
            </div>
            
            <p className="text-sm sm:text-lg md:text-xl text-black/80 leading-relaxed font-bold mb-6 sm:mb-8 max-w-2xl mx-auto">
              Base is a secure, low-cost, developer-friendly Ethereum L2 built to bring the next billion users onchain.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-[#0000ff] rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 text-white">
                <h4 className="font-black text-white mb-2 sm:mb-3 text-base sm:text-lg uppercase">Low-Cost</h4>
                <p className="text-white/90 font-semibold text-sm sm:text-base">Build and deploy without breaking the bank</p>
              </div>
              <div className="bg-lime-400 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 text-black">
                <h4 className="font-black text-black mb-2 sm:mb-3 text-base sm:text-lg uppercase">Developer-Friendly</h4>
                <p className="text-black/80 font-semibold text-sm sm:text-base">Easy to use tools and documentation</p>
              </div>
              <div className="bg-blue-600 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 text-white">
                <h4 className="font-black text-white mb-2 sm:mb-3 text-base sm:text-lg uppercase">Ethereum L2</h4>
                <p className="text-white/90 font-semibold text-sm sm:text-base">Built on Optimism's OP Stack</p>
              </div>
            </div>

            <a 
              href="https://base.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-black text-sm sm:text-lg uppercase tracking-wide cursor-pointer hover:bg-blue-700 transition-colors inline-block"
            >
              Learn More About Base
            </a>
          </div>
        </div>
      </section>

      {/* Register Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black mb-4 sm:mb-6 uppercase tracking-tight">Ready to Code?</h2>
            <p className="text-sm sm:text-lg md:text-xl text-black/80 mb-8 sm:mb-10 leading-relaxed font-bold max-w-2xl mx-auto">
              Think you're fast enough? Think you can code under pressure? 
              Join the revolution and prove you're the fastest coder in India.
            </p>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-[#0000ff] text-white px-6 sm:px-12 py-4 sm:py-5 rounded-full font-black text-sm sm:text-xl uppercase tracking-wide cursor-pointer hover:bg-[#0000cc] transition-colors inline-flex items-center">
                <Zap className="mr-2 sm:mr-3 h-4 w-4 sm:h-6 sm:w-6" />
                REGISTER FOR YOUR CITY
              </div>
              
              <p className="text-black/60 font-semibold text-sm sm:text-base">
                Follow us for updates, behind-the-scenes, and speed coding tips
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <a 
                  href="https://x.com/roshanonx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  TWITTER
                </a>
                <a 
                  href="https://instagram.com/roshanvadassery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  INSTAGRAM
                </a>
                <a 
                  href="https://www.youtube.com/@prmsnls"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  YOUTUBE
                </a>
              </div>
            </div>
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
