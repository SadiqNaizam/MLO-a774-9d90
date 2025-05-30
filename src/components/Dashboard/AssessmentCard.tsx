import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Interface for the assessment question item data structure
export interface AssessmentQuestionItem {
  id: string; // Unique ID for the question
  number: string; // e.g., "01"
  text: string;
  guidance: string;
  relevance: 'relevant' | 'non-relevant' | null;
  comments: string; // Per-question comments
}

// Props interface for the AssessmentCard component
interface AssessmentCardProps {
  item: AssessmentQuestionItem;
  onItemChange: (updatedItem: AssessmentQuestionItem) => void;
  className?: string;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  item,
  onItemChange,
  className,
}) => {
  const handleRelevanceOptionClick = useCallback(
    (option: 'relevant' | 'non-relevant') => {
      const newRelevance = item.relevance === option ? null : option;
      onItemChange({ ...item, relevance: newRelevance });
    },
    [item, onItemChange]
  );

  const handleCommentsChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onItemChange({ ...item, comments: e.target.value });
    },
    [item, onItemChange]
  );

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-x-3 sm:gap-x-4">
          <span className="text-primary font-semibold text-lg sm:text-xl pt-0.5">
            {item.number}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-foreground leading-snug text-sm sm:text-base">
              {item.text}
            </p>
            {item.guidance && (
              <p className="text-muted-foreground text-xs sm:text-sm mt-1 italic">
                {item.guidance}
              </p>
            )}
          </div>
          <div className="flex space-x-3 sm:space-x-4 pl-2 sm:pl-4">
            <div className="flex flex-col items-center space-y-1.5 w-12 sm:w-16">
              {/* The actual "Relevant" / "Non-Relevant" labels are assumed to be column headers in the parent list view as per image style */} 
              {/* However, for accessibility and context if card is used standalone, aria-label is important. */} 
              {/* Based on image, direct labels are not per-checkbox if column headers exist. */} 
              <Checkbox
                id={`relevant-${item.id}`}
                aria-label={`Mark question ${item.number} as relevant`}
                checked={item.relevance === 'relevant'}
                onCheckedChange={() => handleRelevanceOptionClick('relevant')}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </div>
            <div className="flex flex-col items-center space-y-1.5 w-12 sm:w-16">
              <Checkbox
                id={`nonrelevant-${item.id}`}
                aria-label={`Mark question ${item.number} as non-relevant`}
                checked={item.relevance === 'non-relevant'}
                onCheckedChange={() => handleRelevanceOptionClick('non-relevant')}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </div>
          </div>
        </div>
        
        {/* NotesSection: Comments field for individual questions */}
        <div className="pt-2">
          <Label htmlFor={`comments-${item.id}`} className="text-xs sm:text-sm font-medium text-muted-foreground">
            Comments for Q{item.number}:
          </Label>
          <Textarea
            id={`comments-${item.id}`}
            value={item.comments}
            onChange={handleCommentsChange}
            placeholder="Add specific comments for this question..."
            className="mt-1 h-20 text-sm"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentCard;
