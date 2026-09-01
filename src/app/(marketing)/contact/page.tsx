import { ContactPageClient } from "./ContactPageClient";

type ContactPageProps = {
  searchParams?: {
    category?: string | string[];
  };
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const category = Array.isArray(searchParams?.category)
    ? searchParams?.category[0]
    : searchParams?.category;

  return <ContactPageClient defaultCategory={category ?? null} />;
}