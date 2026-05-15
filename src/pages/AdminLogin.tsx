import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Lock, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }

      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
          {/* Header */}
          <div className="flex justify-center mb-8">
            <div className="p-3 bg-primary/10 rounded-full">
              <Lock className="w-6 h-6 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-white mb-2">
            Admin Panel
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Sign in to manage your portfolio
          </p>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter password"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-8">
            This area is protected. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
