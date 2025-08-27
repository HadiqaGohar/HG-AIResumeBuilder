// Removed RadixButton import, using native button instead
import { cn } from '../../../../lib/utils'; // Create this utility for className merging

export function Button({ className, variant = 'default', ...props }) {
  return (
    <button
      className={cn(
        'px-8 py-5 rounded-2xl font-medium border-black',
        variant === 'default' ? 'bg-purple-700 text-white' : 'border border-gray-700', 
        className
      )}
      {...props}
    />
  );
}