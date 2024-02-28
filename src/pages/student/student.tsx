import { useState } from 'react';
import { AppShell,JsonInput,Input, Tooltip, Burger,Group,Stack, UnstyledButton, rem , TextInput, Title, Card, Button, Grid, Center, NativeSelect } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Header } from '../header/header';

import classes from './student.module.css'
import { Nav } from '../nav/nav';
import { Breadcrumbs, Anchor, Table } from '@mantine/core';
import {
    IconHome2,
    IconIdBadge,
    IconUserCog,
   
    IconUser,
    IconSettings,
    IconLogout,
    
  } from '@tabler/icons-react';

import { Link, useLocation } from 'react-router-dom';


interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }} p={10} ml={5}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
 
  { icon: IconHome2, label: 'Home' },
  { icon: IconUserCog, label: 'Admin'},
  { icon: IconIdBadge, label: 'Staff' },
  { icon: IconIdBadge, label: 'Student' },
  { icon: IconSettings, label: 'Settings' },
];



const items = [
  { title: 'STUDENT', href: '#' },

].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));
const elements = [
  { rollNum: 1, name: 'Nandeesh', usn: '3VC21CS109', semester: 5, branch: 'CSE' ,option: <Button variant="filled" color="red">Delete</Button>},
  { rollNum: 2, name: 'Nandeesh', usn: '3VC21CS110', semester: 5, branch: 'CSE' ,option: <Button variant="filled" color="red">Delete</Button> },
  { rollNum: 3, name: 'Nandeesh', usn: '3VC21CS111', semester: 5, branch: 'CSE' ,option: <Button variant="filled" color="red">Delete</Button> },
  { rollNum: 4, name: 'Nandeesh', usn: '3VC21CS112', semester: 5, branch: 'CSE' ,option: <Button variant="filled" color="red">Delete</Button> },
  { rollNum: 5, name: 'Nandeesh', usn: '3VC21CS113', semester: 5, branch: 'CSE' ,option: <Button variant="filled" color="red">Delete</Button> },
  { rollNum: 6, name: 'Nandeesh', usn: '3VC21CS114', semester: 5, branch: 'CSE' ,option: <Button variant="filled" color="red">Delete</Button> },
];

export function Student() {
        const location = useLocation();
        const [active, setActive] = useState(2);
      
        const links = mockdata.map((link, index) => (
          <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
          />
        ));
      
        const isStudentActive = location.pathname === '/';
      
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const rows = elements.map((element) => (
    <Table.Tr style={{ backgroundColor: '#474747', color: 'white' }} key={element.rollNum}>
      <Table.Td>{element.rollNum}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.usn}</Table.Td>
      <Table.Td>{element.semester}</Table.Td>
      <Table.Td>{element.branch}</Table.Td>
      <Table.Td>{element.option}</Table.Td>
    </Table.Tr>
  ));
  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 90,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group >
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Header />
        </Group>

      </AppShell.Header>

      
      <AppShell.Navbar p="md" mt={13} style={{ backgroundColor: "#292929" }}>
      <div className={classes.Container}>
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={20}>
          <Link to="/student">
              <NavbarLink icon={IconIdBadge} label="Student" active={isStudentActive}  />
              </Link>
        </Stack>
      </div>

      <Stack justify="center" gap={12} mt={510}>
        
        <Link to="/">
        <NavbarLink icon={IconLogout} label="Logout" />
        </Link>
      </Stack>
    </nav>
    </div>
      </AppShell.Navbar>


      <AppShell.Main  style={{ backgroundColor: "#474747"}}>
      <Breadcrumbs ml={15} mt={20} className={classes.path}>{items}</Breadcrumbs>
      <Title order={1} mt={20} ml={20} style={{ color: 'white' }}>Student Attendance</Title>
      <Grid>
          <Grid.Col span={6} ml={360} my={50} maw={600} h={550} >
            <div className={classes.content}>
              <div className={classes.data}>
              <text>
                <h2><b>Name :</b></h2>
              </text>
              <text>
                <h2><b>USN : </b></h2>
              </text>
              <text>
                <h2><b>Roll num :</b></h2>
              </text>
              <text>
                <h2><b>Semester :</b></h2>
              </text>
              <text>
                <h2><b>Branch :</b></h2>
              </text>
              <text>
                <h2><b>Attendance :</b></h2>
              </text>
              </div>
            </div>
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}