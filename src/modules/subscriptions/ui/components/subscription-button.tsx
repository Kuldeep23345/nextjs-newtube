import { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface SubscriptionButtonProps {
  onClick: ComponentProps<typeof Button>["onClick"];
  disabled: boolean;
  isSubscribed: boolean;
  className: string;
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
}



export const SubscriptionButton = ({onClick,disabled,isSubscribed,className,size}:SubscriptionButtonProps) => {
  return (
   <Button
   size={size}
   variant={isSubscribed ?"secondary":"default"}
   className={cn('roundfull',className)}
   onClick={onClick}
   disabled={disabled}
   >
    {isSubscribed?"Unsubscribe":"Subscribe"}
   </Button>
  )
}
