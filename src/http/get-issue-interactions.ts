import { IssueInteractionsResponseSchema } from "@/api/routes/schemas/issue-interactions";
import { clientEnv } from "@/env";

interface GetIssueInteractionsParams {
  issuesIds: string[];
}

export async function getIssueInteractions({
  issuesIds,
}: GetIssueInteractionsParams) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const url = new URL(
    `/api/issues/interactions`,
    clientEnv.NEXT_PUBLIC_API_URL,
  );

  url.searchParams.set("issueIds", issuesIds.join(","));

  const response = await fetch(url, {
    credentials: "include", // Vai enviar o conteudo do header dessa requisicao para a API, "o better-auth precisa dos cookies (o token jwt vai estar la) para autorizar a requisicao"
  });
  const data = await response.json();

  return IssueInteractionsResponseSchema.parse(data);
}
