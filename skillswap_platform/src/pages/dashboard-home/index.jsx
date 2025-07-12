import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

const DashboardHome = () => {
  const [user] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  });

  const [featuredSkills] = useState([
    {
      id: 1,
      title: 'Web Development',
      description: 'Learn React, Vue, Angular and more',
      icon: 'Code',
      color: 'bg-blue-500',
      learners: 1234,
    },
    {
      id: 2,
      title: 'Design',
      description: 'UI/UX, Figma, Adobe Creative Suite',
      icon: 'Palette',
      color: 'bg-purple-500',
      learners: 987,
    },
    {
      id: 3,
      title: 'Language',
      description: 'Spanish, French, Mandarin and more',
      icon: 'Globe',
      color: 'bg-green-500',
      learners: 2156,
    },
    {
      id: 4,
      title: 'Marketing',
      description: 'Digital marketing, SEO, Social media',
      icon: 'TrendingUp',
      color: 'bg-orange-500',
      learners: 765,
    },
    {
      id: 5,
      title: 'Photography',
      description: 'Portrait, landscape, product photography',
      icon: 'Camera',
      color: 'bg-pink-500',
      learners: 543,
    },
    {
      id: 6,
      title: 'Music',
      description: 'Guitar, piano, vocals and production',
      icon: 'Music',
      color: 'bg-indigo-500',
      learners: 432,
    },
  ]);

  const [testimonials] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'UX Designer',
      content: 'SkillSwap helped me learn React development in exchange for design mentoring. Amazing platform!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      role: 'Photographer',
      content: 'I traded photography lessons for Spanish conversation practice. Both skills improved dramatically!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emma Wilson',
      role: 'Marketing Specialist',
      content: 'The community here is incredible. I\'ve learned 3 new skills and made lifelong friends.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      rating: 5,
    },
  ]);

  return (
    <>
      <Helmet>
        <title>SkillSwap - Exchange Skills, Grow Together</title>
        <meta name="description" content="Join the world's largest skill exchange platform. Learn new skills while teaching others. Connect, swap, and grow together." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-16 pb-20 bg-gradient-to-br from-primary via-blue-600 to-purple-700">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
              <div className="text-white">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Exchange Skills,
                  <span className="text-yellow-300"> Grow Together</span>
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Join thousands of learners who are trading skills, sharing knowledge, 
                  and building meaningful connections. Learn something new while teaching what you know.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/skill-search-browse"
                    className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-smooth flex items-center justify-center"
                  >
                    Start Learning
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Link>
                  <Link
                    to="/profile-management"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-smooth flex items-center justify-center"
                  >
                    Share Your Skills
                    <Icon name="Share" size={20} className="ml-2" />
                  </Link>
                </div>
                <div className="mt-8 flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold">10K+</div>
                    <div className="text-blue-200">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-blue-200">Skills Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">25K+</div>
                    <div className="text-blue-200">Successful Swaps</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                    alt="People learning together"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg font-semibold">
                  🎉 Join 10,000+ learners
                </div>
                <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Icon name="CheckCircle" size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Skill Swap Complete!</div>
                      <div className="text-sm text-gray-600">React for Photography</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Skills Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Popular Skill Categories
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover what you can learn and teach. From tech skills to creative arts, 
                there's something for everyone in our community.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredSkills?.map((skill) => (
                <Link
                  key={skill.id}
                  to="/skill-search-browse"
                  className="group bg-card border border-border rounded-xl p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 ${skill.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon name={skill.icon} size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">
                    {skill.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {skill.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {skill.learners?.toLocaleString()} learners
                    </span>
                    <Icon name="ArrowRight" size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/skill-search-browse"
                className="inline-flex items-center bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-smooth"
              >
                Explore All Skills
                <Icon name="Search" size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                How SkillSwap Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Getting started is simple. Follow these three easy steps to begin your skill exchange journey.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="UserPlus" size={32} className="text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  1. Create Your Profile
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tell us what skills you have and what you'd like to learn. 
                  Add your experience level and availability preferences.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Search" size={32} className="text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  2. Find Your Match
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Browse through our community of learners and teachers. 
                  Send swap requests to people whose skills complement yours.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="ArrowLeftRight" size={32} className="text-success-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  3. Start Swapping
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Once matched, schedule your sessions and start learning! 
                  Our platform helps you track progress and maintain connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                What Our Community Says
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Real stories from real people who've transformed their skills through our platform.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials?.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-card border border-border rounded-xl p-6 shadow-subtle"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-card-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-card-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 lg:px-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Skill Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of learners who are already exchanging skills and growing together. 
              Your next skill is just a swap away!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login-register"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-smooth flex items-center justify-center"
              >
                Join SkillSwap Today
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Link>
              <Link
                to="/skill-search-browse"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-smooth flex items-center justify-center"
              >
                Browse Skills
                <Icon name="Search" size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DashboardHome;