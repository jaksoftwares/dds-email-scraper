import React, { useState } from 'react';
import { Search, Mail, CheckCircle, XCircle, Download, Filter, Target, Globe, Users, TrendingUp } from 'lucide-react';

interface EmailResult {
  id: string;
  email: string;
  domain: string;
  isValid: boolean;
  source: string;
  confidence: number;
  type: 'contact' | 'support' | 'info' | 'admin' | 'other';
}

interface SearchStats {
  totalFound: number;
  validEmails: number;
  invalidEmails: number;
  domainsScanned: number;
  pagesScanned: number;
}

const mockEmails: EmailResult[] = [
  { id: '1', email: 'contact@stmaryshospital.com', domain: 'stmaryshospital.com', isValid: true, source: 'Contact Page', confidence: 95, type: 'contact' },
  { id: '2', email: 'info@generalhospital.org', domain: 'generalhospital.org', isValid: true, source: 'About Page', confidence: 92, type: 'info' },
  { id: '3', email: 'admin@cityhospital.net', domain: 'cityhospital.net', isValid: true, source: 'Staff Directory', confidence: 88, type: 'admin' },
  { id: '4', email: 'support@healthcenter.edu', domain: 'healthcenter.edu', isValid: false, source: 'Footer', confidence: 45, type: 'support' },
  { id: '5', email: 'careers@medicenter.com', domain: 'medicenter.com', isValid: true, source: 'Jobs Page', confidence: 90, type: 'other' },
  { id: '6', email: 'emergency@regionalmed.org', domain: 'regionalmed.org', isValid: true, source: 'Emergency Info', confidence: 97, type: 'contact' },
];

const mockStats: SearchStats = {
  totalFound: 247,
  validEmails: 189,
  invalidEmails: 58,
  domainsScanned: 45,
  pagesScanned: 1243
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<EmailResult[]>([]);
  const [stats, setStats] = useState<SearchStats | null>(null);
  const [activeTab, setActiveTab] = useState<'search' | 'results' | 'validate'>('search');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    setActiveTab('results');
    
    // Simulate API call
    setTimeout(() => {
      setResults(mockEmails);
      setStats(mockStats);
      setIsSearching(false);
    }, 3000);
  };

  const toggleEmailSelection = (emailId: string) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'contact': return 'bg-blue-100 text-blue-800';
      case 'support': return 'bg-green-100 text-green-800';
      case 'info': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <span className="ml-4 text-gray-600">Scanning domains and extracting emails...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Dovepeak-Email-Cent</h1>
            </div>
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('search')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'search' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Search
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'results' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Results
              </button>
              <button
                onClick={() => setActiveTab('validate')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'validate' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Validate
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Tab */}
        {activeTab === 'search' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Discover Professional Email Addresses
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Search across domains and institutions to find verified email contacts. 
                Perfect for outreach, marketing, and professional networking.
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                    Search Domain or Institution Type
                  </label>
                  <input
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="e.g., hospitals, universities, tech companies"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleSearch}
                    disabled={isSearching || !searchTerm.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                  >
                    <Search className="h-5 w-5" />
                    {isSearching ? 'Searching...' : 'Search Emails'}
                  </button>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Target className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Domain Targeting</h3>
                <p className="text-gray-600">Search specific domains or industry types for targeted email discovery.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Validation</h3>
                <p className="text-gray-600">Automatic cleaning and validation of discovered email addresses.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Users className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Bulk Processing</h3>
                <p className="text-gray-600">Process thousands of emails simultaneously with advanced filtering.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Download className="h-8 w-8 text-orange-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Results</h3>
                <p className="text-gray-600">Export validated email lists in multiple formats for your campaigns.</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
              {results.length > 0 && (
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  <Download className="h-4 w-4" />
                  Export Results
                </button>
              )}
            </div>

            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Total Found</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalFound}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Valid Emails</p>
                      <p className="text-2xl font-bold text-green-600">{stats.validEmails}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Invalid Emails</p>
                      <p className="text-2xl font-bold text-red-600">{stats.invalidEmails}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 text-purple-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Domains Scanned</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.domainsScanned}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-orange-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Pages Scanned</p>
                      <p className="text-2xl font-bold text-orange-600">{stats.pagesScanned}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isSearching && <LoadingSpinner />}

            {/* Results Table */}
            {results.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Discovered Emails</h3>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Filter by type</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.map((email) => (
                        <tr key={email.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedEmails.includes(email.id)}
                              onChange={() => toggleEmailSelection(email.id)}
                              className="rounded border-gray-300"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{email.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">{email.domain}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {email.isValid ? (
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500 mr-2" />
                              )}
                              <span className={`text-sm ${email.isValid ? 'text-green-600' : 'text-red-600'}`}>
                                {email.isValid ? 'Valid' : 'Invalid'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(email.type)}`}>
                              {email.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {email.source}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${email.confidence}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{email.confidence}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Validate Tab */}
        {activeTab === 'validate' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Validation & Cleaning</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Clean and validate your email lists to ensure maximum deliverability and engagement rates.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Email List</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drop your email list here or click to browse</p>
                  <p className="text-sm text-gray-500">Supports CSV, TXT, and Excel files</p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Choose File
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation Options</h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 mr-3" defaultChecked />
                    <span className="text-sm text-gray-700">Remove duplicates</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 mr-3" defaultChecked />
                    <span className="text-sm text-gray-700">Syntax validation</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 mr-3" defaultChecked />
                    <span className="text-sm text-gray-700">Domain verification</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 mr-3" />
                    <span className="text-sm text-gray-700">SMTP validation</span>
                  </label>
                </div>
                <button className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  Start Validation
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;