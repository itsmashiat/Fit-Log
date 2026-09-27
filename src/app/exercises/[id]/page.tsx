import { redirect } from "next/navigation";

interface ExercisesRedirectProps {
  params: Promise<{ id: string }>;
}

export default async function ExercisesRedirect({
  params,
}: ExercisesRedirectProps) {
  const { id } = await params;
  redirect(`/plans/${id}`);
}
