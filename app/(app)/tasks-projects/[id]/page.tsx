import ProjectDetailPage from '@/components/tasks/ProjectDetailPage'

export default function ProjectDetail({ params }: { params: { id: string } }) {
  return <ProjectDetailPage projectId={params.id} />
}
