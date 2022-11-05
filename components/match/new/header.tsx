import { Stat, Divider, StatGroup, Center, StatNumber } from '@chakra-ui/react';
import type { NextPage } from 'next';


const Header: NextPage = () => {
  return (
    <StatGroup>
      <Stat display="flex" alignItems="center" justifyContent="center">
        <Center height='50px'>
          <Divider  width='100%' borderColor='green.300' />
        </Center>
        <StatNumber color='green.300'>Teams</StatNumber>
        <StatNumber color='white'>Create the teams</StatNumber>
      </Stat>

      <Stat display="flex" alignItems="center" justifyContent="center">
        <Center height='50px'>
          <Divider  width='100%' />
        </Center>
        <StatNumber color='white'>Players</StatNumber>
        <StatNumber color='white'>Add the players</StatNumber>
      </Stat>

      <Stat display="flex" alignItems="center" justifyContent="center">
        <Center height='50px'>
          <Divider  width='100%' />
        </Center>
        <StatNumber color='white'>Schedule</StatNumber>
        <StatNumber color='white'>The time & place</StatNumber>
      </Stat>
    </StatGroup>
  );
}

export default Header;
