import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex justify-center gap-2 pt-10 '>
      <Loader size="1.5em" className='animate-spin' />
      <p className='text-xl font-bold'>
        Loading...
      </p>
    </div>
  )
}
