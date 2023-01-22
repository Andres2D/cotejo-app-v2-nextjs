import type { NextPage } from 'next';
import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
}

const HeaderSettings: NextPage<Props> = ({title = 'CotejoApp', description = 'CotejoApp'}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta 
        name='description'
        content={description}
      />
    </Head>
  )
}

export default HeaderSettings;
