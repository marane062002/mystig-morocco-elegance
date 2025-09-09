import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Plus } from 'lucide-react';
import PlanAForm from './PlanAForm'; // Assuming PlanAForm is in the same directory

const ContactSection = () => {
  const [isPlanAFormOpen, setIsPlanAFormOpen] = useState(false);

  return (
    <>
      <section id="contact" className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                Get in Touch
              </h2>
              <p className="text-xl text-muted-foreground">
                Our experts accompany you in creating your tailor-made journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div className="fade-in-up">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-8">
                  Contact Us
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary rounded-lg">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Address</h4>
                      <p className="text-muted-foreground">
                        Residence Emeraude, Building 6,<br />
                        Floor 1, Office 3<br />
                        Wlah Hlal Hssain, Sala Al Jadida<br />
                        Morocco
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary rounded-lg">
                      <Phone className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                      <p className="text-muted-foreground">
                        +212 524 123 456<br />
                        +212 661 234 567 (Mobile)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary rounded-lg">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Email</h4>
                      <p className="text-muted-foreground">
                        info@mystictravel.ma<br />
                        reservations@mystictravel.ma
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary rounded-lg">
                      <Clock className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Hours</h4>
                      <p className="text-muted-foreground">
                        Mon-Fri: 9:00 AM - 6:00 PM<br />
                        Sat: 9:00 AM - 1:00 PM<br />
                        Emergency: 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Plan A Form Section */}
              <div className="fade-in-up">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Custom Program
                    </h3>
                    <p className="text-muted-foreground">
                      Create your tailor-made journey in 3 simple steps
                    </p>
                  </div>

                  {/* Steps Overview */}
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Information</h4>
                        <p className="text-sm text-muted-foreground">Tell us who you are</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Choices</h4>
                        <p className="text-sm text-muted-foreground">Choose your destinations</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Send your request</h4>
                        <p className="text-sm text-muted-foreground">Validate your request</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsPlanAFormOpen(true)}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Start Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>

                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Response within 72h maximum • Free quote • No commitment
                  </p>
                </div>

                {/* Alternative Contact Options */}
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground mb-3">Or contact us directly:</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="tel:+212524123456"
                      className="px-4 py-2 border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      📞 Call
                    </a>
                    <a
                      href="mailto:info@mystictravel.ma"
                      className="px-4 py-2 border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      ✉️ Email
                    </a>
                    <a
                      href="https://wa.me/212661234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-border rounded-lg hover:bg-green-500 hover:text-white transition-colors"
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan A Form Modal */}
      <PlanAForm 
        isOpen={isPlanAFormOpen}
        onClose={() => setIsPlanAFormOpen(false)}
      />
    </>
  );
};

export default ContactSection;