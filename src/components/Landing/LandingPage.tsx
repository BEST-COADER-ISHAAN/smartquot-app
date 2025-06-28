import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, FileText, TrendingUp, Shield, Zap, Globe, ChevronRight, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const features = [
    {
      icon: FileText,
      title: 'Smart Quotation Builder',
      description: 'Create professional quotations with our intuitive step-by-step wizard. Organize by rooms or general lists.'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Margin Analysis',
      description: 'Track profitability with advanced margin calculations and cost breakdowns for every quotation.'
    },
    {
      icon: Users,
      title: 'Customer Management',
      description: 'Maintain comprehensive customer profiles with contact details, GST numbers, and project history.'
    },
    {
      icon: Globe,
      title: 'Multi-format Export',
      description: 'Generate beautiful PDFs or shareable web links with customizable templates and branding.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with role-based access and automatic data backups.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built for speed with instant search, real-time calculations, and seamless performance.'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Sales Director',
      company: 'Premium Tiles Ltd.',
      content: 'SmartQuot transformed our quotation process. We now create professional quotes in minutes instead of hours.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Business Owner',
      company: 'Elite Ceramics',
      content: 'The margin analysis feature helped us increase profitability by 25%. Absolutely game-changing!',
      rating: 5
    },
    {
      name: 'Amit Patel',
      role: 'Operations Manager',
      company: 'Modern Surfaces',
      content: 'Customer management and quotation tracking made our sales process so much more organized.',
      rating: 5
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Quotations Generated' },
    { number: '500+', label: 'Happy Customers' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SmartQuot</h1>
                <p className="text-sm text-gray-500">Professional Quotation Management</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                About
              </Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Pricing
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Contact
              </Link>
              {user && (
                <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleGetStarted}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>{user ? 'Go to Dashboard' : 'Get Started'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4 pt-4">
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/pricing" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                {user && (
                  <Link 
                    to="/dashboard" 
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleGetStarted();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span>{user ? 'Go to Dashboard' : 'Get Started'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4 mr-2" />
                  Trusted by 500+ Businesses
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Create Professional
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Quotations</span>
                  in Minutes
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Streamline your sales process with our intelligent quotation management system. 
                  Build, track, and analyze quotations with powerful margin insights and beautiful exports.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg font-semibold"
                >
                  <span>{user ? 'Go to Dashboard' : 'Start Free Trial'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <Link 
                  to="/pricing"
                  className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 text-lg font-semibold"
                >
                  <span>View Pricing</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              {!user && (
                <div className="flex items-center space-x-8 pt-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">No credit card required</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">14-day free trial</span>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">Quotation #QT0101A</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Approved
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Customer:</span>
                      <span className="font-semibold text-gray-900">Premium Interiors Ltd.</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Products:</span>
                      <span className="font-semibold text-gray-900">12 Items</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-green-700 font-medium">Total Amount:</span>
                      <span className="text-2xl font-bold text-green-800">₹2,45,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-blue-700 font-medium">Profit Margin:</span>
                      <span className="text-xl font-bold text-blue-800">32.5%</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Download PDF
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      Share Link
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white p-3 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+25% Profit</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white p-3 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">2 min setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to streamline your quotation process and boost your business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-all duration-200 group">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-3 w-fit mb-6 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-200">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Loved by
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Businesses</span>
              Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our customers have to say about their experience with SmartQuot.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your
            <br />
            Quotation Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using SmartQuot to create professional quotations and boost their sales.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl text-lg font-semibold"
            >
              <span>{user ? 'Go to Dashboard' : 'Start Your Free Trial'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link 
              to="/contact"
              className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 text-lg font-semibold"
            >
              <span>Schedule Demo</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {!user && (
            <div className="flex items-center justify-center space-x-8 mt-8 pt-8 border-t border-blue-500">
              <div className="flex items-center space-x-2 text-blue-100">
                <CheckCircle className="w-5 h-5" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <CheckCircle className="w-5 h-5" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <CheckCircle className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SmartQuot</h3>
                  <p className="text-sm text-gray-400">Professional Quotations</p>
                </div>
              </div>
              <p className="text-gray-400">
                Streamline your sales process with intelligent quotation management.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/pricing" className="hover:text-white transition-colors duration-200">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors duration-200">Pricing</Link></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/contact" className="hover:text-white transition-colors duration-200">Help Center</Link></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Documentation</a></li>
                <li><Link to="/contact" className="hover:text-white transition-colors duration-200">Contact Us</Link></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors duration-200">About</Link></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SmartQuot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;