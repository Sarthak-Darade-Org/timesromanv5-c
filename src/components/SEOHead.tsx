
import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  articleMeta?: {
    publishedTime?: string;
    author?: string;
    category?: string;
  };
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Times Roman - AI-Powered News',
  description = 'Next-generation AI-powered news platform delivering fresh, unbiased perspectives on global events.',
  ogImage = 'https://i.ibb.co/Z6ffRH7K/Timesromancir-logo.png',
  ogType = 'website',
  canonical,
  articleMeta
}) => {
  const siteName = 'Times Roman';
  const twitterHandle = '@timesroman';
  
  // Use window.location.href safely by checking if window exists (for SSR compatibility)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonicalUrl = canonical || currentUrl;

  // Ensure description is not too short (minimum 120 characters for SEO)
  const enhancedDescription = description && description.length < 120 
    ? `${description} Read more on Times Roman, the next-generation AI-powered news platform.` 
    : description;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={enhancedDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={enhancedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={enhancedDescription} />
      <meta name="twitter:image" content={ogImage} />
      {/* Ensure preview works on WhatsApp */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Article Specific Meta Tags */}
      {articleMeta && ogType === 'article' && (
        <>
          {articleMeta.publishedTime && (
            <meta property="article:published_time" content={articleMeta.publishedTime} />
          )}
          {articleMeta.author && (
            <meta property="article:author" content={articleMeta.author} />
          )}
          {articleMeta.category && (
            <meta property="article:section" content={articleMeta.category} />
          )}
        </>
      )}
      
      {/* IndexNow API Key Tag */}
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_ID" />
    </Helmet>
  );
};

export default SEOHead;
