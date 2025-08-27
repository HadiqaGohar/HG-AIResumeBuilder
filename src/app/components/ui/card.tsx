import { cn } from '../../../../lib/utils'; // Adjust the import path as necessary

export function Card({ className, ...props }) {
  return <div className={cn('bg-white border rounded shadow', className)} {...props} />;
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('p-4 border-b', className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn('text-lg font-semibold', className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-4', className)} {...props} />;
}