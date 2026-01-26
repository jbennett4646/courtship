import { Card } from "@/components/ui/card"
import Header from "@/components/Header"

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <Card className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-4">Last Updated: February 2025</p>

          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">
              Courtingly values your privacy and is committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your data.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect the information you provide when you create an account, such as your name, 
              email, and profile details. Additionally, we may collect usage data to improve the 
              platform and enhance matchmaking.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
            <p className="mb-2">Your data is used solely for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>To create and manage your Courtingly account.</li>
              <li>To facilitate matchmaking, messaging, and profile discovery.</li>
              <li>To maintain the security and integrity of Courtingly.</li>
              <li>To improve user experience and platform functionality.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Data Storage & Security</h2>
            <p className="mb-4">
              Your data is securely stored using Supabase, a trusted backend service known for its 
              strong security and enterprise-grade encryption standards. Supabase prioritizes privacy, 
              data integrity, and access control, ensuring that your personal information remains 
              protected against unauthorized access.
            </p>
            <p className="mb-4">
              While we take all reasonable steps to safeguard your data, no online platform can 
              guarantee absolute security. We encourage users to practice caution and use Courtingly 
              responsibly.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Sharing of Information</h2>
            <p className="mb-4">
              We do not sell, rent, or share your personal data with third parties. Your information 
              is used solely within Courtingly to provide matchmaking services and maintain platform 
              security.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Your Choices & Rights</h2>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Updating Information:</strong> You may edit your profile and account details at any time.</li>
              <li><strong>Deleting Your Account:</strong> If you choose to leave Courtingly, you can delete your account, and your personal data will be removed from our systems.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">6. Updates to This Policy</h2>
            <p className="mb-4">
              We may update this policy as needed. Continued use of Courtingly means you accept any changes.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions, reach out to josh@joshwbennett.com.
            </p>

            <p className="mt-6">
              By using Courtingly, you agree to this Privacy Policy.
            </p>
          </div>
        </Card>
      </div>
    </>
  )
}