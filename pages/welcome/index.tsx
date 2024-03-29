import { Avatar, AvatarGroup, Button, Image } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import HeaderSettings from '../../accessibility/header-setting';
import { landingAvatars } from '../../constants/avatars';
import styles from './welcome.module.scss';

const Welcome: NextPage = () => {
  const router = useRouter();

  const avatarsGroup = landingAvatars.map(({ key, label, src }) => (
    <Avatar key={key} name={label} src={src} />
  ));

  return (
    <>
      <HeaderSettings title='CotejoApp | Welcome' description='Welcome to CotejoApp' />
      <section className={styles.container}>
        <Image
          className={styles.logoText}
          src={'/images/single-text-logo.png'}
          alt="Cotejo app logo"
        />
        <h1 className={styles.header}>
          <span className={styles.green}>Just</span> create a{' '}
          <span className={styles.green}>match</span>
        </h1>
        <h1 className={styles.header}>
          and have <span className={styles.green}>fun</span>.
        </h1>
        <h2 className={styles.subtitle}>
          The best way to create football events with friends. Avoid all those
          Whatsapp groups and start using CotejoApp.
        </h2>
        <Button
          className={styles.start}
          colorScheme="brand"
          onClick={() => router.push('/auth')}
        >
          Start
        </Button>
        <AvatarGroup color={'blackAlpha.900'} size="md" max={4}>
          {avatarsGroup}
        </AvatarGroup>
      </section>
    </>
  );
};

export default Welcome;
