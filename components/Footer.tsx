const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-2xl font-serif font-bold">Lumière</div>
        <div className="flex gap-8 text-sm text-gray-500 uppercase tracking-wider">
          <a href="#" className="hover:text-black transition-colors">
            Shipping
          </a>
          <a href="#" className="hover:text-black transition-colors">
            Contact
          </a>
          <a href="#" className="hover:text-black transition-colors">
            Privacy
          </a>
        </div>
        <div className="text-xs text-gray-400">© {new Date().getFullYear()} Lumière Jewelry</div>
      </div>
    </footer>
  );
};

export default Footer;

