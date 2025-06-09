import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable Data Pipelines with Apache Spark",
      excerpt: "Learn how to design and implement robust data pipelines that can handle massive datasets efficiently.",
      date: "2025-01-15",
      readTime: "8 min read",
      tags: ["Spark", "Data Engineering", "ETL"]
    },
    {
      id: 2,
      title: "Modern Data Stack: dbt, Snowflake, and Beyond",
      excerpt: "Exploring the modern data stack and how tools like dbt are revolutionizing data transformation.",
      date: "2025-01-10",
      readTime: "6 min read",
      tags: ["dbt", "Snowflake", "Analytics"]
    },
    {
      id: 3,
      title: "Real-time Data Processing with Kafka Streams",
      excerpt: "Deep dive into stream processing patterns and best practices for real-time data applications.",
      date: "2025-01-05",
      readTime: "10 min read",
      tags: ["Kafka", "Streaming", "Real-time"]
    }
  ];

  return (
    <section id="blog" className="py-16 bg-primary-section/20">
      <div className="section-container">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-primary-accent">Blog</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="section-bg p-6 card-hover animate-slide-up"
            >
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold mb-3 text-primary-accent hover:text-yellow-400 transition-colors">
                <a href={`#blog-post-${post.id}`}>
                  {post.title}
                </a>
              </h3>
              
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary-bg text-primary-accent text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <a
                href={`#blog-post-${post.id}`}
                className="inline-flex items-center gap-2 text-primary-accent hover:text-yellow-400 transition-colors text-sm font-medium"
              >
                Read More
                <ArrowRight size={14} />
              </a>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a
            href="#blog"
            className="btn-primary inline-block"
          >
            View All Posts
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;