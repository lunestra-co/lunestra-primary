interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "link";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "uppercase tracking-widest text-[11px] font-bold transition-all duration-300 ease-out";

  const variants = {
    // Chanel Style: Black block, white text
    primary:
      "bg-brandblack text-white px-8 py-4 hover:bg-sapphire hover:border-sapphire border border-brandblack",
    // Outline Style: White background, black border
    secondary:
      "bg-white text-brandblack px-8 py-4 border border-brandblack hover:bg-brandblack hover:text-white",
    // Hero Outline: White text, white border
    outline:
      "bg-transparent border border-white text-white px-8 py-4 hover:bg-white hover:text-brandblack",
    // Link Style: Tiffany style underline
    link: "bg-transparent text-brandblack border-b border-brandblack pb-1 hover:text-sapphire hover:border-sapphire p-0",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
