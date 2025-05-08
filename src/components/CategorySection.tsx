
import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

// Lazy load ArticleCard
const ArticleCard = lazy(() => import('./ArticleCard'));

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  readTime?: string;
}

interface CategorySectionProps {
  title: string;
  categoryPath: string;
  articles: Article[];
  loading?: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  categoryPath,
  articles,
  loading = false,
}) => {
  // Get gradient background based on title
  const getGradientClass = () => {
    switch (title.toLowerCase()) {
      case 'technology': return 'gradient-bg-1';
      case 'business': return 'gradient-bg-2';
      case 'health': return 'gradient-bg-3';
      case 'politics': return 'gradient-bg-4';
      case 'entertainment': return 'gradient-bg-5';
      case 'science': return 'gradient-bg-6';
      default: return '';
    }
  };

  return (
    <section className={`py-8 md:py-12 ${getGradientClass()}`}>
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8 flex items-center justify-between flex-wrap animate-[fadeIn_0.5s_ease-in-out]">
          <h2 className="font-serif text-2xl md:text-3xl font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-1 after:bg-blue-600">
            {title}
          </h2>
          <Link to={categoryPath} className="mt-2 md:mt-0">
            <Button variant="default" size="sm" className="text-sm bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            // Loading skeletons
            [...Array(3)].map((_, index) => (
              <div 
                key={`loading-${index}`} 
                className="animate-pulse rounded-lg overflow-hidden shadow-sm"
              >
                <div className="aspect-[16/10] bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Actual articles
            <>
              <Suspense fallback={<div className="col-span-full flex justify-center py-12"><div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div></div>}>
                {articles.map((article, index) => (
                  <div 
                    key={article.id} 
                    className="animate-[fadeIn_0.5s_ease-in-out]" 
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ArticleCard {...article} />
                  </div>
                ))}
              </Suspense>
              {articles.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No articles in this category yet.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
