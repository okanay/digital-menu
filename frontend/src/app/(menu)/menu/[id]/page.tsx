export default function MenuIDPage({ params }: { params: { id: string } }) {
  return (
    <main className="h-screen bg-primary-50">
      <div className="flex h-full items-center justify-center">
        <h1 className="text-4xl font-bold text-primary-900">
          Menu ID: {params.id}
        </h1>
      </div>
    </main>
  );
}
