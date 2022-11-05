
import type { NextPage } from 'next';
import { getSession, useSession } from "next-auth/react";
import CreateTeams from './teams/create-teams';
import Steps from './header/steps';

const NewMatch: NextPage = () => {

  const { data: session } = useSession();

  if(!session) {
    <p>Loading</p>
  }

  return (
    <>
      <Steps
        teams={<CreateTeams />}
        players={<p>Two</p>}
        schedule={<p>Three</p>}
      />
    </>
  );
}

export const getServerSideProps = async(context: any) => {
  const session = await getSession({ req: context.req});

  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
};

export default NewMatch;
