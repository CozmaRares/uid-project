/* eslint-disable @typescript-eslint/no-explicit-any */

import { Title, TitleContainer } from "@/components/Title";
import { surveysWithProgress } from "@/lib/data/surveys";
import { createFileRoute } from "@tanstack/react-router";
import SurveyStep from "@/components/SurveyStep";
import { Survey, SurveyProgress } from "@/lib/data/surveys";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/survey/")({
  component: RouteComponent,
  validateSearch: (params: Record<string, unknown>) => {
    return {
      survey: params.survey as string | undefined,
    };
  },
});

function RouteComponent() {
  const { survey: surveyID } = Route.useSearch();

  return (
    <main className="bounded-container">
      <TitleContainer
        variant="page"
        className="mb-8"
      >
        <Title>Available Surveys</Title>
      </TitleContainer>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {surveysWithProgress.map(({ survey, progress }) => (
          <SurveyCard
            key={survey.id}
            survey={survey}
            initialProgress={progress}
            isActive={survey.id === surveyID}
          />
        ))}
      </div>
    </main>
  );
}

type SurveyCardProps = {
  survey: Survey;
  initialProgress?: SurveyProgress;
  isActive: boolean;
};

function SurveyCard({ survey, initialProgress, isActive }: SurveyCardProps) {
  const [open, setOpen] = useState(isActive);
  const [progress, setProgress] = useState<
    SurveyProgress & { currentStep: number }
  >(() => {
    if (!initialProgress)
      return {
        currentStep: 0,
        responses: new Map(),
        completedSteps: 0,
      };

    const isFinished = initialProgress.completedSteps === survey.steps.length;
    return {
      ...initialProgress,
      currentStep: isFinished ? 0 : initialProgress.completedSteps,
    };
  });

  const currentStep = survey.steps[progress.currentStep];

  const handleNext = () => {
    if (progress.currentStep < survey.steps.length - 1) {
      setProgress(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1,
        completedSteps: Math.max(prev.completedSteps, prev.currentStep + 1),
      }));
    }
  };

  const handlePrevious = () => {
    if (progress.currentStep > 0) {
      setProgress(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const handleResponse = (questionId: string, response: any) => {
    setProgress(prev => ({
      ...prev,
      responses: new Map(prev.responses).set(questionId, response),
    }));
  };

  const handleFinish = () => {
    toast.success("Survey completed!");
    setOpen(false);
  };

  const isStepComplete = () => {
    return currentStep.questions.every(
      q => !q.required || progress.responses.has(q.id),
    );
  };

  const isAtFinish = progress.currentStep === survey.steps.length - 1;

  return (
    <Card key={survey.id}>
      <CardHeader>
        <CardTitle>{survey.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {survey.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <span className="text-muted-foreground">
            {survey.steps.length} question{survey.steps.length != 1 && "s"}
          </span>
          <span className="text-primary">
            {((progress.completedSteps / survey.steps.length) * 100).toFixed(0)}
            % completed
          </span>
        </div>
        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <DialogTrigger asChild>
            <Button>
              {progress.completedSteps == 0 ? "Start Survey" : "Continue"}
            </Button>
          </DialogTrigger>
          <DialogContent className="md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg">
            <div className="my-2 max-h-[80vh] w-full overflow-auto px-2">
              <div className="space-y-8 px-4">
                <DialogHeader>
                  <DialogTitle>{survey.title}</DialogTitle>
                  <DialogDescription className="">
                    {survey.description}
                  </DialogDescription>
                  <Progress
                    value={
                      ((progress.currentStep + 1) / survey.steps.length) * 100
                    }
                    className="h-2"
                  />
                </DialogHeader>
                <SurveyStep
                  step={currentStep}
                  responses={progress.responses}
                  onResponse={handleResponse}
                />
                <DialogFooter className="flex w-full flex-row justify-end">
                  <Button
                    onClick={handlePrevious}
                    disabled={progress.currentStep === 0}
                    className="flex-grow md:flex-grow-0"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={isAtFinish ? handleFinish : handleNext}
                    disabled={!isStepComplete()}
                    className="flex-grow md:flex-grow-0"
                  >
                    {isAtFinish ? "Finish" : "Next"}
                  </Button>
                </DialogFooter>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
