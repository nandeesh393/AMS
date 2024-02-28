import { useState } from 'react';
import { AppShell, Tooltip, Burger,Group,Stack, UnstyledButton, rem , TextInput, Title, Card, Button, Grid, Center, NativeSelect } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Header } from '../header/header';

import classes from './record.module.css'
import { Nav } from '../nav/nav';
import { Breadcrumbs, Anchor, Table } from '@mantine/core';
import {
    IconHome2,
    IconIdBadge,
    IconUser,
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
 
 
  { icon: IconIdBadge, label: 'Staff' },

];



const items = [
  { title: 'staff', href: '/staff' },
  { title: 'ATTENDANCE RECORD', href: '#' },

].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));
const element = [
  { semester: 5, branch: 'CSE' , subject: 'DBMS',option: <Group>
  <Button variant="primary">P</Button>
</Group>}, 
   { semester: 5, branch: 'CSE' , subject: 'DBMS',option: <Group>
   <Button variant="filled" color="red">A</Button>
 </Group>}, 
   { semester: 5, branch: 'CSE' , subject: 'DBMS',option: <Group>
  <Button variant="filled" color="red">A</Button>
</Group>}, 
   { semester: 5, branch: 'CSE' , subject: 'DBMS',option: <Group>
  <Button variant="primary">P</Button>
  
</Group>}, 
   { semester: 5, branch: 'CSE' , subject: 'DBMS',option: <Group>
  <Button variant="primary">P</Button>

</Group>}, 
   { semester: 5, branch: 'CSE' , subject: 'DBMS',option: <Group>
  <Button variant="primary">P</Button>
  
</Group>}, 
   { semester: 5, branch: 'CSE' , subject: 'DBMS',option: <Group>
  
  <Button variant="filled" color="red">A</Button>
</Group>}, 
];

export function Record() {
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
  const rows = element.map((element) => (
    <Table.Tr style={{ backgroundColor: '#474747', color: 'white' }} key={element.semester}>
      <Table.Td>{element.semester}</Table.Td>
      <Table.Td>{element.branch}</Table.Td>
      <Table.Td>{element.subject}</Table.Td>
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
          <Link to="/staff">
              <NavbarLink icon={IconIdBadge} label="Staff" active={isStudentActive}  />
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
      <Group ml={550} >
      <Title order={2} ml={20} mt={20} style={{ color: 'white' }}>Attendance Date : </Title>
        </Group>
        <Table highlightOnHoverColor='#00000' withTableBorder >
      <Table.Thead style={{ color: 'white' }}>
        <Table.Tr>
          <Table.Th>Semester</Table.Th>
          <Table.Th>Branch</Table.Th>
          <Table.Th>Subject</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    <Group ml={550} >
      <Title order={2} ml={20} mt={50} style={{ color: 'white' }}>Attendance Date : </Title>
        </Group>
        <Table highlightOnHoverColor='#00000' withTableBorder >
      <Table.Thead style={{ color: 'white' }}>
        <Table.Tr>
          <Table.Th>Semester</Table.Th>
          <Table.Th>Branch</Table.Th>
          <Table.Th>Subject</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
      </AppShell.Main>
    </AppShell>
  );
}