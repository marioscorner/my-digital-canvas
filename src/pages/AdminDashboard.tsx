import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Save, AlertCircle, CheckCircle, Upload, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('hero');
  const [uploads, setUploads] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedDocType, setSelectedDocType] = useState('cv');

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
          // Fetch content and uploads
          await fetchContent();
          await fetchUploads();
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
  }, [navigate, fetchContent, fetchUploads]);

  const fetchContent = useCallback(async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContent(data);
    } catch (err) {
      showMessage('error', 'Failed to load content');
    }
  }, []);

  const fetchUploads = useCallback(async () => {
    try {
      const response = await fetch('/api/uploads');
      const data = await response.json();
      setUploads(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load uploads:', err);
      setUploads([]);
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

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      showMessage('error', 'Only PDF, JPEG, PNG, and WebP files are allowed');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      showMessage('error', 'File size must be less than 10MB');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', selectedLanguage);
    formData.append('documentType', selectedDocType);

    setUploading(true);
    try {
      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      showMessage('success', `${selectedDocType} (${selectedLanguage}) uploaded successfully`);
      await fetchUploads();
      // Reset file input
      e.target.value = '';
    } catch (err) {
      showMessage('error', `Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteUpload = async (filename) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(`/api/uploads/${filename}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      showMessage('success', 'File deleted successfully');
      await fetchUploads();
    } catch (err) {
      showMessage('error', 'Failed to delete file');
    }
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
                {['hero', 'about', 'status', 'contact', 'featured', 'technologies', 'experience', 'certifications', 'languages', 'projects', 'uploads'].map(
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
                {activeTab !== 'uploads' && (
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                )}
              </div>

              {/* Uploads Section */}
              {activeTab === 'uploads' ? (
                <div className="space-y-6">
                  {/* Upload Form */}
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Document Type
                          </label>
                          <select
                            value={selectedDocType}
                            onChange={(e) => setSelectedDocType(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                          >
                            <option value="cv">CV</option>
                            <option value="resume">Resume</option>
                            <option value="document">Document</option>
                            <option value="certificate">Certificate</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Language
                          </label>
                          <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                          >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          File (PDF, JPEG, PNG, WebP - Max 10MB)
                        </label>
                        <div className="flex items-center justify-center gap-4">
                          <input
                            type="file"
                            id="file-input"
                            onChange={handleFileUpload}
                            disabled={uploading}
                            accept=".pdf,.jpg,.jpeg,.png,.webp"
                            className="hidden"
                          />
                          <label
                            htmlFor="file-input"
                            className={`flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg cursor-pointer transition-colors ${
                              uploading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <Upload className="w-4 h-4" />
                            {uploading ? 'Uploading...' : 'Choose File'}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Files List */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Uploaded Files</h3>
                    {uploads && uploads.length > 0 ? (
                      <div className="space-y-3">
                        {uploads.map((upload) => (
                          <div key={upload.filename} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600">
                            <div className="flex-1">
                              <p className="font-medium text-white">
                                {upload.document_type} ({upload.language.toUpperCase()})
                              </p>
                              <p className="text-sm text-gray-400">
                                {upload.original_name} • {(upload.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Uploaded: {new Date(upload.created_at || upload.uploaded_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <a
                                href={`/uploads/${upload.filename}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                              >
                                Download
                              </a>
                              <button
                                onClick={() => handleDeleteUpload(upload.filename)}
                                className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400">No files uploaded yet</p>
                    )}
                  </div>
                </div>
              ) : (
                /* Regular Content Editor */
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
