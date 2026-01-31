import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import Header from "@/components/Header"

export default function FAQPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      
      <Card className="p-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Courtingly???</AccordionTrigger>
            <AccordionContent>
              Courtingly is a Christian courtship platform designed to foster faith-based relationships that honor biblical principles, 
              traditional values, and intentional matchmaking. In today's society, the path to marriage and family has become increasingly difficult. 
              Economic burdens, career pressures, cultural distractions, and secular influences all work against young adults. Courtingly was 
              founded to make it easier for Christians to form marriages earlier, build families, and raise the next generation in faith.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How do I sign up for Courtingly?</AccordionTrigger>
            <AccordionContent>
              You can sign up by creating an account and confirming your email. Once your account is verified, you can join the realm by completing a detailed questionnaire that aligns with your role: Knights (for men), Ladies (for women), Patriarchs (for fathers).
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How is Courtingly different from other dating platforms?</AccordionTrigger>
            <AccordionContent>
              Courtingly is designed for Christians seeking marriage-oriented relationships rooted in biblical values and intentional courtship, rather than casual dating or fleeting connections.

              We emphasize biblical values, intentional courtship, and provide role-based profiles that reflect Christian principles and traditions. One of our unique features is the Patriarch Profile, which allows fathers to play a guiding role in presenting their daughter for courtship, reflecting traditional Christendom values of family-led matchmaking. 

              Additionally, we offer role-based profiles - Knights for men, Ladies for women - allowing users to express their vision for marriage within a structured, faith-centered framework. At Courtingly, we uphold the sanctity of marriage as a covenant under God and provide a platform where like-minded individuals can seek lifelong, Christ-centered unions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Is Courtingly free to use?</AccordionTrigger>
            <AccordionContent>
              Yes, Courtingly is completely free to use. We believe that finding a Christ-centered spouse should not come with 
              financial barriers, and we are committed to keeping this platform open to all who seek biblical courtship. While 
              Courtingly is free to use, we gratefully accept voluntary donations. If you met your spouse through Courtingly, 
              please consider making a voluntary donation to help maintain the platform and make it accessible for others seeking 
              traditional Christian marriages!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How does matchmaking work on Courtingly?</AccordionTrigger>
            <AccordionContent>
              Users can browse profiles to find potential matches based on faith, values, and compatibility. Courtingly also provides a messaging feature, allowing users to communicate directly once they have found someone of interest. While we facilitate meaningful introductions, the next steps are entirely up to you.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>Is Courtingly for all Christian denominations?</AccordionTrigger>
            <AccordionContent>
              Courtingly welcomes individuals from various Christian denominations who uphold biblical marriage principles.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>What information is required to create a profile?</AccordionTrigger>
            <AccordionContent>
              You will be asked about your faith, family values, interests, skills, and preferences for a spouse. Men (Knights), 
              women (Ladies) and fathers (Patriarchs) will have unique profile questions tailored to their roles.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>Can fathers create a profile for their daughter?</AccordionTrigger>
            <AccordionContent>
              Yes, Courtingly allows Patriarch profiles, where fathers can present a daughter's profile and oversee courtship inquiries.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger>How can I ensure my privacy while using Courtingly?</AccordionTrigger>
            <AccordionContent>
              We take privacy seriously. Users can control their profile visibility and choose what information to share, and request deletion of their profile at any time. Profile information is only visible to other verified members of the platform.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger>Can I report inappropriate behavior?</AccordionTrigger>
            <AccordionContent>
              Yes, any user engaging in dishonest, disrespectful, or immoral behavior can be reported. Send an email 
              to josh@joshwbennett.com to report any inappropriate behavior.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-11">
            <AccordionTrigger>Can I delete my account if I no longer need it?</AccordionTrigger>
            <AccordionContent>
              Yes, users can delete their accounts at any time in their profile settings menu. If you are engaged or married, we would love to add your names to the Courtingly Marriage Ledger as a record of the faithful who seek to restore Christendom through marriage!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-12">
            <AccordionTrigger>Can I share my courtship or marriage story?</AccordionTrigger>
            <AccordionContent>
              Absolutely! We love celebrating Christian marriages! You can submit your story on the Matches page 
              to encourage others on their journey.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-13">
            <AccordionTrigger>Is Courtingly available as a mobile app in the App Store or Google Play?</AccordionTrigger>
            <AccordionContent>
              Not yet! Courtingly is currently a web-based platform with a fully-functional mobile site, and while we plan to develop a dedicated mobile app in the future, you can still create an app-like experience on your phone right now.

              To save Courtingly as a shortcut on your home screen for quick access:

              For iPhone (Safari Users):
              - Open [Courtingly] in Safari.
              - Tap the Share button (square with an arrow).
              - Select "Add to Home Screen."
              - Name it "Courtingly" and tap "Add."

              For Android (Chrome Users):
              - Open [Courtingly] in Chrome.
              - Tap the three-dot menu in the top-right corner.
              - Select "Add to Home Screen."
              - Name it "Courtingly" and tap "Add."

              This will create an app-like shortcut on your device, allowing you to access Courtingly just like a mobile app! We appreciate your patience as we continue to grow, and in the meantime, we hope this helps streamline your experience.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
    </>
  )
}
