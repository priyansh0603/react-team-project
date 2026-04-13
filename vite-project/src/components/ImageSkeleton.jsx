export default function ImageSkeleton() {
  return (
    <div className="w-full h-64 bg-primary-card rounded-xl overflow-hidden animate-pulse">
      <div className="w-full h-full bg-gradient-to-r from-primary-dark via-primary-card to-primary-dark bg-[length:200%_100%] animate-shimmer" />
    </div>
  );
}
