import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { createContext, useContext, ReactNode } from "react";

type Variant = "page" | "section";

const VariantContext = createContext<Variant | null>(null);

function useVariant(component: string) {
  const val = useContext(VariantContext);

  if (val === null)
    throw new Error(component + " must be used within a TitleContainer");

  return val;
}

type Props = {
  className?: string;
  children: ReactNode;
};

type ContainerProps = Props & { variant?: Variant };
export const containerVariants = cva("", {
  variants: {
    variant: {
      page: "border-b py-4",
      section: "py-5",
    },
  },
});

export function TitleContainer({
  children,
  className,
  variant = "section",
}: ContainerProps) {
  return (
    <VariantContext.Provider value={variant}>
      <div className={cn(containerVariants({ variant }), className)}>
        {children}
      </div>
    </VariantContext.Provider>
  );
}

type TitleProps = Props;
export const titleVariants = cva("", {
  variants: {
    variant: {
      page: "text-4xl lg:text-6xl",
      section: "text-2xl lg:text-4xl",
    },
  },
  defaultVariants: {
    variant: "section",
  },
});

export function Title({ children, className }: TitleProps) {
  const variant = useVariant("Title");
  const H = variant === "page" ? "h1" : "h2";

  return (
    <H className={cn(titleVariants({ variant }), className)}>{children}</H>
  );
}

export function TitleDescription({ children, className }: Props) {
  return (
    <p className={cn("text-2xl text-muted-foreground", className)}>
      {children}
    </p>
  );
}
