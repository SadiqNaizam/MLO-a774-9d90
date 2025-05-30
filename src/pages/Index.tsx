import React, { useState, useCallback, useMemo } from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import AssessmentCard, { AssessmentQuestionItem } from '../components/Dashboard/AssessmentCard';
import ResultsSummary from '../components/Dashboard/ResultsSummary';

// Initial data for assessment questions, based on the provided image/OCR
const initialAssessmentItems: AssessmentQuestionItem[] = [
  {
    id: 'q1',
    number: '01',
    text: '"Tell me about a time when you adopted a new technology or tool on your own. What motivated you, and what was the result?"',
    guidance: '(Looks for curiosity and initiative)',
    relevance: null,
    comments: '',
  },
  {
    id: 'q2',
    number: '02',
    text: '"How do you stay up to date with new trends or tools in your field? Have you come across anything AI-related?"',
    guidance: '(Assesses awareness and interest)',
    relevance: null,
    comments: '',
  },
  {
    id: 'q3',
    number: '03',
    text: '"Have you experimented with any AI tools, even casually? (e.g., ChatGPT, image generators, automation bots)"',
    guidance: '(Gauges willingness to experiment)',
    relevance: null,
    comments: '',
  },
  {
    id: 'q4',
    number: '04',
    text: '"Can you think of a repetitive or time-consuming task in your role that could benefit from automation or AI?"',
    guidance: '(Tests ability to identify practical AI opportunities)',
    relevance: null,
    comments: '',
  },
  {
    id: 'q5',
    number: '05',
    text: '"Tell me about a time you had to change your way of working because of a new process or tool. How did you respond?"',
    guidance: '(Evaluates adaptability)',
    relevance: null,
    comments: '',
  },
  {
    id: 'q6',
    number: '06',
    text: '"Can you open an AI tool of your choice and show me how you would use it to solve something or get a result? Pls walk me through the process, step by step"',
    guidance: '(Demonstrates practical application and problem-solving skills)', // Placeholder guidance as none in image
    relevance: null,
    comments: '',
  },
];

const AssessmentDashboardPage: React.FC = () => {
  const [assessmentItems, setAssessmentItems] = useState<AssessmentQuestionItem[]>(initialAssessmentItems);
  const [overallScreenerNotes, setOverallScreenerNotes] = useState<string>('');

  const handleItemChange = useCallback((updatedItem: AssessmentQuestionItem) => {
    setAssessmentItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  }, []);

  const handleOverallScreenerNotesChange = useCallback((notes: string) => {
    setOverallScreenerNotes(notes);
  }, []);

  const relevantCount = useMemo(() => {
    return assessmentItems.filter((item) => item.relevance === 'relevant').length;
  }, [assessmentItems]);

  const answeredQuestionsCount = useMemo(() => {
    return assessmentItems.filter((item) => item.relevance !== null).length;
  }, [assessmentItems]);

  return (
    <MainAppLayout>
      {/* Column Headers for Relevant/Non-Relevant Checkboxes */}
      {/* These headers are aligned to match the checkbox positioning within AssessmentCard */}
      {/* pr-4 to align with CardContent's right padding */}
      {/* The inner div with pl-2/sm:pl-4 and space-x mimics AssessmentCard's checkbox container */}
      <div className="flex justify-end mb-2 pr-4">
        <div className="flex items-center space-x-3 sm:space-x-4 pl-2 sm:pl-4">
          <p className="w-12 sm:w-16 text-center text-sm font-medium text-muted-foreground">Relevant</p>
          <p className="w-12 sm:w-16 text-center text-sm font-medium text-muted-foreground">Non-Relevant</p>
        </div>
      </div>

      {/* List of Assessment Cards */}
      {/* The gap-6 for these cards is provided by MainAppLayout's main content container */}
      <div className="space-y-4"> {/* Ensures consistent spacing if MainAppLayout's gap isn't sufficient or for other reasons */}
        {assessmentItems.map((item) => (
          <AssessmentCard
            key={item.id}
            item={item}
            onItemChange={handleItemChange}
          />
        ))}
      </div>

      {/* Results Summary Section */}
      <ResultsSummary
        relevantCount={relevantCount}
        answeredQuestionsCount={answeredQuestionsCount}
        overallScreenerNotes={overallScreenerNotes}
        onOverallScreenerNotesChange={handleOverallScreenerNotesChange}
        className="mt-2 sm:mt-4" // Reduced top margin as MainAppLayout provides gap-6 already
      />
    </MainAppLayout>
  );
};

export default AssessmentDashboardPage;
