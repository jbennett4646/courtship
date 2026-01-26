import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GiGriffinShield, GiBroadsword, GiTiara } from "react-icons/gi";
import { supabase } from "@/lib/supabase";

export default function Join() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication status and profile existence when component mounts
    const checkAuthAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('No session found, redirecting to auth');
        router.push('/auth');
        return;
      }

      console.log('Session found, checking for profile');

      // Check if user already has a profile
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('type')
        .eq('id', session.user.id)
        .maybeSingle(); // Using maybeSingle instead of single to handle no results case

      console.log('Profile check result:', { profile, error });

      if (profile?.type) {
        console.log('Profile found, redirecting to settings');
        router.push('/settings');
      } else {
        console.log('No profile found, staying on join page');
      }
    };

    checkAuthAndProfile();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (!session) {
        console.log('No session in state change, redirecting to auth');
        router.push('/auth');
        return;
      }

      // Check profile on auth state change as well
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('type')
        .eq('id', session.user.id)
        .maybeSingle();

      console.log('Profile check on state change:', { profile, error });

      if (profile?.type) {
        console.log('Profile found on state change, redirecting to settings');
        router.push('/settings');
      } else {
        console.log('No profile found on state change, staying on join page');
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleChoice = (type: "lady" | "knight" | "patriarch") => {
    router.push(`/join/${type}`);
  };

  return (
    <>
      <Head>
        <title>Answer the Call of Your Station | Courtingly</title>
        <meta name="description" content="Select thy station within the realm" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="max-w-3xl w-full text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Answer the Call of Your Station</h1>
            <p className="text-muted-foreground">Select thy station within the realm to embark upon this sacred journey</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
            <Card className="group hover:border-primary transition-colors cursor-pointer flex" onClick={() => handleChoice("lady")}>
              <CardContent className="p-6 flex flex-col items-center justify-between w-full min-h-[320px]">
                <div className="flex flex-col items-center">
                  <div className="mb-4 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <GiTiara className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-center">Lady of Virtue</h2>
                  <p className="text-muted-foreground text-center">
                    For women who desire to be courted with grace and dignity.
                  </p>
                </div>
                <Button className="w-full mt-4" onClick={() => handleChoice("lady")}>
                  Step into Thy Role as a Lady
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary transition-colors cursor-pointer flex" onClick={() => handleChoice("knight")}>
              <CardContent className="p-6 flex flex-col items-center justify-between w-full min-h-[320px]">
                <div className="flex flex-col items-center">
                  <div className="mb-4 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <GiBroadsword className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-center">Knight of Valor</h2>
                  <p className="text-muted-foreground text-center">
                    For men who aspire to pursue with honor and valor.
                  </p>
                </div>
                <Button className="w-full mt-4" onClick={() => handleChoice("knight")}>
                  Take Up Thy Quest as a Knight
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary transition-colors cursor-pointer flex" onClick={() => handleChoice("patriarch")}>
              <CardContent className="p-6 flex flex-col items-center justify-between w-full min-h-[320px]">
                <div className="flex flex-col items-center">
                  <div className="mb-4 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <GiGriffinShield className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-center">Patriarch of the Household</h2>
                  <p className="text-muted-foreground text-center">
                    For fathers who seek to uphold their family's legacy and guide their fair daughters toward noble unions.
                  </p>
                </div>
                <Button className="w-full mt-4" onClick={() => handleChoice("patriarch")}>
                  Claim Thy Mantle as a Patriarch
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}