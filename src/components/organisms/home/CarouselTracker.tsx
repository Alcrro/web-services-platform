import { cn } from "@/lib/utils";
import {
  ElementType,
  forwardRef,
  ComponentPropsWithoutRef,
  ReactNode,
  RefAttributes,
  ForwardRefExoticComponent,
} from "react";

// Polymorphic props
type PolymorphicProps<E extends ElementType> = {
  as?: E;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<E>;

// Polymorphic ref
type PolymorphicRef<E extends ElementType> =
  React.ComponentPropsWithRef<E>["ref"];

// Inner function typed as ForwardRefRenderFunction
const CarouselTrackerInner: ForwardRefExoticComponent<
  PolymorphicProps<ElementType> & RefAttributes<PolymorphicRef<ElementType>>
> = forwardRef(
  ({ as, className, children, ...props }, ref: PolymorphicRef<ElementType>) => {
    const Component = as || "div";
    return (
      <Component ref={ref} className={cn(className)} {...props}>
        {children}
      </Component>
    );
  }
);

// Display name works
CarouselTrackerInner.displayName = "CarouselTracker";

export default CarouselTrackerInner;
