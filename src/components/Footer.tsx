import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-purple-300 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-purple-300 transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/sermons"
                  className="hover:text-purple-300 transition-colors"
                >
                  Sermons
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-purple-300 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>123 Church Street</li>
              <li>City, State 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@church.com</li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Service Times</h3>
            <ul className="space-y-2">
              <li>Sunday Service: 10:00 AM</li>
              <li>Bible Study: Wednesday 7:00 PM</li>
              <li>Youth Group: Friday 6:30 PM</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-purple-800 text-center">
          <p>© {new Date().getFullYear()} Church Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
