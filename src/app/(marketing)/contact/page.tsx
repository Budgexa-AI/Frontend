import { ContactPageClient } from "./ContactPageClient";

type ContactPageProps = {
  searchParams?: Promise<{
    category?: string | string[];
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = await searchParams;
  const category = Array.isArray(resolvedSearchParams?.category)
    ? resolvedSearchParams?.category[0]
    : resolvedSearchParams?.category;

  return <ContactPageClient defaultCategory={category ?? null} />;
}