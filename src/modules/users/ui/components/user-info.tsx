import { cva,type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const userInfoVariant= cva("flex items-center gap-1",{
    variants:{
        size:{
            default:"[&_p]:text-sm [&_svg]:size-4",
            lg:"[&_p]:text-base [&_svg"
        }
    }
})