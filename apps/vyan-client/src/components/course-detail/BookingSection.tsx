"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { ChevronDown, Calendar, Check } from "lucide-react";
import Image from "next/image";

interface BookingSectionProps {
  price: number;
  imageUrl: string;
  sessionId: string;
}

export const BookingSection = ({ price, imageUrl, sessionId }: BookingSectionProps): JSX.Element => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isPregnant, setIsPregnant] = useState(false);
  const [isNewMom, setIsNewMom] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    trimester: "",
    dueDate: "",
    babyDob: "",
    languages: [] as string[],
    timeSlot: "",
  });

  const containerVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const getStepImage = () => {
    switch (step) {
      case 1: return "/booking.webp";
      case 2: return "/booking2.webp";
      case 3: return "/shefit2.webp";
      default: return "/booking.webp";
    }
  };

  // Load Razorpay SDK
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBooking = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Load Razorpay SDK
      const res = await initializeRazorpay();
      if (!res) {
        setError("Failed to load payment gateway. Please try again.");
        setIsProcessing(false);
        return;
      }

      // Import server actions dynamically
      const { createSessionOrder, verifySessionPayment } = await import("~/lib/payment-actions");

      // Create order
      const orderResponse = await createSessionOrder({
        sessionId,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        isPregnant,
        trimester: isPregnant ? formData.trimester : undefined,
        dueDate: isPregnant ? formData.dueDate : undefined,
        isNewMom,
        babyDob: isNewMom ? formData.babyDob : undefined,
        languages: formData.languages,
        timeSlot: formData.timeSlot,
      });

      if (orderResponse.error) {
        setError(orderResponse.error);
        setIsProcessing(false);
        return;
      }

      // Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderResponse.razorpay.amount,
        currency: orderResponse.razorpay.currency,
        name: "Shewell",
        description: orderResponse.razorpay.description,
        order_id: orderResponse.razorpay.razorpayOrderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await verifySessionPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.success) {
              alert("Payment successful! Your session is booked.");
              window.location.reload();
            } else {
              setError(verifyResponse.message || "Payment verification failed");
            }
          } catch (err: any) {
            setError(err.message || "Payment verification failed");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: orderResponse.razorpay.user.name,
          email: orderResponse.razorpay.user.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#00898F",
        },
      };

      // @ts-ignore
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.failed', function (response: any) {
        setError("Payment failed. Please try again.");
        setIsProcessing(false);
      });

    } catch (err: any) {
      console.error("Booking error:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  }
  return (
    <section className="w-full px-6 md:px-12 py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[40px] overflow-hidden bg-[#F8FAFB] min-h-[720px] flex items-center shadow-xl border border-gray-100">

          {/* LEFT IMAGE SECTION */}
          <div className="absolute inset-0 w-full h-full md:w-[50%] hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-full"
              >
                <img
                  src={getStepImage()}
                  alt="Booking backdrop"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = imageUrl || "https://placehold.co/800x1200?text=Booking+Session";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F8FAFB]/30 md:to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT BOOKING CARD */}
          <div className="relative z-0 w-full flex justify-center md:justify-end md:pr-12 md:pl-[50%] py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="  p-8 md:p-12 w-full max-w-[520px] min-h-[640px] flex flex-col relative"
            >

              {/* PRICE PILL */}
              <div className="mb-8 flex justify-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-[#e6eff1] px-8 py-4 rounded-full flex items-center gap-3 border border-[#00898F]/10 shadow-sm"
                >
                  <span className="font-poppins font-bold text-[#00898F] text-2xl">
                    ₹{price}
                  </span>
                  <span className="font-poppins text-gray-700 font-medium">confirm your seat</span>
                </motion.div>
              </div>

              {/* STEPPER */}
              <div className="flex items-center justify-center mb-10">
                {[1, 2, 3].map((s, i) => (
                  <div key={s} className="flex items-center">
                    <div className="flex flex-col items-center relative">
                      <motion.div
                        animate={{
                          backgroundColor: step >= s ? "#00898F" : "#E5E7EB",
                          color: step >= s ? "#FFFFFF" : "#4B5563",
                        }}
                        className={`w-8 h-8 rounded-full text-xs flex items-center justify-center font-bold relative z-10`}
                      >
                        {step > s ? <Check size={16} /> : s}
                      </motion.div>
                      {step === s && (
                        <motion.div
                          layoutId="step-label"
                          className="absolute -bottom-6 whitespace-nowrap text-[10px] font-bold text-[#00898F] uppercase tracking-tighter"
                        >
                          Step {s}
                        </motion.div>
                      )}
                    </div>

                    {i < 2 && (
                      <div className="w-12 h-[2px] mx-2 bg-gray-100 relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: step > s ? "100%" : "0%" }}
                          className="absolute inset-0 bg-[#00898F]"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* FORM BODY */}
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="space-y-5"
                  >
                    {/* STEP 1 */}
                    {step === 1 && (
                      <>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500 ml-2">MOM NAME</label>
                          <Input
                            placeholder="Enter your full name"
                            className="h-14 rounded-2xl bg-[#F3F7F8] border-none focus-visible:ring-1 focus-visible:ring-[#00898F]"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500 ml-2">EMAIL ADDRESS</label>
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            className="h-14 rounded-2xl bg-[#F3F7F8] border-none focus-visible:ring-1 focus-visible:ring-[#00898F]"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500 ml-2">MOBILE NUMBER</label>
                          <Input
                            placeholder="Enter contact number"
                            className="h-14 rounded-2xl bg-[#F3F7F8] border-none focus-visible:ring-1 focus-visible:ring-[#00898F]"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          />
                        </div>
                      </>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                      <div className="space-y-6">
                        {/* Pregnant Toggle */}
                        <div className="p-4 rounded-2xl bg-[#F3F7F8] border border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-poppins font-medium text-gray-800">Currently pregnant?</span>
                            <button
                              onClick={() => setIsPregnant(!isPregnant)}
                              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isPregnant ? "bg-[#00898F]" : "bg-gray-300"}`}
                            >
                              <motion.div
                                animate={{ x: isPregnant ? 24 : 0 }}
                                className="w-4 h-4 bg-white rounded-full shadow-sm"
                              />
                            </button>
                          </div>

                          <div className={`space-y-3 transition-all duration-300 ${isPregnant ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
                            <div className="relative">
                              <Input placeholder="Trimester" disabled={!isPregnant} className="h-12 rounded-xl bg-white border-none pr-10" />
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>
                            <div className="relative">
                              <Input placeholder="Expected Due Date" disabled={!isPregnant} className="h-12 rounded-xl bg-white border-none pr-10" />
                              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00898F] w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        {/* New Mom Toggle */}
                        <div className="p-4 rounded-2xl bg-[#F3F7F8] border border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-poppins font-medium text-gray-800">Are you a new mom?</span>
                            <button
                              onClick={() => setIsNewMom(!isNewMom)}
                              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isNewMom ? "bg-[#00898F]" : "bg-gray-300"}`}
                            >
                              <motion.div
                                animate={{ x: isNewMom ? 24 : 0 }}
                                className="w-4 h-4 bg-white rounded-full shadow-sm"
                              />
                            </button>
                          </div>

                          <div className={`transition-all duration-300 ${isNewMom ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
                            <div className="relative">
                              <Input placeholder="Baby's Date of Birth" disabled={!isNewMom} className="h-12 rounded-xl bg-white border-none pr-10" />
                              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00898F] w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="text-xs font-semibold text-gray-500 ml-2">PREFERRED LANGUAGE</label>
                          <div className="relative">
                            <Input placeholder="Select Language" className="h-14 rounded-2xl bg-[#F3F7F8] border-none pr-10" />
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00898F]" />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {["Tamil", "English"].map((l) => (
                              <span key={l} className="px-4 py-1.5 bg-[#e6eff1] text-[#00898F] rounded-full text-xs font-bold flex items-center gap-2 border border-[#00898F]/10">
                                {l} <button className="hover:text-red-500">×</button>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-xs font-semibold text-gray-500 ml-2">TIME SLOT</label>
                          <div className="relative">
                            <Input placeholder="Select Time Slot" className="h-14 rounded-2xl bg-[#F3F7F8] border-none pr-10" />
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00898F]" />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {["10:00 AM - 11:00 AM"].map((l, i) => (
                              <span key={i} className="px-4 py-1.5 bg-[#e6eff1] text-[#00898F] rounded-full text-xs font-bold flex items-center gap-2 border border-[#00898F]/10">
                                {l} <button className="hover:text-red-500">×</button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
                  {error}
                </div>
              )}

              {/* WHITE SEPARATOR WITH BLUR */}
              <div className="h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

              {/* CONTINUE BUTTON */}
              <motion.div
                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                onClick={() => {
                  if (isProcessing) return;
                  if (step === 3) {
                    handleBooking();
                  } else {
                    setStep((prev) => (prev < 3 ? ((prev + 1) as any) : prev));
                  }
                }}
                className={`group cursor-pointer flex items-center justify-between px-8 py-6 rounded-3xl bg-[#F8FAFB] transition-all duration-300 ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#00898F] hover:shadow-lg'
                  }`}
              >
                <span className="text-xl font-bold text-gray-800 transition group-hover:text-white">
                  {isProcessing ? "Processing..." : step === 3 ? "Complete Booking" : "Continue"}
                </span>

                <InteractiveButton className="rotate-[-135deg] group-hover:rotate-[-180deg] transition-transform duration-500" />
              </motion.div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
