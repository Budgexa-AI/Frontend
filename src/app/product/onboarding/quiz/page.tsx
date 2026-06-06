"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

const questions = [
  {
    id: "tracking",
    question: "How do you currently manage your money?",
    description:
      "Choose the option that best describes your current financial habits.",
    options: [
      {
        label: "I don’t really track my finances",
        points: 1,
      },
      {
        label: "I use notes or spreadsheets sometimes",
        points: 2,
      },
      {
        label: "I use banking or budgeting apps regularly",
        points: 3,
      },
      {
        label: "I actively plan and budget every month",
        points: 4,
      },
    ],
  },

  {
    id: "confidence",
    question: "How confident are you managing your finances?",
    description:
      "This helps us adjust your dashboard complexity and guidance.",
    options: [
      {
        label: "Not very confident",
        points: 1,
      },
      {
        label: "Somewhat confident",
        points: 2,
      },
      {
        label: "Confident",
        points: 3,
      },
      {
        label: "Very confident",
        points: 4,
      },
    ],
  },

  {
    id: "savings",
    question: "How often do you save intentionally?",
    description:
      "Savings habits help determine which budgeting style fits you best.",
    options: [
      {
        label: "Rarely",
        points: 1,
      },
      {
        label: "Occasionally",
        points: 2,
      },
      {
        label: "Frequently",
        points: 3,
      },
      {
        label: "Automatically every month",
        points: 4,
      },
    ],
  },

  {
    id: "awareness",
    question: "Do you usually know where your money goes each month?",
    description:
      "Understanding spending awareness helps tailor your insights.",
    options: [
      {
        label: "Not really",
        points: 1,
      },
      {
        label: "Sometimes",
        points: 2,
      },
      {
        label: "Most of the time",
        points: 3,
      },
      {
        label: "Always",
        points: 4,
      },
    ],
  },
];

export default function FinancialQuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const [answers, setAnswers] = useState<Record<string, number>>({});

  const currentQuestion = questions[currentStep];

  const progress = ((currentStep + 1) / questions.length) * 100;

  const totalScore = useMemo(() => {
    return Object.values(answers).reduce((acc, val) => acc + val, 0);
  }, [answers]);

  const financialLevel = useMemo(() => {
    if (totalScore <= 6) return "Beginner";
    if (totalScore <= 11) return "Intermediate";
    return "Advanced";
  }, [totalScore]);

  const handleSelect = (points: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: points,
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log({
        answers,
        score: totalScore,
        level: financialLevel,
      });

      router.push(`/product/onboarding/recommendation?score=${totalScore}`)
    }
  };

  const selectedAnswer = answers[currentQuestion.id];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  return (
    <main className="min-h-screen bg-rayo-beige px-6 py-8 md:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT SIDE */}
        <div className="w-full max-w-2xl">
          {/* TOP BAR */}
          <div className="mb-10 flex items-center justify-between">
            <Link
              href="/product/onboarding/welcome"
              className="inline-flex items-center gap-2 text-sm font-medium text-rayo-green/70 transition-colors hover:text-rayo-green"
            >
              <ArrowLeft size={16} />
              Back
            </Link>

            <div className="rounded-full border border-rayo-green/10 bg-white px-4 py-2 text-sm font-medium text-rayo-green shadow-sm">
              Question {currentStep + 1} of {questions.length}
            </div>
          </div>

          {/* PROGRESS */}
          <div className="mb-10">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-rayo-green/70">
                Financial experience assessment
              </p>

              <p className="text-sm text-rayo-green/50">
                {Math.round(progress)}%
              </p>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-rayo-green/10">
              <div
                className="h-full rounded-full bg-rayo-green transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* QUESTION */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-rayo-green/10 bg-white px-4 py-2 text-sm font-medium text-rayo-green shadow-sm">
                <Sparkles size={16} className="text-rayo-orange" />
                Personalized onboarding
              </div>

              <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-rayo-green md:text-5xl">
                {currentQuestion.question}
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-rayo-green/70 md:text-lg">
                {currentQuestion.description}
              </p>
            </div>

            {/* OPTIONS */}
            <div className="space-y-4 pt-2">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer === option.points;

                return (
                  <button
                    key={option.label}
                    onClick={() => handleSelect(option.points)}
                    className={`group w-full rounded-3xl border bg-white p-5 text-left shadow-sm transition-all ${
                      isSelected
                        ? "border-rayo-green ring-4 ring-rayo-green/10"
                        : "border-rayo-green/5 hover:border-rayo-green/20 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-start gap-4">
                        {/* RADIO */}
                        <div
                          className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
                            isSelected
                              ? "border-rayo-green bg-rayo-green"
                              : "border-rayo-green/20"
                          }`}
                        >
                          {isSelected && (
                            <Check size={14} className="text-white" />
                          )}
                        </div>

                        <div>
                          <h3 className="text-base font-medium text-rayo-green">
                            {option.label}
                          </h3>
                        </div>
                      </div>

                      <ChevronRight
                        size={18}
                        className={`transition-all ${
                          isSelected
                            ? "text-rayo-green"
                            : "text-rayo-green/30 group-hover:text-rayo-green/60"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* LEVEL CARD — mobile only, sits between options and CTA */}
            <div className="lg:hidden">
              <LevelCard
                financialLevel={financialLevel}
                answers={answers}
                questions={questions}
              />
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center">
              <button
                disabled={!selectedAnswer}
                onClick={handleNext}
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-rayo-green px-7 text-base font-medium text-white transition-all hover:bg-[#1D3F1B] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {currentStep === questions.length - 1
                  ? "See My Recommendation"
                  : "Continue"}

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="hidden w-full max-w-md lg:block">
          <LevelCard
            financialLevel={financialLevel}
            answers={answers}
            questions={questions}
          />
        </div>
      </div>
    </main>
  );
}

function LevelCard({
  financialLevel,
  answers,
  questions,
}: {
  financialLevel: string;
  answers: Record<string, number>;
  questions: { id: string }[];
}) {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-[32px] border border-rayo-green/5 bg-white p-6 shadow-xl shadow-rayo-green/5">
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-rayo-green/50">
            Your Financial Profile
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-rayo-green">
            {financialLevel}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-rayo-green/60">
            Your dashboard and budgeting experience will adapt as we learn more
            about your habits and goals.
          </p>
        </div>

        {/* SCORE */}
        <div className="mb-8 rounded-3xl bg-rayo-beige/70 p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-rayo-green">
              Assessment Progress
            </p>
            <p className="text-sm text-rayo-green/60">
              {Object.keys(answers).length}/{questions.length}
            </p>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-rayo-green transition-all duration-500"
              style={{
                width: `${(Object.keys(answers).length / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* LEVEL EXPLANATION */}
        <div className="space-y-4">
          <ProfileCard
            active={financialLevel === "Beginner"}
            title="Beginner"
            description="Simple budgeting tools with guided financial insights."
          />
          <ProfileCard
            active={financialLevel === "Intermediate"}
            title="Intermediate"
            description="Balanced budgeting with smarter spending analytics."
          />
          <ProfileCard
            active={financialLevel === "Advanced"}
            title="Advanced"
            description="Detailed financial reports, trends, and deeper controls."
          />
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-8 rounded-2xl border border-rayo-orange/10 bg-rayo-orange/5 p-4">
          <p className="text-sm leading-relaxed text-rayo-green/70">
            Your experience level isn't permanent. Rayo adapts as your financial
            habits improve over time.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProfileCard({
  title,
  description,
  active,
}: {
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 transition-all ${
        active
          ? "border-rayo-green bg-rayo-green text-white"
          : "border-rayo-green/5 bg-rayo-green/[0.02]"
      }`}
    >
      <h3
        className={`font-medium ${
          active ? "text-white" : "text-rayo-green"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-1 text-sm leading-relaxed ${
          active ? "text-white/80" : "text-rayo-green/60"
        }`}
      >
        {description}
      </p>
    </div>
  );
}