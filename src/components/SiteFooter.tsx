export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-20">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 md:flex-row">
        <div>
          <span className="mb-6 block font-display text-4xl tracking-tighter">SOLARI</span>
          <p className="max-w-xs text-[10px] font-mono uppercase tracking-widest text-muted">
            © {new Date().getFullYear()} Solari Music Worldwide. All rights reserved.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12 text-[10px] font-bold uppercase tracking-widest text-muted md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <span className="mb-2 text-foreground">Socials</span>
            <a href="#" className="hover:text-primary">Instagram</a>
            <a href="#" className="hover:text-primary">YouTube</a>
            <a href="#" className="hover:text-primary">X / Twitter</a>
            <a href="#" className="hover:text-primary">Facebook</a>
            <a href="#" className="hover:text-primary">Spotify</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="mb-2 text-foreground">Business</span>
            <a href="#" className="hover:text-primary">Management</a>
            <a href="#" className="hover:text-primary">Press Kit</a>
            <a href="#" className="hover:text-primary">Licensing</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="mb-2 text-foreground">Legal</span>
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
