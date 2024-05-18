import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className='flex justify-center gap-2 pt-10 '>
      <Spinner size="small" />
      <p className='text-xl font-bold'>
        Loading...
      </p>
    </div>
  )
}
