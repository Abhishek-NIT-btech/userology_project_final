'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';

export function NewsSection() {
  const { articles, status, error } = useSelector((state: RootState) => state.news);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-6 w-6" />
          Crypto News
        </CardTitle>
      </CardHeader>
      <CardContent>
        {status === 'loading' ? (
          <p>Loading news...</p>
        ) : status === 'failed' ? (
          <p className="text-destructive">{error}</p>
        ) : (
          <div className="space-y-4">
            {articles.map((article, index) => (
              <div key={index} className="rounded-lg bg-muted p-4">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  <h3 className="font-semibold">{article.title}</h3>
                </a>
                <p className="text-sm text-muted-foreground mt-2">{article.description}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}