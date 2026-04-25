// app/(content)/contact/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { Card } from '@/components/runes/Card';
import ContactForm from '@/components/archive/iris/contact/ContactForm';
import { Mail, Clock, Shield, Sparkles, Heart, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Sovereign Sanctuary',
  description: 'Get in touch with the sanctuary stewards',
};

export default function ContactPage() {
  return (
    <Page 
      variant={1}
      environment="contact"
      showForeground={false}
      animated={true}   
      showContinuityBeam={true}
    >  
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-700" />
          
          <div className="relative z-10 container max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <MessageSquare size={14} className="text-cyan-400" />
              <span className="text-sm text-white/80">Reach Out</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Contact the Sanctuary
            </h1>
            
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Questions? Feedback? We're here to help.
              <br />
              Every message is received by real humans who care.
            </p>
          </div>
        </section>

        <div className="container max-w-6xl mx-auto px-6 pb-20">
          
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Contact Info */}
            <div className="space-y-6">
              {/* Email Card */}
              <Card className="p-6 text-center hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="text-cyan-400" size={24} />
                </div>
                <h3 className="text-white font-bold mb-2">Email</h3>
                <a 
                  href="mailto:support@audhdities.com" 
                  className="text-sm text-cyan-400 hover:underline break-all"
                >
                  support@audhdities.com
                </a>
                <p className="text-xs text-white/40 mt-3">We reply within 48 hours</p>
              </Card>

              {/* Response Time Card */}
              <Card className="p-6 text-center hover:border-purple-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="text-purple-400" size={24} />
                </div>
                <h3 className="text-white font-bold mb-2">Response Time</h3>
                <p className="text-sm text-white/60">Usually within 24-48 hours</p>
                <p className="text-xs text-white/40 mt-2">Weekdays: 9am-5pm CST</p>
              </Card>

              {/* Privacy Card */}
              <Card className="p-6 text-center hover:border-green-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="text-green-400" size={24} />
                </div>
                <h3 className="text-white font-bold mb-2">Privacy</h3>
                <p className="text-sm text-white/60">Your information is never shared</p>
                <Link
                  href="/privacy"
                  className="text-xs text-cyan-400 hover:underline inline-block mt-2"
                >
                  Read our privacy policy →
                </Link>
              </Card>

              {/* Application Note */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-5 text-center">
                <Heart className="text-pink-400 mx-auto mb-2" size={20} />
                <p className="text-sm text-white/70">
                  <span className="text-cyan-400 font-bold">For creator/vendor applications:</span>
                  <br />
                  Please use the dedicated application forms in your dashboard for faster processing.
                </p>
              </div>

              {/* Alternative Contact */}
              <div className="text-center">
                <p className="text-xs text-white/30">
                  Or reach us directly at{' '}
                  <a 
                    href="mailto:support@audhdities.com" 
                    className="text-cyan-400 hover:underline"
                  >
                    support@audhdities.com
                  </a>
                </p>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="text-cyan-400" size={20} />
                  <h2 className="text-2xl font-bold text-white">Send us a message</h2>
                </div>
                <ContactForm />
              </Card>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}