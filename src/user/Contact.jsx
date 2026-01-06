import React from 'react'
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';


function Contact() {
  return (
    <>
    <Header/>
      <div className="relative min-h-screen bg-linear-to-b from-sky-50 to-sky-100 overflow-hidden">
        
  
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-bold text-sky-800 text-center mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center text-slate-700 mb-16"
          >
            Questions, suggestions, or collaborations? Send us a message, and we’ll respond quickly!
          </motion.p>
  
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="bg-white p-10 rounded-3xl shadow-2xl flex flex-col justify-center space-y-8"
            >
              <h3 className="text-2xl font-bold text-sky-800 mb-10 text-center md:text-left">
                Contact Information
              </h3>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-cyan-500 text-3xl" />
                <p className="text-slate-700 font-medium text-lg">contact@skillnest.com</p>
              </div>
              <div className="flex items-center space-x-4">
                <FaPhoneAlt className="text-cyan-500 text-3xl" />
                <p className="text-slate-700 font-medium text-lg">+91 9876543210</p>
              </div>
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-cyan-500 text-3xl" />
                <p className="text-slate-700 font-medium text-lg">123  Street, Kerala, India</p>
              </div>
            </motion.div>
  
            {/* Contact Form Card */}
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="bg-white p-10 rounded-3xl shadow-2xl space-y-6"
            >
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-5 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
              </div>
  
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-5 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
              </div>
  
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Message</label>
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-5 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                ></textarea>
              </div>
  
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-cyan-500 text-white font-bold hover:bg-cyan-600 transition text-lg"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    <Footer/>
    </>
  )
}

export default Contact