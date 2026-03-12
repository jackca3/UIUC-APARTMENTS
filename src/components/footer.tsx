import Link from 'next/link';
import { Home, ExternalLink } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-uiuc-navy text-white mt-12">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Home className="h-6 w-6 text-uiuc-orange" />
                            <span className="text-xl font-bold">UIUC Apartments</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                            Helping students find the best housing around campus through verified reviews.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-lg border-b border-gray-700 pb-2">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/" className="hover:text-uiuc-orange transition-colors">Home</Link></li>
                            <li><Link href="/apartments" className="hover:text-uiuc-orange transition-colors">Apartments</Link></li>
                            <li><Link href="/leasing-companies" className="hover:text-uiuc-orange transition-colors">Leasing Companies</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-lg border-b border-gray-700 pb-2">Resources</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>
                                <a href="https://tenantunion.illinois.edu/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-uiuc-orange transition-colors">
                                    Off-Campus Community Living <ExternalLink className="h-3 w-3" />
                                </a>
                            </li>
                            <li>
                                <a href="https://studentlegal.illinois.edu/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-uiuc-orange transition-colors">
                                    Student Legal Services <ExternalLink className="h-3 w-3" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} UIUC Apartments Review. Not affiliated with the University of Illinois.
                </div>
            </div>
        </footer>
    );
}
