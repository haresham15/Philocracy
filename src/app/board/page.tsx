import Link from "next/link";
import { User } from "lucide-react";

export default function BoardPage() {
  const members = [
    {
      id: 1,
      name: "[Member 1 Name]",
      role: "[Member 1 Role / Title]",
      description:
        "[Placeholder description for Member 1. Write about their background, what they bring to Philocracy, and their passion for the mission.]",
    },
    {
      id: 2,
      name: "[Member 2 Name]",
      role: "[Member 2 Role / Title]",
      description:
        "[Placeholder description for Member 2. Write about their background, what they bring to Philocracy, and their passion for the mission.]",
    },
    {
      id: 3,
      name: "[Member 3 Name]",
      role: "[Member 3 Role / Title]",
      description:
        "[Placeholder description for Member 3. Write about their background, what they bring to Philocracy, and their passion for the mission.]",
    },
  ];

  return (
    <div className="min-h-screen bg-soft-cream pt-24 pb-20 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 max-w-2xl text-center md:mx-auto md:mb-24">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blush-pink">
            Governance
          </p>
          <h1 className="font-heading mt-2 text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            Our Board
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Meet the team guiding our mission to blend streetwear with impactful change.
          </p>
        </div>

        {/* Board Members Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {members.map((member) => (
            <div 
              key={member.id} 
              className="flex flex-col items-center rounded-3xl bg-white p-8 text-center shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Icon Section */}
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blush-pink-light shadow-inner">
                <User className="h-10 w-10 text-blush-pink-deep" strokeWidth={1.5} />
              </div>
              
              {/* Info Section */}
              <h2 className="font-heading text-2xl font-bold text-charcoal">
                {member.name}
              </h2>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-blush-pink">
                {member.role}
              </p>
              
              {/* Description Section */}
              <div className="mt-6 flex-1 rounded-2xl bg-warm-cream/50 p-6 text-sm leading-relaxed text-muted-foreground">
                <p>{member.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/#mission"
            className="inline-flex items-center justify-center rounded-full border border-blush-pink px-8 py-4 text-sm font-semibold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-blush-pink-light hover:shadow-md"
          >
            Learn More About Our Mission
          </Link>
        </div>
        
      </div>
    </div>
  );
}
