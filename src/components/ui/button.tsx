export function Button({
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`w-full items-center justify-center border border-Budgexa-green rounded-lg bg-white px-4 py-2 font-medium text-Budgexa-green hover:bg-Budgexa-green hover:text-white ${className}`}
      {...props}
    />
  );
}