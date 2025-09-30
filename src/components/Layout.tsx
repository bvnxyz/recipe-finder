export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto p-4 w-full max-w-2xl">{children}</div>
  );
};
