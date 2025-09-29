import { Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2 text-primary", className)}>
      <Youtube className="h-8 w-8" />
      <span className="text-2xl font-bold font-headline tracking-tighter">
        WeTube
      </span>
    </div>
  );
};

export default Logo;
