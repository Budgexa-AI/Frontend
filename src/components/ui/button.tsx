export function Button({
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`w-full items-center justify-center border border-rayo-green rounded-lg bg-white px-4 py-2 font-medium text-rayo-green hover:bg-rayo-green hover:text-white ${className}`}
      {...props}
    />
  );
}