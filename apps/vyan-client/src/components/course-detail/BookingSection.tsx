"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { ChevronDown, Calendar, Check } from "lucide-react";
import Image from "next/image";
import { Media } from "@/types/media";

interface BookingSectionProps {
  price: number;
  banners: Media[];
  sessionId: string;
  isRegistered?: boolean;
  meetingLink?: string | null;
}

export const BookingSection = ({
  price,
  banners,
  sessionId,
  isRegistered = false,
  meetingLink,
}: BookingSectionProps): JSX.Element => {
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
      case 1:
        return banners?.[0].media.fileUrl;
      case 2:
        return banners?.[1].media.fileUrl;

      default:
        return banners?.[0].media.fileUrl;
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
      const { createSessionOrder, verifySessionPayment } =
        await import("~/lib/payment-actions");

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

      paymentObject.on("payment.failed", function (response: any) {
        setError("Payment failed. Please try again.");
        setIsProcessing(false);
      });
    } catch (err: any) {
      console.error("Booking error:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-10 sm:px-6 sm:py-14 md:px-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex min-h-[640px] flex-col items-center overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[40px] border border-gray-100 bg-[#F8FAFB] shadow-xl sm:min-h-[680px] md:min-h-[720px] lg:flex-row">
          {/* LEFT IMAGE SECTION */}
          <div className="absolute inset-0 hidden h-full w-full md:block md:w-[50%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full w-full"
              >
                <img
                  src={getStepImage()}
                  alt="Booking backdrop"
                  className="h-full w-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      banners?.[0].media.fileUrl ||
                      "https://placehold.co/800x1200?text=Booking+Session";

                    console.log("banners", banners);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F8FAFB]/30 md:to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT BOOKING CARD */}
          <div className="relative z-0 flex w-full justify-center py-6 px-3 sm:px-6 sm:py-8 md:justify-end md:pl-[50%] md:pr-8 md:py-10 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex min-h-[560px] w-full max-w-[520px] flex-col p-4 sm:p-6 md:p-8 md:min-h-[640px] lg:p-12"
            >
              {/* PRICE PILL */}
              {!isRegistered && (
                <div className="mb-6 flex justify-center sm:mb-8 md:mb-10">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-[#00898F]/10 bg-[#e6eff1] px-4 py-3 shadow-sm sm:flex-row sm:gap-3 sm:px-6 sm:py-4 md:rounded-full md:px-8"
                  >
                    <span className="font-poppins text-xl font-bold text-[#00898F] sm:text-2xl">
                      ₹{price}
                    </span>
                    <span className="font-poppins text-xs font-medium text-gray-700 sm:text-sm">
                      confirm your seat
                    </span>
                  </motion.div>
                </div>
              )}

              {/* REGISTERED STATE */}
              {isRegistered ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00898F]/10 text-[#00898F] sm:mb-5 md:mb-6 md:h-20 md:w-20">
                    <Check size={32} />
                  </div>
                  <h3 className="mb-2 font-poppins text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
                    You're Registered!
                  </h3>
                  <p className="mb-6 text-xs text-gray-600 sm:text-sm md:mb-8 md:text-base">
                    You have successfully booked your seat for this session.
                    Click below to join the meeting when it's time.
                  </p>
                  {meetingLink ? (
                    <a
                      href={meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center justify-between gap-2 rounded-lg bg-[#00898F] px-4 py-3 text-white transition-all duration-300 ease-in-out hover:bg-teal-700 sm:gap-2.5 sm:rounded-xl sm:px-5 sm:py-3.5 md:rounded-2xl md:px-6 md:py-4"
                    >
                      <span className="text-sm font-medium sm:text-base md:text-lg">
                        Join Meeting Now
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1 sm:h-9 sm:w-9 md:h-10 md:w-10">
                        <InteractiveButton />
                      </div>
                    </a>
                  ) : (
                    <div className="w-full rounded-lg bg-amber-50 p-3 text-xs text-amber-700 sm:rounded-xl sm:p-4 sm:text-sm">
                      The meeting link will be shared here closer to the session
                      start time.
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* STEPPER */}
                  <div className="mb-6 flex items-center justify-center sm:mb-8 md:mb-10">
                    {[1, 2].map((s, i) => (
                      <div key={s} className="flex items-center">
                        <div className="relative flex flex-col items-center">
                          <motion.div
                            animate={{
                              backgroundColor:
                                step >= s ? "#00898F" : "#E5E7EB",
                              color: step >= s ? "#FFFFFF" : "#4B5563",
                            }}
                            onClick={() => setStep(s as 1 | 2 | 3)}
                            className={`relative z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-xs font-bold transition-transform hover:scale-110 sm:h-8 sm:w-8 md:h-9 md:w-9`}
                          >
                            {step > s ? <Check size={14} /> : s}
                          </motion.div>
                          {step === s && (
                            <motion.div
                              layoutId="step-label"
                              className="absolute -bottom-5 whitespace-nowrap text-[8px] font-bold uppercase tracking-tighter text-[#00898F] sm:-bottom-6 sm:text-[9px] md:text-[10px]"
                            >
                              Step {s}
                            </motion.div>
                          )}
                        </div>

                        {i < 1 && (
                          <div className="relative mx-1.5 h-[1.5px] w-8 bg-gray-100 sm:mx-2 sm:w-10 md:w-12">
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
                              <label className="ml-2 text-[10px] font-semibold text-gray-500 sm:text-xs">
                                MOM NAME
                              </label>
                              <Input
                                placeholder="Enter your full name"
                                className="h-10 rounded-xl border-none bg-[#F3F7F8] text-xs focus-visible:ring-1 focus-visible:ring-[#00898F] sm:h-12 sm:rounded-2xl sm:text-sm"
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="ml-2 text-[10px] font-semibold text-gray-500 sm:text-xs">
                                EMAIL ADDRESS
                              </label>
                              <Input
                                placeholder="Enter your email"
                                type="email"
                                className="h-10 rounded-xl border-none bg-[#F3F7F8] text-xs focus-visible:ring-1 focus-visible:ring-[#00898F] sm:h-12 sm:rounded-2xl sm:text-sm"
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    email: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="ml-2 text-[10px] font-semibold text-gray-500 sm:text-xs">
                                MOBILE NUMBER
                              </label>
                              <Input
                                placeholder="Enter contact number"
                                className="h-10 rounded-xl border-none bg-[#F3F7F8] text-xs focus-visible:ring-1 focus-visible:ring-[#00898F] sm:h-12 sm:rounded-2xl sm:text-sm"
                                value={formData.mobile}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    mobile: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </>
                        )}

                        {/* STEP 2 */}
                        {step === 2 && (
                          <div className="space-y-4 sm:space-y-6">
                            {/* Pregnant Toggle */}
                            <div className="rounded-lg border border-gray-100 bg-[#F3F7F8] p-3 sm:rounded-xl sm:p-4 md:rounded-2xl">
                              <div className="mb-2 flex items-center justify-between">
                                <span className="font-poppins text-sm font-medium text-gray-800 sm:text-base">
                                  Currently pregnant?
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setIsPregnant(!isPregnant)}
                                  className={`h-5 w-10 rounded-full p-1 transition-colors duration-300 sm:h-6 sm:w-12 ${isPregnant ? "bg-[#00898F]" : "bg-gray-300"}`}
                                >
                                  <motion.div
                                    animate={{ x: isPregnant ? 20 : 0 }}
                                    className="h-3 w-3 rounded-full bg-white shadow-sm sm:h-4 sm:w-4"
                                  />
                                </button>
                              </div>

                              <div
                                className={`space-y-2 transition-all duration-300 sm:space-y-3 ${isPregnant ? "opacity-100" : "pointer-events-none opacity-30"}`}
                              >
                                <div className="relative">
                                  <select
                                    disabled={!isPregnant}
                                    value={formData.trimester}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        trimester: e.target.value,
                                      })
                                    }
                                    className="h-10 w-full appearance-none rounded-lg border-none bg-white px-3 pr-8 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00898F] sm:h-11 sm:px-4 sm:pr-10 sm:text-sm md:rounded-xl"
                                  >
                                    <option value="">Select Trimester</option>
                                    <option value="first">
                                      First Trimester (1-12 weeks)
                                    </option>
                                    <option value="second">
                                      Second Trimester (13-26 weeks)
                                    </option>
                                    <option value="third">
                                      Third Trimester (27-40 weeks)
                                    </option>
                                  </select>
                                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400 sm:right-3 sm:h-4 sm:w-4" />
                                </div>
                                <div className="relative">
                                  <input
                                    type="date"
                                    disabled={!isPregnant}
                                    value={formData.dueDate}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        dueDate: e.target.value,
                                      })
                                    }
                                    placeholder="Expected Due Date"
                                    className="h-10 w-full rounded-lg border-none bg-white px-3 pr-8 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00898F] sm:h-11 sm:px-4 sm:pr-10 sm:text-sm md:rounded-xl"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* New Mom Toggle */}
                            <div className="rounded-lg border border-gray-100 bg-[#F3F7F8] p-3 sm:rounded-xl sm:p-4 md:rounded-2xl">
                              <div className="mb-2 flex items-center justify-between">
                                <span className="font-poppins text-sm font-medium text-gray-800 sm:text-base">
                                  Are you a new mom?
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setIsNewMom(!isNewMom)}
                                  className={`h-5 w-10 rounded-full p-1 transition-colors duration-300 sm:h-6 sm:w-12 ${isNewMom ? "bg-[#00898F]" : "bg-gray-300"}`}
                                >
                                  <motion.div
                                    animate={{ x: isNewMom ? 20 : 0 }}
                                    className="h-3 w-3 rounded-full bg-white shadow-sm sm:h-4 sm:w-4"
                                  />
                                </button>
                              </div>

                              <div
                                className={`transition-all duration-300 ${isNewMom ? "opacity-100" : "pointer-events-none opacity-30"}`}
                              >
                                <div className="relative">
                                  <input
                                    type="date"
                                    disabled={!isNewMom}
                                    value={formData.babyDob}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        babyDob: e.target.value,
                                      })
                                    }
                                    placeholder="Baby's Date of Birth"
                                    className="h-10 w-full rounded-lg border-none bg-white px-3 pr-8 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00898F] sm:h-11 sm:px-4 sm:pr-10 sm:text-sm md:rounded-xl"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 3 */}
                        {/* {step === 3 && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="ml-2 text-xs font-semibold text-gray-500">
                            PREFERRED LANGUAGE
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Tamil",
                              "English",
                              "Hindi",
                              "Telugu",
                              "Kannada",
                              "Malayalam",
                            ].map((lang) => (
                              <button
                                key={lang}
                                type="button"
                                onClick={() => {
                                  if (formData.languages.includes(lang)) {
                                    setFormData({
                                      ...formData,
                                      languages: formData.languages.filter(
                                        (l) => l !== lang,
                                      ),
                                    });
                                  } else {
                                    setFormData({
                                      ...formData,
                                      languages: [...formData.languages, lang],
                                    });
                                  }
                                }}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                  formData.languages.includes(lang)
                                    ? "bg-[#00898F] text-white"
                                    : "bg-[#F3F7F8] text-gray-600 hover:bg-[#e6eff1]"
                                }`}
                              >
                                {lang}
                              </button>
                            ))}
                          </div>
                          {formData.languages.length > 0 && (
                            <p className="ml-2 text-xs text-[#00898F]">
                              Selected: {formData.languages.join(", ")}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          <label className="ml-2 text-[10px] font-semibold text-gray-500 sm:text-xs">
                            TIME SLOT
                          </label>
                          <div className="relative">
                            <select
                              value={formData.timeSlot}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  timeSlot: e.target.value,
                                })
                              }
                              className="h-10 w-full appearance-none rounded-xl border-none bg-[#F3F7F8] px-3 pr-8 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00898F] sm:h-12 sm:px-4 sm:pr-10 sm:text-sm md:rounded-2xl"
                            >
                              <option value="">Select Time Slot</option>
                              <option value="09:00-10:00">
                                09:00 AM - 10:00 AM
                              </option>
                              <option value="10:00-11:00">
                                10:00 AM - 11:00 AM
                              </option>
                              <option value="11:00-12:00">
                                11:00 AM - 12:00 PM
                              </option>
                              <option value="14:00-15:00">
                                02:00 PM - 03:00 PM
                              </option>
                              <option value="15:00-16:00">
                                03:00 PM - 04:00 PM
                              </option>
                              <option value="16:00-17:00">
                                04:00 PM - 05:00 PM
                              </option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[#00898F] sm:right-3 sm:h-4 sm:w-4" />
                          </div>
                        </div>
                      </div> */}
                        {/* )} */}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* ERROR MESSAGE */}
                  {error && (
                    <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 sm:mb-4 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm md:rounded-2xl">
                      {error}
                    </div>
                  )}

                  {/* WHITE SEPARATOR WITH BLUR */}
                  <div className="my-5 h-[1.5px] bg-gradient-to-r from-transparent via-gray-200 to-transparent sm:my-6 md:my-8" />

                  {/* CONTINUE BUTTON */}
                  <div
                    onClick={() => {
                      if (isProcessing) return;
                      if (step === 2) {
                        handleBooking();
                      } else {
                        setStep((prev) =>
                          prev < 2 ? ((prev + 1) as any) : prev,
                        );
                      }
                    }}
                    className="order-0 group flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg bg-[#F2F2F2] px-3 py-2.5 transition-all duration-300 ease-in-out hover:bg-[#00898F] hover:text-white sm:gap-2.5 sm:rounded-xl sm:px-5 sm:py-3 md:rounded-2xl md:px-6 md:py-4"
                  >
                    <span className="text-sm font-medium text-[#00000066] group-hover:text-white sm:text-base md:text-lg md:font-medium">
                      {isProcessing
                        ? "Processing..."
                        : step === 2
                          ? "Proceed to Pay"
                          : "Continue"}
                    </span>
                    <InteractiveButton />
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
