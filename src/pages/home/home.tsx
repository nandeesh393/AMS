import { AppShell, Burger,Group,  TextInput, BackgroundImage, Box, Center,Tabs, rem,Input,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Card,
    Button} from '@mantine/core';
    import { useState } from 'react';
  import { useDisclosure } from '@mantine/hooks';
  import { Header } from '../header/header';
  import classes from './home.module.css'
  import { Nav } from '../nav/nav';
import { Link } from 'react-router-dom';
  
  
  
  export function Home() {
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
        <AppShell.Main  style={{ backgroundColor: "#474747"}}>
        <div className={classes.box}>
        <Tabs color="#000000" variant="pills" radius="md" defaultValue="ADMIN">
      <Tabs.List justify="center" ml={10} >
        <Tabs.Tab value="ADMIN" className={classes.tab}>
          ADMIN
        </Tabs.Tab>
        <Tabs.Tab value="STAFF" className={classes.tab}>
          STAFF
        </Tabs.Tab>
        <Tabs.Tab value="STUDENT" className={classes.tab}>
          STUDENT
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="ADMIN">
      
      <Card className={classes.log}>
      
      <Title ta="center" >
        Welcome ADMIN!
      </Title>
        <TextInput label="ID" mt={20} placeholder="enter your ID" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md"  />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="forgot" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Link to="/admin">
        <Button className={classes.in} fullWidth mt="xl" >
          Sign in
        </Button>
        </Link>
      </Card>
      </Tabs.Panel>

      <Tabs.Panel value="STAFF">
      
      <Card className={classes.log}>
      
      <Title ta="center" className={classes.title} >
        Welcome STAFF!
      </Title>
        <TextInput label="ID" mt={20} placeholder="enter your ID" required  />
        <PasswordInput label="Password" placeholder="Your password" required mt="md"  />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="forgot" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Link to="/staff">
        <Button className={classes.in} fullWidth mt="xl" >
          Sign in
        </Button>
        </Link>
      </Card>
      </Tabs.Panel>

      <Tabs.Panel value="STUDENT">
      
      <Card className={classes.log}>
      
      <Title ta="center" className={classes.title} >
        Welcome Back!
      </Title>
        <TextInput label="ID" className={classes.inp} mt={20} placeholder="enter your ID" />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="forgot" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Link to="/student">
        <Button className={classes.in} fullWidth mt="xl" >
          Sign in
        </Button>
        </Link>
      </Card>
   
      </Tabs.Panel>
    </Tabs>
    </div>
        </AppShell.Main>
      </AppShell>
    );
  }