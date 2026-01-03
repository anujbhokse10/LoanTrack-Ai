'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLoanContext } from '@/contexts/loan-context';
import { getLoanAnalysis } from '@/lib/actions';
import type { LoanAnalysisOutput } from '@/ai/flows/loan-analysis';
import { Skeleton } from '../ui/skeleton';
import { Lightbulb, ListChecks, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

export default function AiAnalysis() {
  const { loans } = useLoanContext();
  const [analysis, setAnalysis] = useState<LoanAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = async () => {
    if (loans.length === 0) {
        setIsLoading(false);
        setAnalysis({
            overallSummary: "You don't have any active loans being tracked. Add a loan to get started with AI analysis.",
            keyObservations: [],
            recommendations: [],
        });
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await getLoanAnalysis({ loans });
      if (response.success && response.data) {
        setAnalysis(response.data);
      } else {
        setError(response.error ?? 'An unknown error occurred.');
      }
    } catch (e) {
      setError('Failed to connect to the AI service.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loans]);

  const renderLoading = () => (
    <div className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="pt-2 space-y-3">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );

  const renderError = () => (
    <div className="text-center">
        <p className="text-sm text-destructive mb-4">{error}</p>
        <Button onClick={fetchAnalysis}>Retry</Button>
    </div>
  )

  const renderContent = () => {
    if (!analysis) return null;

    return (
        <div className="space-y-4 text-sm">
            <p className="text-muted-foreground italic">{analysis.overallSummary}</p>
            
            {analysis.keyObservations.length > 0 && (
                <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><ListChecks className="h-4 w-4 text-primary"/>Key Observations</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {analysis.keyObservations.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
            )}

            {analysis.recommendations.length > 0 && (
                <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><CheckCircle className="h-4 w-4 text-primary"/>Recommendations</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {analysis.recommendations.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
            )}
        </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            AI Quick Analysis
        </CardTitle>
        <CardDescription>A one-time summary of your loan portfolio.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? renderLoading() : error ? renderError() : renderContent()}
      </CardContent>
    </Card>
  );
}
