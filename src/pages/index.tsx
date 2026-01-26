import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FaScroll, FaCrown } from "react-icons/fa";
import { GiCrownedHeart, GiCastle } from "react-icons/gi";

export default function Home() {
  return (
    <>
      <Head>
        <title>Courtingly</title>
        <meta name="description" content="A unique dating platform that connects individuals through a medieval-themed experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <div className="relative py-20 px-6 text-center bg-gradient-to-b from-background to-primary/10">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8 inline-block">
                <GiCrownedHeart className="h-20 w-20 text-primary mx-auto" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Reviving courtship, one connection at a time
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Experience a return to traditional values and meaningful connections in the modern age
              </p>
              <Link href="/join">
                <Button size="lg" className="text-lg px-8">
                  Begin Thy Journey
                </Button>
              </Link>
            </div>
          </div>

          {/* Mission Statement Section */}
          <div className="py-16 px-6 bg-primary/5">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Our Sacred Mission</h2>
              <Card className="p-6">
                <CardContent className="space-y-4 text-lg leading-relaxed">
                  <p>
                    At Courtingly, we are dedicated to restoring the sacred covenant of marriage and embracing the timeless virtues of courtship, hierarchy, and family legacy. Rooted in Christendom and guided by faith, our mission is to offer an alternative to the fleeting, superficial connections of modern dating platforms.
                  </p>
                  <p>
                    In a world saturated with apps that reduce relationships to fleeting sexual encounters and empower ideologies that undermine biblical roles, Courtingly stands as a beacon of tradition and intentionality. We honor God's divine design—Christ as the head of man, man as the head of woman, and the family as the foundation of a thriving society.
                  </p>
                  <p>
                    Our platform is a place where Christians across denominations can reconnect with the values of faith, family, and fidelity. By blending modern technology with the principles of arranged marriages and guided courtship, we aim to foster unions that reflect God's will—relationships built on love, virtue, and shared purpose under the guidance of wise elders and patriarchs.
                  </p>
                  <p>
                    At Courtingly, we reject the chaos of hookup culture and feminist distortions, offering instead a return to the honor, dignity, and intentionality that only traditional marriage can provide. Together, we are building a legacy of strong, Christ-centered families for future generations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Realm?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardContent className="pt-6">
                    <FaCrown className="h-12 w-12 text-primary mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold text-center mb-2">Traditional Values</h3>
                    <p className="text-center text-muted-foreground">
                      Embrace the timeless principles of courtship and honor in relationships
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <FaScroll className="h-12 w-12 text-primary mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold text-center mb-2">Guided Journey</h3>
                    <p className="text-center text-muted-foreground">
                      Navigate the path to love with purpose and dignity
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <GiCastle className="h-12 w-12 text-primary mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold text-center mb-2">Meaningful Connections</h3>
                    <p className="text-center text-muted-foreground">
                      Find partners who share your commitment to traditional relationship values
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary/5 py-16 px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Reclaim God's Design for Marriage</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join those who honor Christ, family, community, and nation by embracing traditional relationships and family leadership.
              </p>
              <Link href="/join">
                <Button size="lg" className="text-lg px-8">
                  Answer the Call of Your Station
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}