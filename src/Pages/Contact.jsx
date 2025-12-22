import React from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import PageTitle from "../Component/PageTitle";

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Message Sent",
            text: "Thanks for reaching out. Our support team will contact you shortly.",
            icon: "success",
            confirmButtonText: "OK",
        });

        e.target.reset();
    };

    return (
        <div className="bg-base-100 min-h-screen">
            <PageTitle title={"Contact"}></PageTitle>
            {/* HERO */}
            <section className="border-b border-base-200 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
                <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-2xl"
                    >
                        <p className="uppercase tracking-[0.3em] text-xs text-primary mb-3">
                            Contact LoanLink
                        </p>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-base-content">
                            Let’s talk about your{" "}
                            <span className="text-primary">loan journey</span>
                        </h1>
                        <p className="mt-4 text-sm md:text-base text-base-content/70">
                            Whether you’re a borrower, manager, or admin — our team is here to
                            help you every step of the way.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CONTENT */}
            <main className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                <div className="grid gap-10 lg:grid-cols-3">
                    {/* CONTACT INFO */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6 lg:col-span-1"
                    >
                        <div className="p-6 rounded-2xl bg-base-100 border border-base-200 shadow-sm">
                            <h3 className="text-lg font-semibold mb-3">
                                📞 Support Information
                            </h3>

                            <div className="space-y-3 text-sm text-base-content/80">
                                <p>
                                    <span className="font-medium">Email:</span>{" "}
                                    support@loanlink.com
                                </p>
                                <p>
                                    <span className="font-medium">Phone:</span> +880 1711-301-162
                                </p>
                                <p>
                                    <span className="font-medium">Business Hours:</span><br />
                                    Sun – Thu, 9:00 AM – 6:00 PM
                                </p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-base-100 border border-base-200 shadow-sm">
                            <h3 className="text-lg font-semibold mb-3">
                                📍 Office Location
                            </h3>
                            <p className="text-sm text-base-content/80">
                                LoanLink Headquarters<br />
                                Sobujbug, Sylhet<br />
                                Bangladesh
                            </p>
                        </div>
                    </motion.div>

                    {/* CONTACT FORM */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-base-100 border border-base-200 rounded-2xl p-6 md:p-8 shadow-sm">
                            <h3 className="text-xl font-semibold mb-2">
                                Send us a message
                            </h3>
                            <p className="text-sm text-base-content/70 mb-6">
                                Fill out the form and our team will get back to you shortly.
                            </p>

                            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
                                <div className="form-control">
                                    <label className="label font-medium">Full Name </label>
                                    <input
                                        required
                                        className="input input-bordered"
                                        placeholder="Your name"
                                    />
                                </div> <br />
                                <div className="form-control">
                                    <label className="label font-medium">Email  </label>
                                    <input
                                        required
                                        type="email"
                                        className="input input-bordered"
                                        placeholder="your@email.com"
                                    />
                                </div> <br />
                                <div className="form-control md:col-span-2">
                                    <label className="label font-medium">Subject  </label>
                                    <input
                                        required
                                        className="input input-bordered"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div className="form-control md:col-span-2">
                                    <label className="label font-medium">Message  </label>
                                    <textarea
                                        required
                                        className="textarea textarea-bordered min-h-[140px]"
                                        placeholder="Write your message..."
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <button className="btn btn-primary w-full">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Contact;
