import { useEffect, useState } from 'react';
import {
  AppShell,
  Tooltip,
  Burger,
  Group,
  Stack,
  UnstyledButton,
  rem,
  TextInput,
  Title,
  Card,
  Button,
  Grid,
  Center,
  NativeSelect,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Header } from '../header/header';

import classes from './record.module.css';
import { Nav } from '../nav/nav';
import { Breadcrumbs, Anchor, Table } from '@mantine/core';
import { IconHome2, IconIdBadge, IconUser, IconLogout } from '@tabler/icons-react';

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

const mockdata = [{ icon: IconIdBadge, label: 'Staff' }];

const items = [
  { title: 'staff', href: '/staff' },
  { title: 'ATTENDANCE RECORD', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));
const element = [
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

  const [selectedSub, setSelectedSub] = useState('');
  const [subjects, setSubjects] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [attdData, setAttdData] = useState([]);


  useEffect(() => {
    // Fetch the list of areas from the specified endpoint
    const fetchSubjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/subjects/');
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error('Error fetching States:', error);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the API URL with selected filter options
        const apiUrl = `http://127.0.0.1:8000/api/filter/attendance/?subject=${selectedSub}&date=${selectedDate}`;
        const response = await fetch(apiUrl);

        const data = await response.json();
        setAttdData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedSub, selectedDate]); // Update data when filter options change
  


  const rows = attdData.map((row) => (
    <Table.Tr style={{ backgroundColor: '#474747', color: 'white' }} key={row.id}>
      <Table.Td>{row.std_id}</Table.Td>
      <Table.Td>{row.branch}</Table.Td>
      <Table.Td>{row.sem}</Table.Td>
      <Table.Td>{row.sec}</Table.Td>
      <Table.Td>
        {/* Conditionally render button based on attendance */}
        {row.attendance === 'Present' ? (
          <Button variant="outline" color="blue" disabled>
            P
          </Button>
        ) : (
          <Button variant="outline" color="red" disabled>
            A
          </Button>
        )}
      </Table.Td>
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
        <Group>
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Header />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" mt={13} style={{ backgroundColor: '#292929' }}>
        <div className={classes.Container}>
          <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
              <Stack justify="center" gap={20}>
                <Link to="/staff">
                  <NavbarLink icon={IconIdBadge} label="Staff" active={isStudentActive} />
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

      <AppShell.Main style={{ backgroundColor: '#474747' }}>
        <Breadcrumbs ml={15} mt={20} className={classes.path}>
          {items}
        </Breadcrumbs>
        <Grid p={20}>

          <Grid.Col span={4}>
            <NativeSelect
              label="Subject"
              value={selectedSub}
              onChange={(event) => {
                const selectedValue = event.target.value;
                console.log('Selected subject Id:', selectedValue);
                setSelectedSub(selectedValue ? parseInt(selectedValue, 10) : null);
              }}
              data={[
                { label: 'Select the subject', value: null }, // Initial option
                ...(subjects &&
                  subjects.map((s) => ({ label: `${s.sub_name}`, value: `${s.sub_id}` }))),
              ]}
              styles={{
                label: {
                  color: 'white',
                },
                input: {
                  backgroundColor: '#292929',
                  border: 'none',
                  color: 'white',
                  height: '40px',
                },
              }}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <TextInput
              label="Date input"
              placeholder="Date input"
              type="date"
              value={selectedDate} // Format dob as YYYY-MM-DD string
              onChange={(event) => setSelectedDate(event.target.value)}
              styles={{
                label: {
                  color: 'white',
                },
                input: {
                  backgroundColor: '#292929',
                  border: 'none',
                  color: 'white',
                  height: '40px',
                },
              }}
            />
          </Grid.Col>

        </Grid>
        <Table highlightOnHoverColor="#00000" withTableBorder>
          <Table.Thead style={{ color: 'white' }}>
            <Table.Tr>
              <Table.Th>Student</Table.Th>
              <Table.Th>Branch</Table.Th>
              <Table.Th>Sem</Table.Th>
              <Table.Th>Sec</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </AppShell.Main>
    </AppShell>
  );
}
