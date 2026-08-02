import ProductShell from "@/components/product/ProductShell";
import { getCurrentUserServer } from "@/lib/server/current-user";

export default async function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentUserServer();

  return <ProductShell initialProfile={profile}>{children}</ProductShell>;
}