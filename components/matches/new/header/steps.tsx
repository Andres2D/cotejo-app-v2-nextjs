import { 
  Tabs,
  TabList,
  Tab,
  TabPanels,
  SystemStyleObject,
  TabPanel
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { ReactNode } from 'react';
import styles from './steps.module.css';

const selectedTab: SystemStyleObject = {
  color: '#4ECB71',
  borderTop: '5px solid #4ECB71'
}

interface Props {
  teams: ReactNode;
  players: ReactNode;
  schedule: ReactNode;
}

const Steps: NextPage<Props> = ({teams, players, schedule}) => {
  return (
    <Tabs 
      className={styles.tabs}
      align='center'
      variant='unstyled'
      isFitted
      justifyContent='space-around' 
      colorScheme='brand'
    >
      <TabList>
        <Tab 
          _selected={selectedTab}
          className={styles.tab}
        >
          <p className={styles.title}>Teams</p>
          <p className={styles.subtitle}>Create the teams</p> 
        </Tab>
        <Tab 
          _selected={selectedTab}
          className={styles.tab}
        >
          <p className={styles.title}>Players</p>
          <p className={styles.subtitle}>Add the players</p> 
        </Tab>
        <Tab 
          _selected={selectedTab}
          className={styles.tab}
        >
          <p className={styles.title}>Schedule</p>
          <p className={styles.subtitle}>The time & place</p> 
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {teams}
        </TabPanel>
        <TabPanel>
          {players}
        </TabPanel>
        <TabPanel>
          {schedule}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Steps;
