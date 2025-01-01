import React from 'react';

/**
 * Footer component renders the application's footer with copyright information and a GitHub link.
 * @returns {JSX.Element} The footer element.
 */
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white p-4 text-center">
            <p>
                © {currentYear} Fitness Tracker. All rights reserved.
            </p>
            <p>
                <a
                    href="https://github.com/your-github-repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-500"
                >
                   GitHub
                </a>
            </p>
        </footer>
    );
};

export default Footer;