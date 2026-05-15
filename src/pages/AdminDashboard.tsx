import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Save, AlertCircle, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('hero');

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/status', {
          credentials: 'include',
        });
        const data = await response.json();

        if (data.authenticated) {
          setAuthenticated(true);
          // Fetch content
          await fetchContent();
        } else {
          navigate('/admin');
        }
      } catch (err) {
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchContent = useCallback(async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContent(data);
    } catch (err) {
      showMessage('error', 'Failed to load content');
    }
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleSave = async () => {
    if (!content) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/content/${activeTab}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: content[activeTab] }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      showMessage('success', 'Content saved successfully');
    } catch (err) {
      showMessage('error', 'Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      navigate('/admin');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const updateContent = (key, value) => {
    if (!content) return;

    const updated = { ...content };
    if (typeof updated[activeTab] === 'object') {
      updated[activeTab] = {
        ...updated[activeTab],
        [key]: value,
      };
    } else {
      updated[activeTab] = value;
    }
    setContent(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!authenticated || !content) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-gray-400">Manage your portfolio content</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Message Alert */}
      {message.text && (
        <div
          className={`mx-auto max-w-7xl mt-4 px-4 sm:px-6 lg:px-8 p-4 rounded-lg flex gap-3 ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/50'
              : 'bg-red-500/10 border border-red-500/50'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          )}
          <p
            className={`text-sm ${
              message.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {message.text}
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
              <h2 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">
                Sections
              </h2>
              <nav className="space-y-2">
                {['hero', 'about', 'status', 'contact', 'featured', 'technologies', 'experience', 'certifications', 'languages', 'projects'].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors capitalize ${
                        activeTab === tab
                          ? 'bg-primary text-white'
                          : 'text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </nav>
            </div>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white capitalize">{activeTab}</h2>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>

              {/* Dynamic Form Fields */}
              <div className="space-y-4">
                {content[activeTab] && typeof content[activeTab] === 'object' ? (
                  <div className="space-y-4">
                    {Object.entries(content[activeTab]).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                          {key}
                        </label>
                        {typeof value === 'string' ? (
                          value.length > 100 ? (
                            <textarea
                              value={value}
                              onChange={(e) => updateContent(key, e.target.value)}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors resize-none h-24"
                            />
                          ) : (
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => updateContent(key, e.target.value)}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                            />
                          )
                        ) : (
                          <textarea
                            value={JSON.stringify(value, null, 2)}
                            onChange={(e) => {
                              try {
                                updateContent(key, JSON.parse(e.target.value));
                              } catch {
                                // Invalid JSON, just update the string
                              }
                            }}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors resize-none h-32 font-mono text-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No editable content for this section.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
