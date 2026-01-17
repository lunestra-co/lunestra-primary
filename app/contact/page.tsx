"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import Button from "@/components/Button";

import { inquiryService } from "@/services/InquiryService";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await inquiryService.create({
      customerName: formState.name,
      phone: formState.phone,
      subject: formState.subject,
      message: formState.message,
    });
    alert("Thank you for your inquiry. A concierge will respond shortly.");
    setFormState({ name: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-brandblack pt-32 pb-20">
      {/* Header */}
      {/* <div className="text-center mb-20 px-6">
        <span className="text-gold uppercase tracking-[0.2em] text-[10px] font-bold block mb-4 animate-fade-in">
          Get in Touch
        </span>
        <h1 className="font-serif text-5xl md:text-6xl mb-6 animate-fade-in-up">
          Contact Our Atelier
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto font-light leading-relaxed animate-fade-in-up delay-100">
          We invite you to discuss your bespoke requirements or schedule a
          private viewing at one of our global boutiques.
        </p>
      </div> */}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <div className="space-y-16 animate-slide-in-left">
            {/* Global Headquarters */}
            <div>
              <h2 className="font-serif text-3xl mb-8 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-brandblack"></span>
                Connect with Lunestra
              </h2>
              <div className="bg-white p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border-t-4 border-gold">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-gold mt-1" />
                      <div>
                        <h3 className="font-serif text-lg mb-2">Telephone</h3>
                        <p className="text-sm text-gray-500 hover:text-brandblack transition-colors cursor-pointer">
                          +94 77 482 0783
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-gold mt-1" />
                      <div>
                        <h3 className="font-serif text-lg mb-2">WhatsApp</h3>
                        <p className="text-sm text-gray-500 hover:text-brandblack transition-colors cursor-pointer">
                          +94 77 482 0783
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-gold mt-1" />
                      <div>
                        <h3 className="font-serif text-lg mb-2">Email</h3>
                        <p className="text-sm text-gray-500 hover:text-brandblack transition-colors cursor-pointer">
                          concierge@lunestra.co
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-gold mt-1" />
                      <div>
                        <h3 className="font-serif text-lg mb-2">Hours</h3>
                        <p className="text-sm text-gray-500">
                          Mon - Fri: 10:00 - 18:00
                          <br />
                          Sat: By Appointment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-100 flex gap-4">
                  <button className="flex-1 py-3 border border-brandblack text-[10px] uppercase tracking-[0.2em] hover:bg-brandblack hover:text-white transition-all">
                    Email Our Curators
                  </button>
                  <button className="flex-1 py-3 bg-brandblack text-white text-[10px] uppercase tracking-[0.2em] hover:bg-gold transition-all">
                    WhatsApp Concierge
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="animate-slide-in-right">
            <div className="bg-white p-10 md:p-14 shadow-2xl relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

              <h2 className="font-serif text-3xl mb-2 relative z-10">
                Send an Inquiry
              </h2>
              <p className="text-sm text-gray-500 mb-10 relative z-10">
                Our concierge team typically responds within 4 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full border-b border-gray-200 py-3 focus:border-brandblack focus:outline-none font-serif text-lg bg-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState({ ...formState, phone: e.target.value })
                      }
                      className="w-full border-b border-gray-200 py-3 focus:border-brandblack focus:outline-none font-serif text-lg bg-transparent"
                      placeholder="+94 77 123 4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">
                    Subject
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({ ...formState, subject: e.target.value })
                    }
                    className="w-full border-b border-gray-200 py-3 focus:border-brandblack focus:outline-none font-serif text-lg bg-transparent"
                  >
                    <option value="">Select a Topic</option>
                    <option value="bespoke">Bespoke Inquiry</option>
                    <option value="appointment">Book Appointment</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full border-b border-gray-200 py-3 focus:border-brandblack focus:outline-none font-serif text-lg bg-transparent resize-none"
                    placeholder="How may we assist you?"
                  />
                </div>

                <div className="pt-6">
                  <Button className="w-full bg-brandblack text-white py-4 text-xs uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                    Send Message <MessageSquare className="w-3 h-3" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
