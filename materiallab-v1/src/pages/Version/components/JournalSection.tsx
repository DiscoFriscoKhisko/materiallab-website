import React from 'react';
import { motion } from 'framer-motion';

interface Article {
  category: 'Chronicle' | 'Experiment' | 'Insight';
  title: string;
  subtitle: string;
  readTime: string;
  preview: string;
  publishedAt: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    category: 'Chronicle',
    title: 'The Museum That Learned to Feel',
    subtitle: 'How we transformed a 200-year-old institution into an interactive storyteller',
    readTime: '8 min read',
    preview: 'When the Metropolitan Arts Foundation approached us, they had a problem: their priceless collection felt lifeless to digital natives. We didn\'t just digitize their art—we gave it a voice.',
    publishedAt: '2024-03-15',
    featured: true
  },
  {
    category: 'Experiment',
    title: 'AI That Sketches With You',
    subtitle: 'Building a drawing companion that thinks like an artist',
    readTime: '5 min read',
    preview: 'What if AI didn\'t just generate art, but collaborated with you in real-time? Our latest experiment pairs human intention with machine intuition.',
    publishedAt: '2024-03-10'
  },
  {
    category: 'Insight',
    title: 'The Uncanny Valley of Interaction',
    subtitle: 'Why the best AI feels completely human',
    readTime: '6 min read',
    preview: 'There\'s a moment in every great human-AI interaction when you forget you\'re talking to a machine. Here\'s how we engineer that feeling.',
    publishedAt: '2024-03-05'
  },
  {
    category: 'Chronicle', 
    title: 'Designing Curiosity: The Learning Platform That Adapts',
    subtitle: 'From 20% engagement to 89% retention in 6 months',
    readTime: '10 min read',
    preview: 'EduTech startup Mindbridge needed more than a platform—they needed to reignite the joy of learning. Here\'s how we built an AI that makes education addictive.',
    publishedAt: '2024-02-28'
  },
  {
    category: 'Experiment',
    title: 'The Color That Doesn\'t Exist',
    subtitle: 'Generating impossible hues with machine perception',
    readTime: '4 min read',
    preview: 'What colors can AI see that humans cannot? Our latest visual experiment pushes the boundaries of perception and possibility.',
    publishedAt: '2024-02-22'
  },
  {
    category: 'Insight',
    title: 'Beyond the Prompt: The Future of AI Interaction',
    subtitle: 'Why conversation is just the beginning',
    readTime: '7 min read',
    preview: 'Everyone\'s building chatbots. We\'re building something deeper: interfaces that understand context, intent, and intuition.',
    publishedAt: '2024-02-15'
  }
];

export const JournalSection: React.FC = () => {
  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Chronicle': return '#FF6B5D';
      case 'Experiment': return '#4DA6FF';
      case 'Insight': return '#52E5B7';
      default: return '#B8A4E3';
    }
  };

  return (
    <section id="journal" className="version-section journal-section">
      <div className="version-container">
        {/* Section Header */}
        <div className="section-header">
          <motion.h2
            className="version-headline"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
          >
            Our Journal
          </motion.h2>
          <motion.p
            className="version-body section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
          >
            Stories from the intersection of human creativity and artificial intelligence. 
            Behind-the-scenes looks at our process, experiments, and discoveries.
          </motion.p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <motion.article
            className="featured-article version-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <div className="article-meta">
              <span 
                className="article-category"
                style={{ color: getCategoryColor(featuredArticle.category) }}
              >
                {featuredArticle.category}
              </span>
              <span className="article-featured">✨ Featured Story</span>
              <span className="article-date">{featuredArticle.publishedAt}</span>
            </div>
            
            <h3 className="article-title">{featuredArticle.title}</h3>
            <h4 className="article-subtitle">{featuredArticle.subtitle}</h4>
            <p className="article-preview">{featuredArticle.preview}</p>
            
            <div className="article-footer">
              <span className="read-time">{featuredArticle.readTime}</span>
              <button className="read-more-btn">
                Read the Story
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </button>
            </div>
          </motion.article>
        )}

        {/* Articles Grid */}
        <div className="articles-grid">
          {regularArticles.map((article, index) => (
            <motion.article
              key={article.title}
              className="article-card version-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1 + 0.4, 
                ease: [0.4, 0, 0.2, 1] 
              }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <div className="article-meta">
                <span 
                  className="article-category"
                  style={{ color: getCategoryColor(article.category) }}
                >
                  {article.category}
                </span>
                <span className="article-date">{article.publishedAt}</span>
              </div>
              
              <h3 className="article-title">{article.title}</h3>
              <h4 className="article-subtitle">{article.subtitle}</h4>
              <p className="article-preview">{article.preview}</p>
              
              <div className="article-footer">
                <span className="read-time">{article.readTime}</span>
                <button className="read-more-btn">
                  Read More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Journal Stats */}
        <motion.div
          className="journal-stats"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">127</div>
              <div className="stat-label">Experiments Shared</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24</div>
              <div className="stat-label">Collaboration Chronicles</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15K</div>
              <div className="stat-label">Curious Readers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Ideas in Progress</div>
            </div>
          </div>
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          className="newsletter-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          <h3>Stay Curious</h3>
          <p>Get our latest experiments, insights, and stories delivered to your inbox.</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="What should we call you?"
              className="newsletter-input"
            />
            <button className="version-btn version-btn-primary newsletter-btn">
              Join the Inner Circle
            </button>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .journal-section {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.01) 0%,
            rgba(184, 164, 227, 0.02) 50%,
            rgba(255, 255, 255, 0.01) 100%
          );
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-subtitle {
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.125rem;
        }

        .featured-article {
          margin-bottom: 4rem;
          padding: 3rem;
          position: relative;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.02) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .featured-article::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #FF6B5D, #4DA6FF, #52E5B7);
          border-radius: 1.5rem 1.5rem 0 0;
        }

        .article-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .article-category {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .article-featured {
          font-size: 0.875rem;
          color: #FFE55C;
          font-weight: 500;
        }

        .article-date {
          font-size: 0.875rem;
          color: var(--text-secondary);
          opacity: 0.7;
          margin-left: auto;
        }

        .article-title {
          font-size: 2rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }

        .article-subtitle {
          font-size: 1.25rem;
          font-weight: 400;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }

        .article-preview {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .article-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .read-time {
          font-size: 0.875rem;
          color: var(--text-secondary);
          opacity: 0.7;
        }

        .read-more-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: var(--text-primary);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0.5rem 0;
        }

        .read-more-btn:hover {
          color: #4DA6FF;
          transform: translateX(4px);
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .article-card {
          padding: 2rem;
          height: fit-content;
        }

        .article-card .article-title {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .article-card .article-subtitle {
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .article-card .article-preview {
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        .journal-stats {
          margin: 4rem 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          backdrop-filter: blur(20px);
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 300;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .newsletter-cta {
          text-align: center;
          padding: 3rem 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          backdrop-filter: blur(20px);
        }

        .newsletter-cta h3 {
          font-size: 1.75rem;
          font-weight: 300;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .newsletter-cta p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .newsletter-form {
          display: flex;
          gap: 1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .newsletter-input {
          flex: 1;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 2rem;
          color: var(--text-primary);
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .newsletter-input:focus {
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.08);
        }

        .newsletter-input::placeholder {
          color: var(--text-secondary);
          opacity: 0.7;
        }

        .newsletter-btn {
          padding: 1rem 2rem;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .featured-article,
          .article-card {
            padding: 2rem 1.5rem;
          }

          .article-title {
            font-size: 1.5rem;
          }

          .featured-article .article-title {
            font-size: 1.75rem;
          }

          .articles-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .newsletter-form {
            flex-direction: column;
          }

          .article-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .article-date {
            margin-left: 0;
          }
        }
      `}</style>
    </section>
  );
};