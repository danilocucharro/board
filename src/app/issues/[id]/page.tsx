import type { Metadata } from "next";
import { getIssue } from "@/http/get-issue";

interface IssuePageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: IssuePageProps): Promise<Metadata> => {
  const { id } = await params;
  const issue = getIssue({ id });

  return {
    title: `Issue | ${(await issue).title}`,
  };
};

export default async function IssuePage({ params }: IssuePageProps) {
  const { id } = await params;

  const issue = await getIssue({ id });

  return (
    <div>
      <p>Issue: {issue.title}</p>
    </div>
  );
}
