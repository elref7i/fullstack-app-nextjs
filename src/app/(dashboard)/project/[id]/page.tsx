export default function page({ params }: { params: { id: string } }) {
  return <div>Project ID: {params.id}</div>;
}
