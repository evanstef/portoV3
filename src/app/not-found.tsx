import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        className="w-48"
        src={
          'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3hjbjQ0MTc2Y3ltNHJ0djJpM2o1MTQ5OGFjeXFocmp4ZHd3YjNpOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VwoJkTfZAUBSU/giphy.gif'
        }
        alt="404"
        width={500}
        height={500}
      />
      <p>404 Page Not Found</p>
      <Link href="/" className="underline text-blue-500">
        Back to Home
      </Link>
    </div>
  );
}
