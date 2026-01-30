import { Section } from "@/components/section";
import { ArchiveIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-[1620px] w-full mx-auto p-10 flex-col gap-8 h-dvh">
      <div />

      <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
        <Section.Root>
          {/* Header */}
          <Section.Header>
            <Section.Title>
              <ArchiveIcon className="size-3" />
              Backlog
            </Section.Title>

            <Section.IssueCount>32</Section.IssueCount>
          </Section.Header>

          {/* Content */}
          <Section.Content>
            <div className="">Card 1</div>
            <div className="">Card 2</div>
            <div className="">Card 3</div>
          </Section.Content>
        </Section.Root>
      </main>
    </div>
  );
}
