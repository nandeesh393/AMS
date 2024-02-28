import { AppShell, Burger,Group,  TextInput, Title, Card, Button, Grid, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Header } from '../header/header';

import classes from './admin.module.css'
import { Nav } from '../nav/nav';
import { Breadcrumbs, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';


const items = [
  { title: 'ADMIN', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));


export function Dashboard() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

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
        <Nav />
      </AppShell.Navbar>


      <AppShell.Main  style={{ backgroundColor: "#474747"}}>
      <Breadcrumbs ml={15} mt={20} className={classes.path}>{items}</Breadcrumbs>
      <Grid justify="space-around">
      <Grid.Col span={4}>
      <Link to="/addstudent">
      <Card radius="lg" p="5" mt={40} h={150} ml={70} w={300} bg="#292929" className={classes.card}>
              <Center style={{ width: 220, height: 100 }} mt={20} ml={30}>
                <text style={{ color: 'white', textDecoration: 'none'}}>
                  <h3>Add Student</h3>
                </text>
              </Center>
            </Card>
            </Link>
      </Grid.Col>
      <Grid.Col span={4}>
      <Link to="/addstaff">
      <Card radius="lg" p="5" mt={40} h={150} ml={45} w={300} bg="#292929" className={classes.card}>
              <Center style={{ width: 220, height: 100 }} mt={20} ml={30}>
                <text style={{ color: 'white' }}>
                  <h3>Add Staff</h3>
                </text>
              </Center>
            </Card>
            </Link>
      </Grid.Col>
      <Grid.Col span={4}>
      <Link to="/addbranch">
      <Card radius="lg" p="5" mt={40} h={150} ml={20} w={300} bg="#292929" className={classes.card}>
              <Center style={{ width: 220, height: 100 }} mt={20} ml={30}>
                <text style={{ color: 'white' }}>
                  <h3>Add Branch</h3>
                </text>
              </Center>
            </Card>
            </Link>
      </Grid.Col>
      <Grid.Col span={4}>
      <Link to="/addsubject">
      <Card radius="lg" p="5" mt={40} h={150} ml={70} w={300} bg="#292929" className={classes.card}>
              <Center style={{ width: 220, height: 100 }} mt={20} ml={30}>
                <text style={{ color: 'white' }}>
                  <h3>Add Subjects</h3>
                </text>
              </Center>
            </Card>
            </Link>
      </Grid.Col>
      <Grid.Col span={4}>
      <Link to="/batch">
      <Card radius="lg" p="5" mt={40} h={150} ml={45} w={300} bg="#292929" className={classes.card}>
              <Center style={{ width: 220, height: 100 }} mt={20} ml={30}>
                <text style={{ color: 'white' }}>
                  <h3>Add Batches</h3>
                </text>
              </Center>
            </Card>
            </Link>
      </Grid.Col>
      <Grid.Col span={4}>

      </Grid.Col>
    </Grid>
      </AppShell.Main>
    </AppShell>
  );
}