import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type AIQLevel = 'High' | 'Medium' | 'Low' | 'Undetermined';

interface ResultsSummaryProps {
  relevantCount: number;
  answeredQuestionsCount: number; // Number of questions that are either relevant or non-relevant
  overallScreenerNotes: string;
  onOverallScreenerNotesChange: (notes: string) => void;
  className?: string;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  relevantCount,
  answeredQuestionsCount,
  overallScreenerNotes,
  onOverallScreenerNotesChange,
  className,
}) => {
  const [aiqLevel, setAiqLevel] = useState<AIQLevel>('Undetermined');
  const [localNotes, setLocalNotes] = useState<string>(overallScreenerNotes);

  useEffect(() => {
    setLocalNotes(overallScreenerNotes);
  }, [overallScreenerNotes]);

  useEffect(() => {
    if (answeredQuestionsCount === 0) {
      setAiqLevel('Undetermined');
      return;
    }

    const percentage = (relevantCount / answeredQuestionsCount) * 100;

    if (percentage >= 70) {
      setAiqLevel('High');
    } else if (percentage >= 40) {
      setAiqLevel('Medium');
    } else {
      setAiqLevel('Low');
    }
  }, [relevantCount, answeredQuestionsCount]);

  const handleNotesChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalNotes(event.target.value);
  }, []);

  const handleNotesBlur = useCallback(() => {
    onOverallScreenerNotesChange(localNotes);
  }, [localNotes, onOverallScreenerNotesChange]);
  
  const aiqLevels: AIQLevel[] = ['High', 'Medium', 'Low'];

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-lg sm:text-xl">AIQ Assessment Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-1">
            <Label className="text-base sm:text-lg font-semibold text-foreground">AIQ Level:</Label>
            <div className="flex items-center space-x-3 sm:space-x-4 mt-1 sm:mt-0">
              {aiqLevels.map((level) => (
                <div key={level} className="flex items-center space-x-1.5">
                  <Checkbox 
                    id={`level-${level.toLowerCase()}`}
                    checked={aiqLevel === level} 
                    disabled 
                    className="w-4 h-4 sm:w-5 sm:h-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor={`level-${level.toLowerCase()}`} className="text-sm sm:text-base text-foreground">
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          {aiqLevel === 'Undetermined' && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              (Assessment incomplete or all questions marked non-relevant)
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            (Auto calculated based on selections)
          </p>
        </div>

        <div>
          <Label htmlFor="overall-screener-notes" className="text-base font-medium text-foreground">
            Screener Notes / Comments:
          </Label>
          <Textarea
            id="overall-screener-notes"
            value={localNotes}
            onChange={handleNotesChange}
            onBlur={handleNotesBlur}
            placeholder="Enter overall assessment notes here..."
            className="mt-1 h-28 sm:h-32 text-sm"
            rows={5}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsSummary;
