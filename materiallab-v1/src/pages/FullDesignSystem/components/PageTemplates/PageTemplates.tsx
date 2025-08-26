import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MLText, MLHeading } from '../../../../components/ML';

interface PageTemplatesProps {
  themeMode: 'light' | 'dark' | 'minimal' | 'maximal';
  isAnimationEnabled: boolean;
}

export const PageTemplates: React.FC<PageTemplatesProps> = ({ themeMode, isAnimationEnabled }) => {
  const [activeTemplate, setActiveTemplate] = useState<string>('dashboard');
  const [previewSize, setPreviewSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const templates = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊', description: 'Analytics & metrics overview' },
    { key: 'landing', label: 'Landing Page', icon: '🏠', description: 'Marketing & conversion focused' },
    { key: 'documentation', label: 'Documentation', icon: '📖', description: 'Knowledge base & guides' },
    { key: 'ecommerce', label: 'E-commerce', icon: '🛒', description: 'Product catalog & checkout' },
    { key: 'profile', label: 'User Profile', icon: '👤', description: 'Account management & settings' },
    { key: 'blog', label: 'Blog', icon: '📝', description: 'Content publishing & reading' }
  ];

  const getPreviewDimensions = () => {
    switch (previewSize) {
      case 'mobile': return { width: '375px', height: '600px' };
      case 'tablet': return { width: '768px', height: '500px' };
      default: return { width: '100%', height: '600px' };
    }
  };

  const renderTemplate = () => {
    const dimensions = getPreviewDimensions();
    
    switch (activeTemplate) {
      case 'dashboard':
        return (
          <div className="fds-template-preview" style={dimensions}>
            <div className="fds-template-content dashboard">
              {/* Header */}
              <div className="template-header">
                <div className="header-left">
                  <h3>Analytics Dashboard</h3>
                  <span className="breadcrumb">Home → Analytics → Overview</span>
                </div>
                <div className="header-right">
                  <button className="header-btn primary">Export</button>
                  <button className="header-btn">Settings</button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="stats-grid">
                {[
                  { label: 'Total Users', value: '24,567', change: '+12%' },
                  { label: 'Revenue', value: '$45,890', change: '+8%' },
                  { label: 'Conversion', value: '3.2%', change: '-2%' },
                  { label: 'Sessions', value: '12,345', change: '+15%' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="stat-label">{stat.label}</div>
                    <div className="stat-value">{stat.value}</div>
                    <div className={`stat-change ${stat.change.startsWith('-') ? 'negative' : 'positive'}`}>
                      {stat.change}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chart Area */}
              <div className="chart-section">
                <div className="chart-header">
                  <h4>Revenue Trends</h4>
                  <div className="chart-controls">
                    <button className="chart-btn active">7D</button>
                    <button className="chart-btn">30D</button>
                    <button className="chart-btn">90D</button>
                  </div>
                </div>
                <div className="chart-placeholder">
                  <motion.div
                    className="chart-line"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />
                  <div className="chart-points">
                    {Array.from({ length: 7 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="chart-point"
                        style={{ left: `${(i / 6) * 100}%` }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="activity-section">
                <h4>Recent Activity</h4>
                <div className="activity-list">
                  {[
                    { user: 'John Doe', action: 'completed purchase', time: '2 min ago' },
                    { user: 'Jane Smith', action: 'created account', time: '5 min ago' },
                    { user: 'Mike Johnson', action: 'updated profile', time: '8 min ago' }
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      className="activity-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="activity-avatar">{activity.user.split(' ').map(n => n[0]).join('')}</div>
                      <div className="activity-content">
                        <span><strong>{activity.user}</strong> {activity.action}</span>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'landing':
        return (
          <div className="fds-template-preview" style={dimensions}>
            <div className="fds-template-content landing">
              {/* Navigation */}
              <nav className="landing-nav">
                <div className="nav-logo">Brand</div>
                <div className="nav-links">
                  <a href="#">Features</a>
                  <a href="#">Pricing</a>
                  <a href="#">About</a>
                  <button className="nav-cta">Get Started</button>
                </div>
              </nav>

              {/* Hero Section */}
              <section className="hero-section">
                <motion.div
                  className="hero-content"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1>Transform Your Business with AI</h1>
                  <p>Powerful automation tools that help you scale faster and work smarter.</p>
                  <div className="hero-actions">
                    <button className="hero-cta primary">Start Free Trial</button>
                    <button className="hero-cta secondary">Watch Demo</button>
                  </div>
                </motion.div>
                <motion.div
                  className="hero-visual"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="hero-mockup"></div>
                </motion.div>
              </section>

              {/* Features Grid */}
              <section className="features-section">
                <h2>Why Choose Our Platform</h2>
                <div className="features-grid">
                  {[
                    { icon: '🚀', title: 'Fast Setup', desc: 'Get started in minutes' },
                    { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security' },
                    { icon: '📈', title: 'Scalable', desc: 'Grows with your business' }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="feature-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="feature-icon">{feature.icon}</div>
                      <h3>{feature.title}</h3>
                      <p>{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* CTA Section */}
              <section className="cta-section">
                <h2>Ready to Get Started?</h2>
                <p>Join thousands of companies already using our platform</p>
                <button className="cta-button">Start Your Free Trial</button>
              </section>
            </div>
          </div>
        );

      case 'documentation':
        return (
          <div className="fds-template-preview" style={dimensions}>
            <div className="fds-template-content documentation">
              {/* Sidebar */}
              <aside className="docs-sidebar">
                <div className="sidebar-header">
                  <h3>Documentation</h3>
                  <input type="search" placeholder="Search docs..." className="search-input" />
                </div>
                <nav className="sidebar-nav">
                  {[
                    { section: 'Getting Started', items: ['Installation', 'Quick Start', 'Configuration'] },
                    { section: 'API Reference', items: ['Authentication', 'Endpoints', 'Examples'] },
                    { section: 'Guides', items: ['Best Practices', 'Tutorials', 'FAQ'] }
                  ].map((section) => (
                    <div key={section.section} className="nav-section">
                      <h4>{section.section}</h4>
                      <ul>
                        {section.items.map((item, index) => (
                          <li key={item} className={index === 0 ? 'active' : ''}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </aside>

              {/* Main Content */}
              <main className="docs-content">
                <div className="content-header">
                  <div className="breadcrumb">Documentation → Getting Started → Installation</div>
                  <button className="edit-btn">Edit Page</button>
                </div>
                
                <article className="docs-article">
                  <h1>Installation Guide</h1>
                  <p>Get up and running with our platform in just a few steps.</p>
                  
                  <div className="content-section">
                    <h2>Prerequisites</h2>
                    <ul>
                      <li>Node.js 18 or higher</li>
                      <li>npm or yarn package manager</li>
                      <li>A modern web browser</li>
                    </ul>
                  </div>

                  <div className="content-section">
                    <h2>Quick Install</h2>
                    <div className="code-block">
                      <div className="code-header">
                        <span>Terminal</span>
                        <button className="copy-btn">Copy</button>
                      </div>
                      <pre><code>npm install @materiallab/sdk</code></pre>
                    </div>
                  </div>

                  <div className="content-section">
                    <h2>Next Steps</h2>
                    <div className="next-steps">
                      <a href="#" className="step-card">
                        <h4>📚 Quick Start Guide</h4>
                        <p>Learn the basics in 5 minutes</p>
                      </a>
                      <a href="#" className="step-card">
                        <h4>🔧 Configuration</h4>
                        <p>Customize your setup</p>
                      </a>
                    </div>
                  </div>
                </article>
              </main>
            </div>
          </div>
        );

      case 'ecommerce':
        return (
          <div className="fds-template-preview" style={dimensions}>
            <div className="fds-template-content ecommerce">
              {/* Header */}
              <header className="ecom-header">
                <div className="header-left">
                  <div className="logo">Store</div>
                  <nav className="main-nav">
                    <a href="#">Home</a>
                    <a href="#" className="active">Products</a>
                    <a href="#">Categories</a>
                    <a href="#">Sale</a>
                  </nav>
                </div>
                <div className="header-right">
                  <button className="search-btn">🔍</button>
                  <button className="cart-btn">🛒 <span className="cart-count">3</span></button>
                  <button className="profile-btn">👤</button>
                </div>
              </header>

              {/* Filters & Products */}
              <div className="ecom-content">
                <aside className="filters-sidebar">
                  <h3>Filters</h3>
                  <div className="filter-group">
                    <h4>Category</h4>
                    <label><input type="checkbox" /> Electronics</label>
                    <label><input type="checkbox" checked /> Clothing</label>
                    <label><input type="checkbox" /> Home</label>
                  </div>
                  <div className="filter-group">
                    <h4>Price Range</h4>
                    <div className="price-range">
                      <input type="range" min="0" max="1000" value="250" />
                      <span>$0 - $250</span>
                    </div>
                  </div>
                  <div className="filter-group">
                    <h4>Brand</h4>
                    <label><input type="checkbox" /> Nike</label>
                    <label><input type="checkbox" checked /> Adidas</label>
                    <label><input type="checkbox" /> Apple</label>
                  </div>
                </aside>

                <main className="products-area">
                  <div className="products-header">
                    <h2>Products (24 results)</h2>
                    <select className="sort-select">
                      <option>Sort by: Popular</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest First</option>
                    </select>
                  </div>

                  <div className="products-grid">
                    {[
                      { name: 'Premium T-Shirt', price: '$29.99', image: '👕', rating: 4.5 },
                      { name: 'Running Shoes', price: '$89.99', image: '👟', rating: 4.8 },
                      { name: 'Wireless Headphones', price: '$149.99', image: '🎧', rating: 4.3 },
                      { name: 'Smart Watch', price: '$199.99', image: '⌚', rating: 4.6 },
                      { name: 'Backpack', price: '$59.99', image: '🎒', rating: 4.4 },
                      { name: 'Sunglasses', price: '$79.99', image: '🕶️', rating: 4.2 }
                    ].map((product, index) => (
                      <motion.div
                        key={index}
                        className="product-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="product-image">{product.image}</div>
                        <div className="product-info">
                          <h4>{product.name}</h4>
                          <div className="product-rating">
                            {'★'.repeat(Math.floor(product.rating))} {product.rating}
                          </div>
                          <div className="product-price">{product.price}</div>
                          <button className="add-to-cart">Add to Cart</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </main>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="fds-template-preview" style={dimensions}>
            <div className="fds-template-content profile">
              {/* Profile Header */}
              <div className="profile-header">
                <div className="profile-cover"></div>
                <div className="profile-info">
                  <div className="avatar">JD</div>
                  <div className="user-details">
                    <h2>John Doe</h2>
                    <p>Product Designer @ MaterialLab</p>
                    <p>San Francisco, CA</p>
                  </div>
                  <button className="edit-profile-btn">Edit Profile</button>
                </div>
              </div>

              {/* Profile Tabs */}
              <div className="profile-tabs">
                <button className="tab active">Overview</button>
                <button className="tab">Projects</button>
                <button className="tab">Activity</button>
                <button className="tab">Settings</button>
              </div>

              {/* Profile Content */}
              <div className="profile-content">
                <div className="left-column">
                  <div className="info-card">
                    <h3>About</h3>
                    <p>Passionate product designer with 5+ years of experience creating user-centered digital experiences.</p>
                  </div>

                  <div className="info-card">
                    <h3>Skills</h3>
                    <div className="skills-list">
                      {['UI/UX Design', 'Figma', 'React', 'TypeScript', 'Design Systems'].map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="info-card">
                    <h3>Contact Info</h3>
                    <div className="contact-item">
                      <span className="contact-label">Email:</span>
                      <span>john@example.com</span>
                    </div>
                    <div className="contact-item">
                      <span className="contact-label">Phone:</span>
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="contact-item">
                      <span className="contact-label">Website:</span>
                      <span>johndoe.design</span>
                    </div>
                  </div>
                </div>

                <div className="right-column">
                  <div className="activity-card">
                    <h3>Recent Activity</h3>
                    <div className="activity-timeline">
                      {[
                        { action: 'Updated portfolio', time: '2 hours ago', type: 'update' },
                        { action: 'Completed project "Mobile App"', time: '1 day ago', type: 'completion' },
                        { action: 'Joined team "Design System"', time: '3 days ago', type: 'join' }
                      ].map((item, index) => (
                        <div key={index} className="timeline-item">
                          <div className={`timeline-dot ${item.type}`}></div>
                          <div className="timeline-content">
                            <p>{item.action}</p>
                            <span className="timeline-time">{item.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="stats-card">
                    <h3>Statistics</h3>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <div className="stat-number">24</div>
                        <div className="stat-label">Projects</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">156</div>
                        <div className="stat-label">Commits</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">89%</div>
                        <div className="stat-label">Success Rate</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">4.8</div>
                        <div className="stat-label">Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="fds-template-preview" style={dimensions}>
            <div className="fds-template-content blog">
              {/* Blog Header */}
              <header className="blog-header">
                <div className="blog-nav">
                  <h1>Design Blog</h1>
                  <nav>
                    <a href="#" className="active">Latest</a>
                    <a href="#">Design</a>
                    <a href="#">Development</a>
                    <a href="#">Tutorials</a>
                  </nav>
                </div>
                <div className="blog-search">
                  <input type="search" placeholder="Search articles..." />
                </div>
              </header>

              {/* Featured Article */}
              <section className="featured-article">
                <div className="featured-image"></div>
                <div className="featured-content">
                  <div className="article-meta">
                    <span className="category">Design Systems</span>
                    <span className="date">March 15, 2024</span>
                  </div>
                  <h2>Building Scalable Design Systems with React</h2>
                  <p>Learn how to create maintainable and scalable design systems that grow with your product and team.</p>
                  <div className="author-info">
                    <div className="author-avatar">JD</div>
                    <div>
                      <div className="author-name">John Doe</div>
                      <div className="read-time">8 min read</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Articles Grid */}
              <section className="articles-section">
                <h2>Latest Articles</h2>
                <div className="articles-grid">
                  {[
                    {
                      title: 'CSS Grid vs Flexbox: When to Use Which',
                      excerpt: 'Understanding the differences and use cases for modern CSS layout methods.',
                      category: 'CSS',
                      author: 'Jane Smith',
                      date: 'Mar 12',
                      readTime: '5 min'
                    },
                    {
                      title: 'The Future of Web Development',
                      excerpt: 'Exploring upcoming trends and technologies that will shape the web.',
                      category: 'Trends',
                      author: 'Mike Johnson',
                      date: 'Mar 10',
                      readTime: '7 min'
                    },
                    {
                      title: 'Accessibility Best Practices',
                      excerpt: 'Essential guidelines for creating inclusive digital experiences.',
                      category: 'A11y',
                      author: 'Sarah Wilson',
                      date: 'Mar 8',
                      readTime: '6 min'
                    }
                  ].map((article, index) => (
                    <motion.article
                      key={index}
                      className="article-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="article-image"></div>
                      <div className="article-content">
                        <div className="article-meta">
                          <span className="category">{article.category}</span>
                          <span className="date">{article.date}</span>
                        </div>
                        <h3>{article.title}</h3>
                        <p>{article.excerpt}</p>
                        <div className="article-footer">
                          <span className="author">{article.author}</span>
                          <span className="read-time">{article.readTime} read</span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </section>

              {/* Newsletter Signup */}
              <section className="newsletter-section">
                <h2>Stay Updated</h2>
                <p>Get the latest articles delivered to your inbox</p>
                <div className="newsletter-form">
                  <input type="email" placeholder="Enter your email" />
                  <button>Subscribe</button>
                </div>
              </section>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fds-page-templates">
      <style>{`
        .fds-page-templates {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .fds-template-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .fds-templates-nav {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
        }

        .fds-template-nav-item {
          background: var(--lss-surface);
          border: 2px solid transparent;
          border-radius: 12px;
          padding: 1rem;
          cursor: pointer;
          transition: all var(--lss-duration-normal) var(--lss-easing);
          text-align: left;
        }

        .fds-template-nav-item:hover {
          background: rgba(255, 107, 74, 0.05);
          border-color: rgba(255, 107, 74, 0.2);
          transform: translateY(-2px);
        }

        .fds-template-nav-item.active {
          border-color: var(--lss-accent);
          background: rgba(255, 107, 74, 0.08);
          transform: translateY(-4px);
        }

        .fds-size-controls {
          display: flex;
          gap: 0.5rem;
        }

        .fds-size-btn {
          padding: 0.5rem 1rem;
          border: 2px solid rgba(255, 107, 74, 0.2);
          border-radius: 8px;
          background: var(--lss-background);
          color: var(--lss-text-primary);
          cursor: pointer;
          font-size: 0.875rem;
          transition: all var(--lss-duration-fast) var(--lss-easing);
        }

        .fds-size-btn.active {
          border-color: var(--lss-accent);
          background: var(--lss-accent);
          color: white;
        }

        .fds-template-container {
          background: var(--lss-surface);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255, 107, 74, 0.1);
          overflow: hidden;
        }

        .fds-template-preview {
          margin: 0 auto;
          border: 1px solid rgba(255, 107, 74, 0.2);
          border-radius: 12px;
          overflow: hidden;
          background: var(--lss-background);
          transition: all var(--lss-duration-normal) var(--lss-easing);
          transform-origin: top center;
        }

        .fds-template-content {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          font-size: 0.75rem;
        }

        /* Dashboard Template Styles */
        .dashboard .template-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 107, 74, 0.1);
        }

        .dashboard .header-left h3 {
          margin: 0 0 0.25rem 0;
          color: var(--lss-text-primary);
          font-size: 1rem;
        }

        .dashboard .breadcrumb {
          color: var(--lss-text-secondary);
          font-size: 0.75rem;
        }

        .dashboard .header-right {
          display: flex;
          gap: 0.5rem;
        }

        .dashboard .header-btn {
          padding: 0.5rem 1rem;
          border: 1px solid rgba(255, 107, 74, 0.3);
          border-radius: 6px;
          background: transparent;
          color: var(--lss-text-primary);
          cursor: pointer;
          font-size: 0.75rem;
        }

        .dashboard .header-btn.primary {
          background: var(--lss-accent);
          color: white;
          border-color: var(--lss-accent);
        }

        .dashboard .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
          padding: 1rem;
        }

        .dashboard .stat-card {
          background: rgba(255, 107, 74, 0.03);
          border: 1px solid rgba(255, 107, 74, 0.1);
          border-radius: 8px;
          padding: 1rem;
        }

        .dashboard .stat-label {
          color: var(--lss-text-secondary);
          font-size: 0.7rem;
          margin-bottom: 0.5rem;
        }

        .dashboard .stat-value {
          color: var(--lss-text-primary);
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .dashboard .stat-change {
          font-size: 0.7rem;
          font-weight: 500;
        }

        .dashboard .stat-change.positive { color: #27ae60; }
        .dashboard .stat-change.negative { color: #e74c3c; }

        .dashboard .chart-section {
          padding: 1rem;
          border-top: 1px solid rgba(255, 107, 74, 0.1);
        }

        .dashboard .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .dashboard .chart-header h4 {
          margin: 0;
          color: var(--lss-text-primary);
          font-size: 0.875rem;
        }

        .dashboard .chart-controls {
          display: flex;
          gap: 0.25rem;
        }

        .dashboard .chart-btn {
          padding: 0.25rem 0.5rem;
          border: 1px solid rgba(255, 107, 74, 0.2);
          border-radius: 4px;
          background: transparent;
          color: var(--lss-text-secondary);
          cursor: pointer;
          font-size: 0.7rem;
        }

        .dashboard .chart-btn.active {
          background: var(--lss-accent);
          color: white;
          border-color: var(--lss-accent);
        }

        .dashboard .chart-placeholder {
          height: 120px;
          background: rgba(255, 107, 74, 0.03);
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }

        .dashboard .chart-line {
          position: absolute;
          top: 50%;
          left: 10%;
          right: 10%;
          height: 2px;
          background: linear-gradient(90deg, #FF6B4A, #FFB84D);
          transform: translateY(-50%);
        }

        .dashboard .chart-points {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .dashboard .chart-point {
          position: absolute;
          top: 50%;
          width: 6px;
          height: 6px;
          background: var(--lss-accent);
          border-radius: 50%;
          transform: translateY(-50%);
        }

        .dashboard .activity-section {
          padding: 1rem;
          border-top: 1px solid rgba(255, 107, 74, 0.1);
        }

        .dashboard .activity-section h4 {
          margin: 0 0 1rem 0;
          color: var(--lss-text-primary);
          font-size: 0.875rem;
        }

        .dashboard .activity-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .dashboard .activity-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .dashboard .activity-avatar {
          width: 32px;
          height: 32px;
          background: var(--lss-accent);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .dashboard .activity-content {
          flex: 1;
        }

        .dashboard .activity-content span {
          display: block;
          font-size: 0.7rem;
        }

        .dashboard .activity-content strong {
          color: var(--lss-text-primary);
        }

        .dashboard .activity-time {
          color: var(--lss-text-secondary);
        }

        /* Landing Page Template Styles */
        .landing .landing-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 107, 74, 0.1);
        }

        .landing .nav-logo {
          font-weight: 700;
          font-size: 1rem;
          color: var(--lss-accent);
        }

        .landing .nav-links {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .landing .nav-links a {
          color: var(--lss-text-secondary);
          text-decoration: none;
          font-size: 0.75rem;
        }

        .landing .nav-cta {
          background: var(--lss-accent);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 0.75rem;
        }

        .landing .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 2rem 1rem;
          align-items: center;
        }

        .landing .hero-content h1 {
          margin: 0 0 1rem 0;
          color: var(--lss-text-primary);
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .landing .hero-content p {
          margin: 0 0 1.5rem 0;
          color: var(--lss-text-secondary);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .landing .hero-actions {
          display: flex;
          gap: 1rem;
        }

        .landing .hero-cta {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .landing .hero-cta.primary {
          background: var(--lss-accent);
          color: white;
          border: none;
        }

        .landing .hero-cta.secondary {
          background: transparent;
          color: var(--lss-text-primary);
          border: 2px solid rgba(255, 107, 74, 0.3);
        }

        .landing .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .landing .hero-mockup {
          width: 120px;
          height: 80px;
          background: linear-gradient(135deg, #FF6B4A, #FFB84D);
          border-radius: 12px;
        }

        .landing .features-section {
          padding: 2rem 1rem;
          background: rgba(255, 107, 74, 0.02);
        }

        .landing .features-section h2 {
          text-align: center;
          margin: 0 0 2rem 0;
          color: var(--lss-text-primary);
          font-size: 1.25rem;
        }

        .landing .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .landing .feature-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          border: 1px solid rgba(255, 107, 74, 0.1);
        }

        .landing .feature-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .landing .feature-card h3 {
          margin: 0 0 0.5rem 0;
          color: var(--lss-text-primary);
          font-size: 0.875rem;
        }

        .landing .feature-card p {
          margin: 0;
          color: var(--lss-text-secondary);
          font-size: 0.75rem;
        }

        .landing .cta-section {
          padding: 2rem 1rem;
          text-align: center;
          background: var(--lss-accent);
          color: white;
        }

        .landing .cta-section h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
        }

        .landing .cta-section p {
          margin: 0 0 1.5rem 0;
          opacity: 0.9;
          font-size: 0.875rem;
        }

        .landing .cta-button {
          background: white;
          color: var(--lss-accent);
          border: none;
          border-radius: 8px;
          padding: 1rem 2rem;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.875rem;
        }

        /* Documentation Template Styles */
        .documentation {
          display: grid;
          grid-template-columns: 250px 1fr;
          height: 100%;
        }

        .documentation .docs-sidebar {
          background: rgba(255, 107, 74, 0.02);
          border-right: 1px solid rgba(255, 107, 74, 0.1);
          padding: 1rem;
        }

        .documentation .sidebar-header h3 {
          margin: 0 0 1rem 0;
          color: var(--lss-text-primary);
          font-size: 0.875rem;
        }

        .documentation .search-input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid rgba(255, 107, 74, 0.2);
          border-radius: 6px;
          background: white;
          font-size: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .documentation .nav-section {
          margin-bottom: 1.5rem;
        }

        .documentation .nav-section h4 {
          margin: 0 0 0.5rem 0;
          color: var(--lss-text-primary);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .documentation .nav-section ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .documentation .nav-section li {
          padding: 0.25rem 0;
          color: var(--lss-text-secondary);
          font-size: 0.7rem;
          cursor: pointer;
        }

        .documentation .nav-section li.active {
          color: var(--lss-accent);
          font-weight: 500;
        }

        .documentation .docs-content {
          padding: 1rem;
          overflow-y: auto;
        }

        .documentation .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 107, 74, 0.1);
        }

        .documentation .breadcrumb {
          color: var(--lss-text-secondary);
          font-size: 0.7rem;
        }

        .documentation .edit-btn {
          background: transparent;
          border: 1px solid rgba(255, 107, 74, 0.3);
          border-radius: 4px;
          padding: 0.25rem 0.75rem;
          color: var(--lss-text-primary);
          cursor: pointer;
          font-size: 0.7rem;
        }

        .documentation .docs-article h1 {
          margin: 0 0 0.5rem 0;
          color: var(--lss-text-primary);
          font-size: 1.25rem;
        }

        .documentation .docs-article > p {
          margin: 0 0 2rem 0;
          color: var(--lss-text-secondary);
          font-size: 0.875rem;
        }

        .documentation .content-section {
          margin-bottom: 2rem;
        }

        .documentation .content-section h2 {
          margin: 0 0 1rem 0;
          color: var(--lss-text-primary);
          font-size: 1rem;
        }

        .documentation .content-section ul {
          margin: 0;
          padding-left: 1rem;
        }

        .documentation .content-section li {
          color: var(--lss-text-secondary);
          font-size: 0.75rem;
          line-height: 1.5;
        }

        .documentation .code-block {
          background: var(--lss-background);
          border: 1px solid rgba(255, 107, 74, 0.2);
          border-radius: 8px;
          overflow: hidden;
          margin: 1rem 0;
        }

        .documentation .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 1rem;
          background: rgba(255, 107, 74, 0.05);
          border-bottom: 1px solid rgba(255, 107, 74, 0.1);
        }

        .documentation .code-header span {
          color: var(--lss-text-secondary);
          font-size: 0.7rem;
        }

        .documentation .copy-btn {
          background: none;
          border: none;
          color: var(--lss-accent);
          cursor: pointer;
          font-size: 0.7rem;
        }

        .documentation .code-block pre {
          margin: 0;
          padding: 1rem;
          font-size: 0.7rem;
          color: var(--lss-text-primary);
          font-family: 'Courier New', monospace;
        }

        .documentation .next-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
        }

        .documentation .step-card {
          background: rgba(255, 107, 74, 0.03);
          border: 1px solid rgba(255, 107, 74, 0.1);
          border-radius: 8px;
          padding: 1rem;
          text-decoration: none;
          transition: all var(--lss-duration-fast) var(--lss-easing);
        }

        .documentation .step-card:hover {
          border-color: var(--lss-accent);
          transform: translateY(-2px);
        }

        .documentation .step-card h4 {
          margin: 0 0 0.5rem 0;
          color: var(--lss-text-primary);
          font-size: 0.75rem;
        }

        .documentation .step-card p {
          margin: 0;
          color: var(--lss-text-secondary);
          font-size: 0.7rem;
        }

        /* E-commerce Template Styles */
        .ecommerce .ecom-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 107, 74, 0.1);
        }

        .ecommerce .header-left {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .ecommerce .logo {
          font-weight: 700;
          font-size: 1rem;
          color: var(--lss-accent);
        }

        .ecommerce .main-nav {
          display: flex;
          gap: 1rem;
        }

        .ecommerce .main-nav a {
          color: var(--lss-text-secondary);
          text-decoration: none;
          font-size: 0.75rem;
          padding: 0.5rem 0;
          border-bottom: 2px solid transparent;
        }

        .ecommerce .main-nav a.active {
          color: var(--lss-accent);
          border-bottom-color: var(--lss-accent);
        }

        .ecommerce .header-right {
          display: flex;
          gap: 1rem;
        }

        .ecommerce .header-right button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          color: var(--lss-text-primary);
          position: relative;
        }

        .ecommerce .cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--lss-accent);
          color: white;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          font-size: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ecommerce .ecom-content {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 1rem;
          padding: 1rem;
        }

        .ecommerce .filters-sidebar {
          background: rgba(255, 107, 74, 0.02);
          border-radius: 8px;
          padding: 1rem;
        }

        .ecommerce .filters-sidebar h3 {
          margin: 0 0 1rem 0;
          color: var(--lss-text-primary);
          font-size: 0.875rem;
        }

        .ecommerce .filter-group {
          margin-bottom: 1.5rem;
        }

        .ecommerce .filter-group h4 {
          margin: 0 0 0.5rem 0;
          color: var(--lss-text-primary);
          font-size: 0.75rem;
        }

        .ecommerce .filter-group label {
          display: block;
          margin-bottom: 0.25rem;
          font-size: 0.7rem;
          color: var(--lss-text-secondary);
          cursor: pointer;
        }

        .ecommerce .price-range {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .ecommerce .price-range input[type="range"] {
          width: 100%;
        }

        .ecommerce .price-range span {
          font-size: 0.7rem;
          color: var(--lss-text-secondary);
        }

        .ecommerce .products-area {
          min-width: 0;
        }

        .ecommerce .products-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .ecommerce .products-header h2 {
          margin: 0;
          color: var(--lss-text-primary);
          font-size: 1rem;
        }

        .ecommerce .sort-select {
          padding: 0.5rem;
          border: 1px solid rgba(255, 107, 74, 0.2);
          border-radius: 6px;
          background: white;
          font-size: 0.7rem;
        }

        .ecommerce .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 1rem;
        }

        .ecommerce .product-card {
          background: white;
          border: 1px solid rgba(255, 107, 74, 0.1);
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
        }

        .ecommerce .product-image {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          background: rgba(255, 107, 74, 0.05);
        }

        .ecommerce .product-info {
          padding: 1rem;
        }

        .ecommerce .product-info h4 {
          margin: 0 0 0.5rem 0;
          color: var(--lss-text-primary);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .ecommerce .product-rating {
          margin-bottom: 0.5rem;
          font-size: 0.6rem;
          color: #ffa500;
        }

        .ecommerce .product-price {
          margin-bottom: 0.75rem;
          color: var(--lss-accent);
          font-weight: 600;
          font-size: 0.75rem;
        }

        .ecommerce .add-to-cart {
          width: 100%;
          background: var(--lss-accent);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.5rem;
          cursor: pointer;
          font-size: 0.7rem;
        }

        /* Profile Template Styles */
        .profile .profile-header {
          position: relative;
          margin-bottom: 1rem;
        }

        .profile .profile-cover {
          height: 120px;
          background: linear-gradient(135deg, #FF6B4A, #FFB84D);
          border-radius: 12px 12px 0 0;
        }

        .profile .profile-info {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border-radius: 0 0 12px 12px;
          border: 1px solid rgba(255, 107, 74, 0.1);
          position: relative;
          margin-top: -40px;
        }

        .profile .avatar {
          width: 80px;
          height: 80px;
          background: var(--lss-accent);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.5rem;
          border: 4px solid white;
          flex-shrink: 0;
        }

        .profile .user-details {
          flex: 1;
        }

        .profile .user-details h2 {
          margin: 0 0 0.25rem 0;
          color: var(--lss-text-primary);
          font-size: 1.25rem;
        }

        .profile .user-details p {
          margin: 0 0 0.25rem 0;
          color: var(--lss-text-secondary);
          font-size: 0.75rem;
        }

        .profile .edit-profile-btn {
          background: var(--lss-accent);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 0.75rem;
        }

        .profile .profile-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 107, 74, 0.1);
        }

        .profile .tab {
          background: none;
          border: none;
          padding: 0.75rem 1rem;
          cursor: pointer;
          font-size: 0.75rem;
          color: var(--lss-text-secondary);
          border-bottom: 2px solid transparent;
        }

        .profile .tab.active {
          color: var(--lss-accent);
          border-bottom-color: var(--lss-accent);
        }

        .profile .profile-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .profile .info-card,
        .profile .activity-card,
        .profile .stats-card {
          background: rgba(255, 107, 74, 0.02);
          border: 1px solid rgba(255, 107, 74, 0.1);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .profile .info-card h3,
        .profile .activity-card h3,
        .profile .stats-card h3 {
          margin: 0 0 1rem 0;
          color: var(--lss-text-primary);
          font-size: 0.875rem;
        }

        .profile .info-card p {
          margin: 0;
          color: var(--lss-text-secondary);
          font-size: 0.75rem;
          line-height: 1.5;
        }

        .profile .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .profile .skill-tag {
          background: rgba(255, 107, 74, 0.1);
          color: var(--lss-accent);
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.7rem;
        }

        .profile .contact-item {
          display: flex;
          margin-bottom: 0.5rem;
        }

        .profile .contact-label {
          font-weight: 500;
          color: var(--lss-text-primary);
          font-size: 0.7rem;
          min-width: 50px;
        }

        .profile .contact-item span:last-child {
          color: var(--lss-text-secondary);
          font-size: 0.7rem;
        }

        .profile .activity-timeline {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .profile .timeline-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .profile .timeline-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 0.25rem;
          flex-shrink: 0;
        }

        .profile .timeline-dot.update { background: #3498db; }
        .profile .timeline-dot.completion { background: #27ae60; }
        .profile .timeline-dot.join { background: #9b59b6; }

        .profile .timeline-content p {
          margin: 0 0 0.25rem 0;
          color: var(--lss-text-primary);
          font-size: 0.7rem;
        }

        .profile .timeline-time {
          color: var(--lss-text-secondary);
          font-size: 0.6rem;
        }

        .profile .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .profile .stat-item {
          text-align: center;
        }

        .profile .stat-number {
          color: var(--lss-accent);
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .profile .stat-label {
          color: var(--lss-text-secondary);
          font-size: 0.7rem;
        }

        /* Blog Template Styles */
        .blog .blog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 107, 74, 0.1);
        }

        .blog .blog-nav h1 {
          margin: 0 0 0.5rem 0;
          color: var(--lss-text-primary);
          font-size: 1.25rem;
        }

        .blog .blog-nav nav {
          display: flex;
          gap: 1rem;
        }

        .blog .blog-nav a {
          color: var(--lss-text-secondary);
          text-decoration: none;
          font-size: 0.75rem;
          padding: 0.25rem 0;
          border-bottom: 2px solid transparent;
        }

        .blog .blog-nav a.active {
          color: var(--lss-accent);
          border-bottom-color: var(--lss-accent);
        }

        .blog .blog-search input {
          padding: 0.5rem;
          border: 1px solid rgba(255, 107, 74, 0.2);
          border-radius: 6px;
          font-size: 0.75rem;
        }

        .blog .featured-article {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          padding: 1rem;
          margin-bottom: 2rem;
        }

        .blog .featured-image {
          height: 150px;
          background: linear-gradient(135deg, #FF6B4A, #FFB84D);
          border-radius: 8px;
        }

        .blog .featured-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .blog .article-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .blog .category {
          background: rgba(255, 107, 74, 0.1);
          color: var(--lss-accent);
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.6rem;
        }

        .blog .date {
          color: var(--lss-text-secondary);
          font-size: 0.6rem;
        }

        .blog .featured-content h2 {
          margin: 0 0 0.5rem 0;
          color: var(--lss-text-primary);
          font-size: 1rem;
          line-height: 1.3;
        }

        .blog .featured-content > p {
          margin: 0 0 1rem 0;
          color: var(--lss-text-secondary);
          font-size: 0.75rem;
          line-height: 1.5;
        }

        .blog .author-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .blog .author-avatar {
          width: 32px;
          height: 32px;
          background: var(--lss-accent);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .blog .author-name {
          font-size: 0.7rem;
          color: var(--lss-text-primary);
          font-weight: 500;
        }

        .blog .read-time {
          font-size: 0.6rem;
          color: var(--lss-text-secondary);
        }

        .blog .articles-section {
          padding: 0 1rem 1rem;
        }

        .blog .articles-section h2 {
          margin: 0 0 1rem 0;
          color: var(--lss-text-primary);
          font-size: 1rem;
        }

        .blog .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .blog .article-card {
          background: white;
          border: 1px solid rgba(255, 107, 74, 0.1);
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
        }

        .blog .article-image {
          height: 80px;
          background: linear-gradient(135deg, #FF6B4A, #B8A4E3);
        }

        .blog .article-content {
          padding: 1rem;
        }

        .blog .article-content h3 {
          margin: 0 0 0.5rem 0;
          color: var(--lss-text-primary);
          font-size: 0.75rem;
          line-height: 1.3;
        }

        .blog .article-content > p {
          margin: 0 0 1rem 0;
          color: var(--lss-text-secondary);
          font-size: 0.7rem;
          line-height: 1.4;
        }

        .blog .article-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .blog .author,
        .blog .read-time {
          font-size: 0.6rem;
          color: var(--lss-text-secondary);
        }

        .blog .newsletter-section {
          background: rgba(255, 107, 74, 0.05);
          padding: 2rem 1rem;
          text-align: center;
          margin: 2rem 1rem 1rem;
          border-radius: 8px;
        }

        .blog .newsletter-section h2 {
          margin: 0 0 0.5rem 0;
          color: var(--lss-text-primary);
          font-size: 1rem;
        }

        .blog .newsletter-section p {
          margin: 0 0 1rem 0;
          color: var(--lss-text-secondary);
          font-size: 0.75rem;
        }

        .blog .newsletter-form {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          max-width: 300px;
          margin: 0 auto;
        }

        .blog .newsletter-form input {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid rgba(255, 107, 74, 0.2);
          border-radius: 6px;
          font-size: 0.75rem;
        }

        .blog .newsletter-form button {
          background: var(--lss-accent);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 0.75rem;
        }

        @media (max-width: 768px) {
          .fds-templates-nav {
            grid-template-columns: 1fr;
          }

          .dashboard .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .landing .hero-section,
          .landing .features-grid {
            grid-template-columns: 1fr;
          }

          .documentation {
            grid-template-columns: 1fr;
          }

          .documentation .docs-sidebar {
            display: none;
          }

          .ecommerce .ecom-content {
            grid-template-columns: 1fr;
          }

          .ecommerce .filters-sidebar {
            order: 2;
          }

          .profile .profile-content {
            grid-template-columns: 1fr;
          }

          .blog .featured-article {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="fds-section-header">
        <MLHeading level="2">Page Templates</MLHeading>
        <MLText>
          Complete page layouts optimized for different use cases and user journeys
        </MLText>
      </div>

      <div className="fds-template-controls">
        <nav className="fds-templates-nav">
          {templates.map((template) => (
            <button
              key={template.key}
              className={`fds-template-nav-item ${activeTemplate === template.key ? 'active' : ''}`}
              onClick={() => setActiveTemplate(template.key)}
            >
              <span className="fds-nav-item-icon">{template.icon}</span>
              <span className="fds-nav-item-label">{template.label}</span>
              <span className="fds-nav-item-description">{template.description}</span>
            </button>
          ))}
        </nav>

        <div className="fds-size-controls">
          {(['desktop', 'tablet', 'mobile'] as const).map((size) => (
            <button
              key={size}
              className={`fds-size-btn ${previewSize === size ? 'active' : ''}`}
              onClick={() => setPreviewSize(size)}
            >
              {size === 'desktop' ? '🖥️' : size === 'tablet' ? '📱' : '📱'}
              {size}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className="fds-template-container"
        key={`${activeTemplate}-${previewSize}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {renderTemplate()}
      </motion.div>
    </div>
  );
};