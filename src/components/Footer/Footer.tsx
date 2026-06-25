export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground py-6 px-4 mt-auto border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center">
        <div className="text-sm font-medium tracking-wide">
          &copy; {new Date().getFullYear()} Seapedia Copyright. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
