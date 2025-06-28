import React from 'react';
import { ArrowLeft, Users, Target, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Visionary leader with 15+ years in business automation'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Product',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Product strategist focused on user experience excellence'
    },
    {
      name: 'Amit Patel',
      role: 'Lead Developer',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Full-stack engineer passionate about scalable solutions'
    },
    {
      name: 'Sneha Reddy',
      role: 'Customer Success',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Dedicated to ensuring customer satisfaction and growth'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We constantly push boundaries to deliver cutting-edge solutions that transform how businesses operate.'
    },
    {
      icon: Users,
      title: 'Customer-Centric',
      description: 'Every decision we make is guided by our commitment to solving real problems for our customers.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, from code quality to customer support.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We build trust through transparency, honesty, and ethical business practices in all our relationships.'
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
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SmartQuot</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're on a mission to revolutionize how businesses create, manage, and track quotations. 
            Our platform empowers companies to streamline their sales processes and boost profitability 
            through intelligent automation and insightful analytics.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  SmartQuot was born from a simple observation: businesses were spending countless hours 
                  creating quotations manually, often losing track of margins and missing opportunities for growth.
                </p>
                <p>
                  Founded in 2023 by a team of experienced entrepreneurs and technologists, we set out to build 
                  a solution that would not only automate the quotation process but also provide valuable insights 
                  to help businesses make better decisions.
                </p>
                <p>
                  Today, we're proud to serve over 500 businesses across India, helping them save time, 
                  increase accuracy, and boost their bottom line through smarter quotation management.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Team collaboration" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-full p-3 w-fit mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind SmartQuot</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the future of quotation management with SmartQuot
          </p>
          <Link 
            to="/login"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            <span>Get Started Today</span>
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;