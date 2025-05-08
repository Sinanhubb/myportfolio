import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          {/* GitHub */}
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <span className="sr-only">GitHub</span>
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.31.76-1.6-2.67-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.01 2.04.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.76.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.83 1.1.83 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <span className="sr-only">LinkedIn</span>
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM2 9h6v12H2zM9 9h5.1v1.5h.1c.7-1.2 2-2 3.4-2 3.7 0 4.4 2.4 4.4 5.6V21h-6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z" />
            </svg>
          </a>

          {/* Twitter */}
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <span className="sr-only">Twitter</span>
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43.36a9.15 9.15 0 01-2.88 1.1 4.52 4.52 0 00-7.72 4.13 12.83 12.83 0 01-9.32-4.73 4.48 4.48 0 001.4 6.02A4.41 4.41 0 012 9.7v.06a4.52 4.52 0 003.6 4.43 4.48 4.48 0 01-2.03.07 4.52 4.52 0 004.22 3.13A9.05 9.05 0 012 19.54 12.78 12.78 0 008.29 21c7.55 0 11.67-6.26 11.67-11.7 0-.18 0-.35-.01-.52A8.3 8.3 0 0023 3z" />
            </svg>
          </a>
        </div>

        {/* Footer Text */}
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} My Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
