import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center gap-3">
          <Link 
            href="/faq" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQs
          </Link>
          <span className="text-sm text-muted-foreground">•</span>
          <Link 
            href="/privacy-policy" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="text-sm text-muted-foreground">•</span>
          <Link 
            href="/marriage-ledger" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Marriage Ledger
          </Link>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">© 2026 Courtingly</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
