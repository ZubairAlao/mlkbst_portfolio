import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

function ContactMe() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("⚠️ Validation Error:\n\nPlease fill in all fields!");
      return;
    }

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

    setIsLoading(true);

    try {
      await emailjs.send(
        serviceID,
        templateID,
        {
          to_name: "Mukhtar",
          from_name: name,
          reply_to: email,
          message,
        },
        publicKey
      );

      alert("✅ Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      alert(
        `❌ EmailJS Error:\n\n${
          err?.text || err?.message || "Something went wrong. Please try again."
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-black transition-all duration-300 hover:scale-[1.01]">
      <div className="py-10 px-6 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900 dark:text-white">
          Book a Consultation — Your Security Is My Priority 🔒
        </h2>
        <p className="mb-10 text-center text-gray-600 dark:text-gray-400 text-lg">
          Protect your digital assets and maintain customer trust with proactive
          security testing.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-300"
            >
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-50 border-2 border-green-300 rounded-sm text-gray-900 focus:outline-none focus:border-green-500 dark:bg-black dark:border-green-600 dark:text-white"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-300"
            >
              Your Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-50 border-2 border-green-300 rounded-sm text-gray-900 focus:outline-none focus:border-green-500 dark:bg-black dark:border-green-600 dark:text-white"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-300"
            >
              Your Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-gray-50 border-2 border-green-300 rounded-sm text-gray-900 focus:outline-none focus:border-green-500 dark:bg-black dark:border-green-600 dark:text-white"
              placeholder="Write your message here..."
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full sm:w-auto px-6 py-3 text-white font-medium rounded-sm border-2 border-green-600 bg-green-600 hover:bg-green-700 transition-all ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactMe;
