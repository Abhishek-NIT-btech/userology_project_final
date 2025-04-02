'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bitcoin } from 'lucide-react';

export function CryptoSection() {
  const crypto = useSelector((state: RootState) => state.crypto.currencies);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bitcoin className="h-6 w-6" />
          Cryptocurrency
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(crypto).map(([id, data]) => (
            <div key={id} className="rounded-lg bg-muted p-4">
              {data.loading ? (
                <p>Loading...</p>
              ) : data.error ? (
                <p className="text-destructive">{data.error}</p>
              ) : (
                <div>
                  <h3 className="font-semibold capitalize">{id}</h3>
                  <p className="text-2xl font-bold">
                    ${data.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-muted-foreground">
                    24h Change:{' '}
                    <span className={data.change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {data.change24h.toFixed(2)}%
                    </span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}