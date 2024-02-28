import {

  Box,
  Center,
  Text
 
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

import classes from './header.module.css';



export function Header() {
  return (
    <div className={classes.top}>
    <Text className={classes.name} ml={510}><h1>Attendance Management System</h1></Text>
    </div>
  );
}