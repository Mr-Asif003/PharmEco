import { Heart, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const links = {
    Product: ["Features", "Pricing", "Analytics", "Store Finder"],
    Company: ["About Us", "Careers", "Blog", "Press"],
    Resources: ["Documentation", "API Reference", "Support", "Community"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Licenses"],
  };

  return (
    <footer id="contact" className="bg-card border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-retailer to-patient flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <span className="text-xl font-bold">PharmEco</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Uniting healthcare commerce into one smart ecosystem for retailers and patients.
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-retailer hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-patient hover:text-white flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-retailer hover:text-white flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-patient hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2025 PharmEco. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for better healthcare
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
