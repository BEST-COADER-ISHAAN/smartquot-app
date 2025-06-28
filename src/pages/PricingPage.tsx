import React from 'react';
import { ArrowLeft, Check, Star, Zap, Crown, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: '₹999',
      period: '/month',
      description: 'Perfect for small businesses getting started',
      features: [
        'Up to 50 quotations/month',
        'Basic customer management',
        'PDF export',
        'Email support',
        '2 user accounts',
        'Basic templates'
      ],
      popular: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      icon: Star,
      price: '₹2,499',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 200 quotations/month',
        'Advanced customer management',
        'PDF & Web link export',
        'Priority email support',
        '5 user accounts',
        'Custom templates',
        'Margin analysis',
        'Product catalog management'
      ],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: '₹4,999',
      period: '/month',
      description: 'For large teams and enterprises',
      features: [
        'Unlimited quotations',
        'Complete CRM integration',
        'All export formats',
        'Phone & email support',
        'Unlimited user accounts',
        'White-label templates',
        'Advanced analytics',
        'API access',
        'Custom integrations',
        'Dedicated account manager'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'We offer a 14-day free trial for all plans. No credit card required to get started.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and UPI payments. Enterprise customers can also pay via bank transfer.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.'
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer: 'Yes, we offer a 20% discount when you choose annual billing instead of monthly.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade security measures including SSL encryption, regular backups, and SOC 2 compliance.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your business. Start with a 14-day free trial, no credit card required.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <Rocket className="w-4 h-4 mr-2" />
            Save 20% with annual billing
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                plan.popular ? 'border-blue-500 scale-105' : 'border-gray-200'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`inline-flex p-3 rounded-full mb-4 ${
                    plan.popular ? 'bg-gradient-to-r from-blue-100 to-purple-100' : 'bg-gray-100'
                  }`}>
                    <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-blue-600' : 'text-gray-600'}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/login"
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-200 block ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Plans Include</h2>
            <p className="text-xl text-gray-600">Core features available across all subscription tiers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="bg-blue-100 rounded-full p-3 w-fit mx-auto mb-4">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Cloud Storage</h3>
              <p className="text-gray-600">Your data is safely stored with automatic backups and enterprise-grade security.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="bg-green-100 rounded-full p-3 w-fit mx-auto mb-4">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile Access</h3>
              <p className="text-gray-600">Access your quotations from anywhere with our responsive web application.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="bg-purple-100 rounded-full p-3 w-fit mx-auto mb-4">
                <Check className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Regular Updates</h3>
              <p className="text-gray-600">Get new features and improvements automatically with no additional cost.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our pricing and plans</p>
          </div>
          
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using SmartQuot to streamline their quotation process
          </p>
          <Link 
            to="/login"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            <span>Start Your Free Trial</span>
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
          <p className="text-blue-100 text-sm mt-4">No credit card required • 14-day free trial</p>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;