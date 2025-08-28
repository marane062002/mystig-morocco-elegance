import { useState } from 'react';
import { Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { login } from '@/services/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useScrollAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(formData.email, formData.password);
      setUser(user);
      navigate('/dashboard');
    } catch {
      setError('Email ou mot de passe invalide');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-beige to-luxury-sand">
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <a
            href="/"
            className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-300 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </a>
          
          <h1 className="font-serif text-3xl font-light tracking-wider text-foreground">
            MysticTravel
          </h1>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-background/80 backdrop-blur-xl rounded-2xl shadow-luxury p-8 border border-border/20 fade-in-up">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                Seller Login
              </h2>
              <p className="text-muted-foreground">
                Access your management dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-muted-foreground">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors duration-300">
                  Mot de passe oublié ?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </button>
            </form>

            {error && <div className="mt-4 text-red-500 text-center font-medium">{error}</div>}

            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">
                Don't have an account yet?{' '}
                <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-300 font-medium">
                  Contact us
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;