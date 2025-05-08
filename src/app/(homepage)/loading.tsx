export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-90px)] items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}
