import MeetingDetailPage from '@/components/meetings/MeetingDetailPage'

export default function MeetingPage({ params }: { params: { id: string } }) {
  return <MeetingDetailPage meetingId={params.id} />
}
