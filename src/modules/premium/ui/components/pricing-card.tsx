import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { CircleCheckIcon } from "lucide-react";

const pricingCardVariants = cva("rounded-lg p-4 py-6 w-full", {
  variants: {
    variant: {
      default: "border bg-white text-black",
      highlighted: "bg-linear-to-br from-[#5D38C3] to-[#3B1E77] text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const pricingCardIconVariants = cva("size-5", {
  variants: {
    variant: {
      default: "fill-primary text-white",
      highlighted: "fill-white text-black",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const pricingCardSecondaryTextVariants = cva("text-neutral-700", {
  variants: {
    variant: {
      default: "text-neutral-700",
      highlighted: "text-neutral-300",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const pricingCardBadgeVariants = cva("text-black text-xs font-normal p-1", {
  variants: {
    variant: {
      default: "bg-primary/20 text-white",
      highlighted: "bg-primary text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface PricingCardProps extends VariantProps<typeof pricingCardVariants> {
  badge?: string | null;
  price: number;
  features: string[];
  title: string;
  description?: string | null;
  priceSuffix: string;
  className?: string;
  buttonText: string;
  onClick: () => void;
}

export const PricingCard = ({
  variant,
  badge,
  price,
  features,
  title,
  description,
  priceSuffix,
  className,
  buttonText,
  onClick,
}: PricingCardProps) => {
  return (
    <div className={cn(pricingCardVariants({ variant }), "lg:w-[500px] xl:w-auto", className)}>
      <div className="flex items-end gap-x-4 justify-between">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <h6 className="font-medium text-xl">{title}</h6>
            {badge && (
              <Badge className={cn(pricingCardBadgeVariants({ variant }))}>
                {badge}
              </Badge>
            )}
          </div>
          <p
            className={cn(
              "text-xs",
              pricingCardSecondaryTextVariants({ variant })
            )}
          >
            {description}
          </p>
        </div>
        <div className="flex items-end shrink-0 gap-x-0.5">
          <h4 className="text-3xl font-medium">
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(price)}
          </h4>
          <span className={cn(pricingCardSecondaryTextVariants({ variant }))}>
            {priceSuffix}
          </span>
        </div>
      </div>
      <div className="py-6">
        <Separator className="opacity-10 text-[#5D6B68]" />
      </div>
      <Button
        className="w-full"
        size={"lg"}
        variant={variant === "highlighted" ? "default" : "outline"}
        onClick={onClick}
      >
        {buttonText}
      </Button>
      <div className="flex flex-col gap-y-2 mt-6">
        <p className="font-medium uppercase">Feature</p>
        <ul
          className={cn(
            "flex flex-col gap-y-2.5",
            pricingCardSecondaryTextVariants({ variant })
          )}
        >
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-x-2.5">
              <CircleCheckIcon
                className={cn(pricingCardIconVariants({ variant }))}
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
