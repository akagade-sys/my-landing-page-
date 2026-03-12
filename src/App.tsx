import React, { useState, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  Bookmark,
  Database, 
  Newspaper, 
  Library, 
  Download, 
  FileText, 
  ExternalLink, 
  GraduationCap, 
  Info,
  ChevronRight,
  Globe,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type TabType = 'search' | 'open-access' | 'subscribed' | 'newspaper' | 'opac' | 'digital-library' | 'forms' | 'journal' | 'services' | 'activities';

interface ResourceLink {
  title: string;
  url: string;
  description?: string;
  category?: string;
}

interface LibraryService {
  title: string;
  description: string;
  icon: any;
}

interface LibraryActivity {
  title: string;
  date: string;
  description: string;
  image?: string;
}

// --- Constants ---
const LIBRARY_ACTIVITIES: LibraryActivity[] = [
  { 
    title: 'Vachan Prerana Din', 
    date: 'October 15', 
    description: 'Celebrated on the birth anniversary of Dr. A.P.J. Abdul Kalam to inspire students to read more.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800'
  },
  { 
    title: 'Ranganathan Day', 
    date: 'August 12', 
    description: 'Celebrating National Librarians Day in memory of Dr. S.R. Ranganathan, the father of library science in India.',
    image: 'https://images.unsplash.com/photo-1507738911748-9c7365f9a20b?auto=format&fit=crop&q=80&w=800'
  },
  { 
    title: 'Book Exhibition', 
    date: 'Annual Event', 
    description: 'A grand display of the latest pharmaceutical and research books from various publishers.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800'
  },
  { 
    title: 'Library Competitions', 
    date: 'Ongoing', 
    description: 'Organizing Book Talks and Book Review competitions to enhance critical thinking and presentation skills.',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800'
  },
  { 
    title: 'Marathi Bhasha Gaurav Din', 
    date: 'February 27', 
    description: 'Celebrating the Marathi language through literature and reading sessions.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800'
  },
];
const LIBRARY_SERVICES: LibraryService[] = [
  { title: 'Circulation Service', description: 'Automated issue, return, and renewal of books using ERP system.', icon: BookOpen },
  { title: 'Reference Service', description: 'Personalized assistance in finding specific information or using library resources.', icon: Info },
  { title: 'Book Bank Scheme', description: 'Institute level and Samajkalyan schemes for S.C. category students.', icon: Bookmark },
  { title: 'Career Information', description: 'Resources for MPSC, UPSC, GPAT, NIPPER, and MBA entrance exams.', icon: GraduationCap },
  { title: 'Newspaper Clipping', description: 'Regular updates on pharmacy and health-related news from leading dailies.', icon: Newspaper },
  { title: 'Internet & E-Resources', description: 'High-speed internet access for browsing e-journals and databases.', icon: Globe },
  { title: 'Reprography Service', description: 'Photocopying and printing facilities available for academic materials.', icon: FileText },
  { title: 'Inter-Library Loan', description: 'Resource sharing with other prominent libraries in the region.', icon: Library },
];
const OPEN_ACCESS_RESOURCES: ResourceLink[] = [
  { title: 'PubMed Central', url: 'https://www.ncbi.nlm.nih.gov/pmc/', description: 'Free archive of biomedical and life sciences journal literature.' },
  { title: 'DOAJ (Directory of Open Access Journals)', url: 'https://doaj.org/', description: 'Community-curated online directory that indexes high quality, open access, peer-reviewed journals.' },
  { title: 'National Digital Library of India', url: 'https://ndl.iitkgp.ac.in/', description: 'A virtual repository of learning resources with a single-window search facility.' },
  { title: 'Shodhganga', url: 'https://shodhganga.inflibnet.ac.in/', description: 'A reservoir of Indian theses.' },
  { title: 'PharmaTutor', url: 'https://www.pharmatutor.org/', description: 'Educational portal for pharmacy professionals.' },
  { title: 'DrugBank Online', url: 'https://go.drugbank.com/', description: 'Comprehensive, free-to-access, online database containing information on drugs and drug targets.' },
  { title: 'USP Free Resources', url: 'https://www.usp.org/free-resources', description: 'U.S. Pharmacopeia resources for healthcare professionals.' },
  { title: 'WHO Medicines and Health Products', url: 'https://www.who.int/teams/health-product-policy-and-standards', description: 'World Health Organization standards and policies for medicines.' },
];

const FORMS_FOR_DOWNLOAD: ResourceLink[] = [
  { title: 'Library Membership Form', url: 'https://metbhujbalknowledgecity.ac.in/assets/pdf/library_form.pdf', description: 'Form for new students and faculty to join the library.' },
  { title: 'Book Recommendation Form', url: '#', description: 'Suggest a new title for the library collection.' },
  { title: 'No Dues Certificate Request', url: '#', description: 'Request form for leaving students.' },
  { title: 'Inter-Library Loan Request', url: '#', description: 'Request books from other partner libraries.' },
];

const NEWSPAPER_CLIPPINGS: ResourceLink[] = [
  { title: 'Pharmacy News - March 2024', url: '#', description: 'Latest updates in the pharmaceutical industry.' },
  { title: 'Health & Wellness Column', url: '#', description: 'Weekly health tips from leading newspapers.' },
  { title: 'MET Institute Achievements', url: '#', description: 'News coverage of our institute events.' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('search');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this might redirect to a federated search engine
    // For this demo, we'll redirect to K-Hub if it's a database search or PubMed for general
    if (searchQuery.trim()) {
      window.open(`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  const TabButton = ({ id, icon: Icon, label }: { id: TabType, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap ${
        activeTab === id 
          ? 'bg-red-600 text-white shadow-lg scale-105' 
          : 'bg-white text-slate-600 hover:bg-red-50 border border-slate-200'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <img 
              src="https://metbhujbalknowledgecity.ac.in/assets/images/logo.png" 
              alt="MET Bhujbal Knowledge City Logo" 
              className="h-12 md:h-16 object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="hidden sm:block h-10 w-px bg-slate-200"></div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Institute of Pharmacy</h1>
              <p className="text-sm text-red-600 font-semibold tracking-wide uppercase">Knowledge Resource Center</p>
            </div>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="https://metbhujbalknowledgecity.ac.in/" target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors flex items-center gap-1">
              <Globe size={14} /> College Website
            </a>
            <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
              <a href="mailto:library@met.edu" title="Email Library" className="hover:text-red-600 transition-colors"><Mail size={18} /></a>
              <a href="tel:02532555864" title="Call Library" className="hover:text-red-600 transition-colors"><Phone size={18} /></a>
              <a href="tel:9011887051" title="Mobile Inquiry" className="hover:text-red-600 transition-colors text-slate-400 hover:text-red-600"><Phone size={14} /></a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
            alt="Library Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="mb-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 inline-block">
              <img 
                src="https://metbhujbalknowledgecity.ac.in/assets/images/logo.png" 
                alt="MET Logo" 
                className="h-12 brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Your Gateway to Pharmaceutical Knowledge</h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Access a world-class collection of journals, databases, and research materials tailored for the next generation of pharmacy professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setActiveTab('search')}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2"
              >
                Start Searching <ChevronRight size={20} />
              </button>
              <button 
                onClick={() => setActiveTab('opac')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-full font-bold transition-all"
              >
                Web OPAC
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">About the Library</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  The Library of MET’s Institute of Pharmacy was established in <span className="font-bold text-red-600">2006</span> with the aim of supporting academic excellence, teaching, learning, and research activities of the institute.
                </p>
                <p>
                  Our library has a rich collection of more than <span className="font-bold text-slate-900">12,400 books</span>, including over <span className="font-bold text-slate-900">2,055 reference books</span>, covering various subjects related to pharmaceutical sciences.
                </p>
                <p>
                  We subscribe to <span className="font-bold text-slate-900">23 National and International journals</span> to meet the academic and research needs of faculty members, researchers, and students. In addition, the library provides access to K-Hub Pharmacy e-journals and e-books, enabling users to access a wide range of digital resources.
                </p>
                <p className="italic border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded-r-lg">
                  "The library is committed to providing prompt and efficient services to students and faculty members, and continuously strives to support the academic and research activities of the institute."
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                  <BookOpen className="text-red-600 mb-3" size={32} />
                  <span className="text-2xl font-bold text-slate-900">12,400+</span>
                  <span className="text-sm text-slate-500 font-medium">Total Books</span>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                  <Bookmark className="text-red-600 mb-3" size={32} />
                  <span className="text-2xl font-bold text-slate-900">2,055+</span>
                  <span className="text-sm text-slate-500 font-medium">Reference Books</span>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                  <Newspaper className="text-red-600 mb-3" size={32} />
                  <span className="text-2xl font-bold text-slate-900">23</span>
                  <span className="text-sm text-slate-500 font-medium">Journals</span>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                  <Database className="text-red-600 mb-3" size={32} />
                  <span className="text-2xl font-bold text-slate-900">K-Hub</span>
                  <span className="text-sm text-slate-500 font-medium">Digital Access</span>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <img 
                  src="https://metbhujbalknowledgecity.ac.in/assets/images/logo.png" 
                  alt="MET Logo" 
                  className="h-20 mb-4 object-contain"
                  referrerPolicy="no-referrer"
                />
                <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Seal of Academic Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content & Tabs */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        {/* Tab Navigation */}
        <div className="flex overflow-x-auto pb-6 mb-12 gap-3 no-scrollbar">
          <TabButton id="search" icon={Search} label="Unified Search" />
          <TabButton id="services" icon={Library} label="Library Services" />
          <TabButton id="activities" icon={Bookmark} label="Library Activities" />
          <TabButton id="open-access" icon={Globe} label="Open Access E-Resources" />
          <TabButton id="subscribed" icon={Database} label="Subscribed Databases" />
          <TabButton id="opac" icon={BookOpen} label="Web OPAC" />
          <TabButton id="digital-library" icon={Library} label="Digital Library" />
          <TabButton id="newspaper" icon={Newspaper} label="Newspaper Clippings" />
          <TabButton id="forms" icon={Download} label="Forms" />
          <TabButton id="journal" icon={FileText} label="College Journal" />
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'search' && (
                <div className="max-w-3xl mx-auto text-center py-12">
                  <h3 className="text-3xl font-serif font-bold mb-4">Unified Search Platform</h3>
                  <p className="text-slate-600 mb-8">Search across multiple pharmacy databases, journals, and library catalogs in one place.</p>
                  <form onSubmit={handleSearch} className="relative group">
                    <input 
                      type="text" 
                      placeholder="Search for books, journals, articles, or authors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-14 pr-32 py-5 bg-white border-2 border-slate-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all text-lg shadow-sm group-hover:shadow-md"
                    />
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                    <button 
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-700 transition-colors"
                    >
                      Search
                    </button>
                  </form>
                  <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
                    <span>Popular:</span>
                    <button onClick={() => setSearchQuery('Pharmacology')} className="hover:text-red-600 underline decoration-red-200 underline-offset-4">Pharmacology</button>
                    <button onClick={() => setSearchQuery('Drug Delivery')} className="hover:text-red-600 underline decoration-red-200 underline-offset-4">Drug Delivery</button>
                    <button onClick={() => setSearchQuery('Clinical Pharmacy')} className="hover:text-red-600 underline decoration-red-200 underline-offset-4">Clinical Pharmacy</button>
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {LIBRARY_SERVICES.map((service, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-red-200 hover:shadow-lg transition-all"
                    >
                      <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4">
                        <service.icon size={24} />
                      </div>
                      <h4 className="text-lg font-bold mb-2 text-slate-900">{service.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'activities' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {LIBRARY_ACTIVITIES.map((activity, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={activity.image} 
                          alt={activity.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {activity.date}
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold mb-2 text-slate-900">{activity.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{activity.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'open-access' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {OPEN_ACCESS_RESOURCES.map((res, idx) => (
                    <ResourceCard key={idx} title={res.title} url={res.url} description={res.description} />
                  ))}
                </div>
              )}

              {activeTab === 'subscribed' && (
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                          <Database size={32} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">K-Hub Pharmacy Package</h3>
                          <p className="text-red-600 font-medium">Premium Subscribed Content</p>
                        </div>
                      </div>
                      <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                        Access our comprehensive digital library subscription through K-Hub. This package includes thousands of e-journals, e-books, and multimedia resources specifically curated for Pharmacy education and research.
                      </p>
                      <ul className="space-y-3 mb-8 text-slate-600">
                        <li className="flex items-center gap-2"><ChevronRight size={16} className="text-red-500" /> 2000+ Full-text E-Journals</li>
                        <li className="flex items-center gap-2"><ChevronRight size={16} className="text-red-500" /> 5000+ Pharmacy E-Books</li>
                        <li className="flex items-center gap-2"><ChevronRight size={16} className="text-red-500" /> Video Lectures & Case Studies</li>
                        <li className="flex items-center gap-2"><ChevronRight size={16} className="text-red-500" /> 24/7 Remote Access</li>
                      </ul>
                      <a 
                        href="https://k-hub.in/dashboard" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                      >
                        Access K-Hub Dashboard <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'opac' && (
                <div className="max-w-4xl mx-auto text-center">
                  <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-slate-200">
                    <BookOpen size={64} className="mx-auto text-slate-300 mb-6" />
                    <h3 className="text-3xl font-serif font-bold mb-4">Web OPAC</h3>
                    <p className="text-slate-600 mb-8 text-lg">
                      Search our physical library collection from anywhere. Check book availability, reserve titles, and manage your library account online.
                    </p>
                    <a 
                      href="https://erp.metbhujbalknowledgecity.ac.in/WebOpac.aspx" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
                    >
                      Launch Web OPAC <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              )}

              {activeTab === 'digital-library' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">Digital Repository</h3>
                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Savitribai Phule Pune University Resources</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all group">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <FileText size={24} />
                      </div>
                      <h4 className="text-xl font-bold mb-2">Previous Year Question Papers</h4>
                      <p className="text-slate-600 mb-6">Access a comprehensive archive of SPPU pharmacy examination papers from previous years.</p>
                      <a 
                        href="https://beta.unipune.ac.in/university_files/old_papers.htm" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Browse Papers <ChevronRight size={18} />
                      </a>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all group">
                      <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Library size={24} />
                      </div>
                      <h4 className="text-xl font-bold mb-2">Institutional Repository</h4>
                      <p className="text-slate-600 mb-6">Digital copies of project reports, faculty publications, and internal academic resources.</p>
                      <button className="text-purple-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                        Access Repository <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'newspaper' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {NEWSPAPER_CLIPPINGS.map((res, idx) => (
                    <ResourceCard key={idx} title={res.title} url={res.url} description={res.description} />
                  ))}
                </div>
              )}

              {activeTab === 'forms' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {FORMS_FOR_DOWNLOAD.map((res, idx) => (
                    <ResourceCard key={idx} title={res.title} url={res.url} description={res.description} icon={Download} />
                  ))}
                </div>
              )}

              {activeTab === 'journal' && (
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/3 aspect-[3/4] bg-slate-100 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                      <FileText size={64} className="text-slate-300" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-3xl font-serif font-bold mb-2">MET Pharmacy Journal</h3>
                      <p className="text-red-600 font-medium mb-4">Annual Academic Publication</p>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        Our internal college journal showcases the research work, reviews, and academic contributions of our students and faculty members. It serves as a platform for sharing innovative ideas in pharmaceutical sciences.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
                          Latest Issue <Download size={18} />
                        </button>
                        <button className="border border-slate-200 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all">
                          Archives
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 text-white mb-6">
                <img 
                  src="https://metbhujbalknowledgecity.ac.in/assets/images/logo.png" 
                  alt="MET Logo" 
                  className="h-10 object-contain brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
                <div className="h-8 w-px bg-slate-700 mx-1"></div>
                <span className="font-bold text-lg">MET IOP Library</span>
              </div>
              <p className="text-sm leading-relaxed">
                Dedicated to providing excellent information services and resources to support the academic and research needs of the MET Institute of Pharmacy community.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Library Timing</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span className="text-white">8:00 AM - 5:30 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sat (2nd & 4th):</span>
                  <span className="text-white">8:00 AM - 12:00 PM</span>
                </li>
                <li className="pt-4 text-xs italic">
                  * Closed on Sundays and Public Holidays
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Contact Info</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-red-500 shrink-0" />
                  <span>MET Bhujbal Knowledge City, Adgaon, Nashik - 422003, Maharashtra, India</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-red-500 shrink-0" />
                  <span>0253-2555864 / 9011887051</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-red-500 shrink-0" />
                  <span>library@met.edu / enquiries@bkc.met.edu</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} MET Institute of Pharmacy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ResourceCard({ title, url, description, icon: Icon = ExternalLink }: { title: string, url: string, description?: string, icon?: any, key?: any }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-red-200 hover:shadow-lg hover:shadow-red-500/5 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
          <Icon size={20} />
        </div>
        <a 
          href={url} 
          target="_blank" 
          rel="noreferrer" 
          className="text-slate-300 hover:text-red-600 transition-colors"
        >
          <ExternalLink size={18} />
        </a>
      </div>
      <h4 className="text-lg font-bold mb-2 text-slate-900">{title}</h4>
      <p className="text-sm text-slate-500 line-clamp-2">{description}</p>
      <a 
        href={url} 
        target="_blank" 
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-red-600 hover:gap-2 transition-all"
      >
        Access Resource <ChevronRight size={14} />
      </a>
    </div>
  );
}
