"use client";
import { TeamMember, teamMembers } from "@/DataModels/TeamDataModel";

export function TeamSection() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
          Meet Our{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Team
          </span>
        </h2>
      </div>

      <div className="mx-auto mt-16 grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 md:justify-center">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="relative overflow-hidden rounded-lg border bg-background p-2 justify-self-center"
          >
            <div className="flex h-full flex-col items-center justify-between rounded-md p-6">
              <div className="h-24 w-24 rounded-full overflow-hidden bg-muted">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="font-bold">{member.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground font-medium">
                  {member.role}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 