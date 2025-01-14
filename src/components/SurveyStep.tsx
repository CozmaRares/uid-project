/* eslint-disable @typescript-eslint/no-explicit-any */

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import type {
  SurveyStep as SurveyStepType,
  SurveyQuestion as SurveyQuestionType,
} from "@/lib/data/surveys";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ReactNode } from "react";

export default function SurveyStep({
  step,
  responses,
  onResponse,
}: {
  step: SurveyStepType;
  responses: Map<string, any>;
  onResponse: (questionId: string, response: any) => void;
}) {
  const questionComponent = (question: SurveyQuestionType) => {
    let component: ReactNode;

    switch (question.type) {
      case "text":
        component = (
          <TextInput
            question={question}
            response={responses.get(question.id)}
            onResponse={onResponse}
          />
        );
        break;
      case "choice":
        component = (
          <RadioInput
            question={question}
            response={responses.get(question.id)}
            onResponse={onResponse}
          />
        );
        break;
      case "number":
        component = (
          <NumberInput
            question={question}
            response={responses.get(question.id)}
            onResponse={onResponse}
          />
        );
        break;
      case "date":
        component = (
          <DateInput
            question={question}
            response={responses.get(question.id)}
            onResponse={onResponse}
          />
        );
        break;
      default:
        component = null;
    }

    return (
      <div
        key={question.id}
        className="space-y-4"
      >
        <Label htmlFor={question.id}>
          {question.question}{" "}
          {question.required && <span className="text-secondary">*</span>}
        </Label>
        {component}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{step.title}</h2>
        {step.description && (
          <p className="text-muted-foreground">{step.description}</p>
        )}
        <div className="text-sm text-muted-foreground">
          Required fields are marked with{" "}
          <span className="text-secondary">*</span>
        </div>
      </div>
      {step.questions.map(questionComponent)}
    </div>
  );
}

function RadioInput({
  question,
  response,
  onResponse,
}: {
  question: Extract<SurveyQuestionType, { type: "choice" }>;
  response: string | undefined;
  onResponse: (questionId: string, response: string) => void;
}) {
  return (
    <RadioGroup
      value={response}
      onValueChange={value => onResponse(question.id, value)}
    >
      {question.options.map((option, index) => (
        <div
          key={index}
          className="flex items-center space-x-2"
        >
          <RadioGroupItem
            value={option}
            id={`${question.id}-${index}`}
            className="space-y-3"
          />
          <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}

export function DateInput({
  question,
  response,
  onResponse,
}: {
  question: Extract<SurveyQuestionType, { type: "date" }>;
  response: Date | undefined;
  onResponse: (questionId: string, response: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "group flex w-full pl-3 text-left font-normal hover:bg-inherit",
            !response && "text-muted-foreground",
          )}
        >
          {response ? format(response, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50 group-hover:opacity-100" />
        </Button>
      </PopoverTrigger>

      <PopoverPrimitive.Content
        align="start"
        sideOffset={4}
        className="z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      >
        <Calendar
          mode="single"
          selected={response}
          onSelect={date => onResponse(question.id, date)}
          disabled={date => date > new Date() || date < new Date("2020-01-01")}
          initialFocus
        />
      </PopoverPrimitive.Content>
    </Popover>
  );
}

export function NumberInput({
  question,
  response,
  onResponse,
}: {
  question: Extract<SurveyQuestionType, { type: "number" }>;
  response: number | undefined;
  onResponse: (questionId: string, response: number) => void;
}) {
  return (
    <Input
      type="number"
      id={question.id}
      value={response !== undefined ? response : question.defaultValue}
      onChange={e => onResponse(question.id, Number(e.target.value))}
      required={question.required}
    />
  );
}

export function TextInput({
  question,
  response,
  onResponse,
}: {
  question: Extract<SurveyQuestionType, { type: "text" }>;
  response: string | undefined;
  onResponse: (questionId: string, response: string) => void;
}) {
  return (
    <Input
      type="text"
      id={question.id}
      placeholder={question.placeholder}
      value={response || ""}
      onChange={e => onResponse(question.id, e.target.value)}
      required={question.required}
    />
  );
}
