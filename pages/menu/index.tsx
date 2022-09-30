import type { NextPage } from 'next';
import { useSession } from "next-auth/react";
import Image from 'next/image';

const Menu: NextPage = () => {

  const { data: session } = useSession();

  console.log(session);

  if(!session) {
    <p>Loading</p>
  }

  return (
    <>
      <h1>Hello, {session?.user?.name}</h1>
      <Image 
        src={session?.user?.image || '/images/user-image-fallback.png'}
        alt='User Image'
        width={200}
        height={200}
      />
    </>
  );
}

export default Menu;
