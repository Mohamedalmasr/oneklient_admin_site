import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck, Calendar, RefreshCw } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar currentPage="privacy" />
      <main className="px-4 pb-16 pt-12 sm:px-6 sm:pt-12 lg:px-16 lg:pt-20">
        <h1 className="mb-5 text-[clamp(1.85rem,3.4vw,2.625rem)] font-extrabold leading-[1.236] tracking-[-0.027em] text-[#0f172a]">
          Privacy Policy
        </h1>
        <div className="mb-8 flex flex-wrap items-center gap-4 text-[0.95rem] text-[#475569]">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-[#2563eb]" />
            <span>Effective Date: 2025-06-01</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="size-4 text-[#2563eb]" />
            <span>Last Updated: 2026-03-13</span>
          </div>
        </div>

        <Alert variant="notice" className="mb-6 rounded-xl px-5 py-4 shadow-sm">
           <AlertDescription className="m-0 text-[0.95rem] leading-[1.618]">
             Privacy Policy for ONEklient Solutions Inc
           </AlertDescription>
        </Alert>

        <Alert variant="info" className="mb-10 rounded-xl px-5 py-4 shadow-sm">
          <ShieldCheck className="size-5 text-[#2563eb]" />
            <AlertDescription className="m-0 text-[0.95rem] leading-[1.618]">
              ONEklient Solutions Inc (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy and ensuring the security of your personal information.
            </AlertDescription>
        </Alert>


        <section className="mt-2">
          <div className="mb-5 flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-[#2563eb]" />
            <h2 className="text-[1.25rem] font-semibold text-[#0f172a]">Information handling</h2>
          </div>
          <p className="mb-8 max-w-3xl text-[0.95rem] leading-[1.618] text-[#475569]">
            This Privacy Policy outlines how we collect, use, and safeguard the information you provide when using our services and websites.
          </p>

        </section>

        <section className="mt-12 space-y-10">
          <div>
            <h3 className="mb-3 text-[1.125rem] font-semibold text-[#0f172a]">1. Information We Collect</h3>
            <p className="mb-3 max-w-3xl text-[0.95rem] leading-[1.618] text-[#475569]">
              We may collect the following types of personal information from you:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-[0.95rem] leading-[1.618] text-[#475569]">
              <li>Contact details (e.g., name, email address, phone number)</li>
              <li>Payment information (when necessary for purchases or services)</li>
              <li>Usage data (e.g., IP address, browser type, and activity on our website)</li>
              <li>Other information provided voluntarily during communication or interactions with us</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[1.125rem] font-semibold text-[#0f172a]">2. How We Use Your Information</h3>
            <p className="mb-3 max-w-3xl text-[0.95rem] leading-[1.618] text-[#475569]">
              The information we collect is used to:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-[0.95rem] leading-[1.618] text-[#475569]">
              <li>Provide, improve, and personalize our services</li>
              <li>Process transactions and send receipts or confirmations</li>
              <li>Respond to inquiries or support requests</li>
              <li>Communicate updates, offers, or information about our services (with your consent)</li>
              <li>Ensure the security and functionality of our website and systems</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[1.125rem] font-semibold text-[#0f172a]">3. Sharing and Selling Personal Information</h3>
            <p className="max-w-3xl text-[0.95rem] leading-[1.618] text-[#475569]">
              ONEklient Solutions Inc does not sell, rent, or trade customer personal information to third parties for their marketing purposes. We may share your information with trusted third-party service providers or partners who assist us in delivering our services. These partners are bound by confidentiality agreements and may not use your information for purposes other than those specified by us.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-[1.125rem] font-semibold text-[#0f172a]">4. Data Security</h3>
            <p className="max-w-3xl text-[0.95rem] leading-[1.618] text-[#475569]">
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no system is entirely secure, and we cannot guarantee the absolute security of your information.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-[1.125rem] font-semibold text-[#0f172a]">5. Your Rights</h3>
            <p className="mb-3 max-w-3xl text-[0.95rem] leading-[1.618] text-[#475569]">
              Depending on your jurisdiction, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-[0.95rem] leading-[1.618] text-[#475569]">
              <li>Accessing the data we have collected about you</li>
              <li>Requesting corrections to inaccuracies in your data</li>
              <li>Requesting deletion of your data (subject to legal and operational requirements)</li>
            </ul>
            <p className="mt-3 max-w-3xl text-[0.95rem] leading-[1.618] text-[#475569]">
              To exercise these rights, please contact us using the details below.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-[1.125rem] font-semibold text-[#0f172a]">6. Cookies and Tracking Technologies</h3>
            <p className="max-w-3xl text-[0.95rem] leading-[1.618] text-[#475569]">
              Our website uses cookies and similar technologies to enhance user experience and collect usage data. You can manage your cookie preferences through your browser settings.
            </p>
          </div>

          <div className="rounded-xl bg-[#f8fafc] p-6">
            <p className="max-w-3xl text-[0.95rem] leading-[1.618] text-[#475569]">
              We reserve the right to update this Privacy Policy as needed. Any changes will be posted to this page with an updated effective date.
            </p>
            <p className="mt-3 max-w-3xl text-[0.95rem] leading-[1.618] text-[#475569]">
              This Privacy Policy reflects our commitment to protecting your personal information and respecting your privacy rights.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
