import * as React from "react";
import { LucideIcon } from "lucide-react";

export type InfoItemProps = {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  className?: string;
};

export function InfoItem({ icon: Icon, label, children, className = "" }: InfoItemProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
        <Icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        {label}
      </div>
      <div className="pl-5 sm:pl-6">{children}</div>
    </div>
  );
}

export default InfoItem;