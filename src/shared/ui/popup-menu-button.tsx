import * as React from "react"

export type PopupMenuButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function PopupMenuButton({ className = "", ...props }: PopupMenuButtonProps) {
  return (
    <button
      className={`w-[140px] min-h-[30px] mx-auto rounded-[4px] text-center text-sm text-[#000000] hover:bg-[#0000001A] transition-colors px-2 ${className}`}
      {...props}
    />
  )
}

export default PopupMenuButton
