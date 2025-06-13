export default function Footer() {
  return (
    <footer className="py-4 mt-auto">
      <div className="container mx-auto">
        <p className="text-xs sm:text-sm lg:text-base">
          &copy; {new Date().getFullYear()} Evan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
