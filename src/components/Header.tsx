import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { signOut } from '@/lib/auth';
import { useToast } from '@/components/ui/use-toast';
import { GoGear } from "react-icons/go";
import { GiCrownedHeart, GiNestedHearts, GiHeartKey, GiTiedScroll } from "react-icons/gi";
import { cn } from '@/lib/utils';

const Header = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isJoinPage = router.pathname.startsWith('/join');
  const isAuthPage = router.pathname === '/auth';

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    } else {
      router.push('/');
    }
  };

  const NavButton = ({ href, icon: Icon, label, onClick }: { href?: string; icon: any; label: string; onClick?: () => void }) => {
    const content = (
      <Button
        variant="ghost"
        className={cn(
          "flex flex-col items-center gap-1 h-auto py-2 px-3",
          "hover:bg-accent hover:text-accent-foreground",
          "sm:flex-row sm:gap-2"
        )}
        onClick={onClick}
      >
        <Icon className="h-5 w-5 text-rose-500" />
        <span className="text-xs sm:text-sm">{label}</span>
      </Button>
    );

    return href ? <Link href={href}>{content}</Link> : content;
  };

  return (
    <div className="w-full border-b">
      <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-6 lg:px-8 gap-4">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Logo />
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-1">
          {isLoggedIn && (
            <NavButton 
              href="/messages"
              icon={GiTiedScroll}
              label="Messages"
            />
          )}
          <NavButton 
            href="/profiles"
            icon={GiHeartKey}
            label="Browse"
          />


          {isLoggedIn ? (
            <>
              <NavButton 
                href="/settings"
                icon={GoGear}
                label="Settings"
              />
              <Button 
                onClick={handleSignOut} 
                variant="outline"
                className="w-full sm:w-auto"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              {!isAuthPage && (
                <Button 
                  onClick={() => router.push("/auth")} 
                  className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white"
                >
                  Sign In/Register
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;