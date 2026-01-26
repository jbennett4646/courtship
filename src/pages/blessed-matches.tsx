import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { GiLoveLetter } from "react-icons/gi";

const BlessedMatches = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:josh@joshwbennett.com?subject=Our%20Courtingly%20Marriage%20Story";
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-primary/5 via-primary/10 to-primary/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Marriage Ledger</h1>
            <Card className="p-6">
              <CardContent className="space-y-4 text-lg leading-relaxed">
                <p className="text-center">
                  Did you meet your spouse through Courtingly? If our platform played a role in your journey to finding your God-ordained match, we would love to hear your story!
                </p>
                <p className="text-center">
                  Sharing your success inspires others to pursue meaningful, faith-centered relationships and reminds us of the beauty of building Christ-centered unions.
                </p>
                <p className="text-center">
                  Please take a moment to tell us about your courtship and marriage—we may even feature your story to encourage others on their path to love.
                </p>
                <div className="flex justify-center pt-6">
                  <Button 
                    onClick={handleEmailClick}
                    size="lg"
                    className="text-lg px-8 flex items-center gap-2"
                  >
                    <GiLoveLetter className="h-5 w-5" />
                    Share Your Story
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlessedMatches;