import Link from 'next/link';
import ModeToggle from './ModeToogle';
import UserAvatarMenu from './UserAvatarMenu';

export default function Navbar() {
  return (
    <header className="bg-background text-foreground p-4 border-b shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-2xl font-bold">SM</div>
        </Link>
        <nav className="space-x-4 flex items-center">
          <ModeToggle />
          <UserAvatarMenu />
        </nav>
      </div>
    </header>
  );
}
