export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 grid place-content-center bg-background/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="size-8 rounded-full border-2 border-primary/50 border-t-transparent animate-spin" />
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    </div>
  );
}