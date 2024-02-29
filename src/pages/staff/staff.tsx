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
import { DateInput } from '@mantine/dates';

import classes from './staff.module.css';
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
  { icon: IconUserCog, label: 'Admin' },
  { icon: IconIdBadge, label: 'Staff' },
  { icon: IconIdBadge, label: 'Student' },
  { icon: IconSettings, label: 'Settings' },
];

const items = [{ title: 'STAFF', href: '#' }].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));
const elements = [
  //   { rollNum: 1, name: 'Nandeesh', usn: '3VC21CS109', semester: 5, branch: 'CSE' , subject: 'DBMS',option: <Group>
  //   <Button variant="primary">P</Button>
  //   <Button variant="filled" color="red">A</Button>
  // </Group>},
  //    { rollNum: 1, name: 'Gagan', usn: '3VC21CS046', semester: 5, branch: 'CSE' , subject: 'DBMS',option: <Group>
  //    <Button variant="primary">P</Button>
  //    <Button variant="filled" color="red">A</Button>
  //  </Group>},
  //    { rollNum: 1, name: 'Nandeesh', usn: '3VC21CS109', semester: 5, branch: 'CSE' , subject: 'DBMS',option: <Group>
  //   <Button variant="primary">P</Button>
  //   <Button variant="filled" color="red">A</Button>
  // </Group>},
];

export function Staff() {
  const [opened, { toggle }] = useDisclosure();
  const [value, setValue] = useState<Date | null>(null);
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
  const [selectedSem, setSelectedSem] = useState('');
  const [selectedSec, setSelectedSec] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [branches, setBranches] = useState([]);
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [staffData, setStaffData] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => {
    // Fetch the list of areas from the specified endpoint
    const fetchBranches = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/branches/');
        const data = await response.json();
        setBranches(data);
      } catch (error) {
        console.error('Error fetching States:', error);
      }
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    // Fetch the list of areas from the specified endpoint
    const fetchBatches = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/batches/');
        const data = await response.json();
        setBatches(data);
      } catch (error) {
        console.error('Error fetching States:', error);
      }
    };

    fetchBatches();
  }, []);

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

  const handleRequest = async () => {
    try {
      const distData = {
        sem: sem,
        sec: sec,
        batch: batch,
        subject: sub,
        branch: branch,
        date: date.toString(),
      };

      console.log('Data being sent:', distData);

      const response = await fetch('http://127.0.0.1:8000/api/attendance/ ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(distData),
      });

      if (response.ok) {
        setRedirectUrl('/staff');
        setShowSuccess(true);
        console.log('Student added successfully');
      } else {
        console.error('Failed to add Student:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);

      if (error instanceof Error) {
        console.error('Error message:', error.message);
      }
    }
  };

  const handleModalClose = () => {
    setShowSuccess(false);

    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Construct the API URL with selected filter options
  //       const apiUrl = http://localhost:8000/iam_app/varun/ia/?stu_sem=${selectedSem}&branch=${selectedBranch}&batch=${selectedBatch}&sec=${selectedSec};
  //       const response = await fetch(apiUrl);
  //       const data = await response.json();
  //       setStaffData(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [selectedBatch, selectedSem, selectedBranch, selectedSec]); // Update data when filter options change

  const rows = staffData.map((element) => (
    <Table.Tr key={element.sem}>
      <Table.Td>{element.sec}</Table.Td>
      <Table.Td>{element. batch}</Table.Td>
      <Table.Td>{element.branch}</Table.Td>
      <Table.Td>{element.sub}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      
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

        <Group justify="right">
          <Link to="/record">
            <Button variant="filled" color="#292929" mr={15} className={classes.record}>
              Attendance Record
            </Button>
          </Link>
        </Group>

        <Title order={1} ml={20} style={{ color: 'white' }}>
          Attendance Registration
        </Title>

        <Grid p={20}>
          <Grid.Col span={4}>
            <NativeSelect
              label="Batch"
              value={selectedBatch}
              onChange={(event) => {
                const selectedValue = event.target.value;
                console.log('Selected batch Id:', selectedValue);
                setSelectedBatch(selectedValue ? parseInt(selectedValue, 10) : null);
              }}
              data={[
                { label: 'Select the batch', value: null }, // Initial option
                ...(batches &&
                  batches.map((s) => ({ label: `${s.batch_name}`, value: `${s.batch_id}` }))),
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
            <NativeSelect
              label="Branch"
              value={selectedBranch}
              onChange={(event) => {
                const selectedValue = event.target.value;
                console.log('Selected branch Id:', selectedValue);
                setSelectedBranch(selectedValue ? parseInt(selectedValue, 10) : null);
              }}
              data={[
                { label: 'Select the Branch', value: null }, // Initial option
                ...(branches &&
                  branches.map((s) => ({ label: `${s.branch_name}`, value: `${s.branch_id}` }))),
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
            <NativeSelect
              label="Semester"
              value={selectedSem}
              onChange={(event) => {
                const selectedValue = event.target.value;
                console.log('Selected Organization Type:', selectedValue);
                setSelectedSem(selectedValue);
              }}
              data={[
                { label: 'Select Type', value: '' },
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
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
            <NativeSelect
              label="Section"
              value={selectedSec}
              onChange={(event) => {
                const selectedValue = event.target.value;
                console.log('Selected Organization Type:', selectedValue);
                setSelectedSec(selectedValue);
              }}
              data={[
                { label: 'Select Type', value: '' },
                { label: 'A', value: 'A' },
                { label: 'B', value: 'B' },
                { label: 'C', value: 'C' },
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
            <NativeSelect
              label="Subjects"
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
              clearable
              label="Date input"
              placeholder="Date input"
              type="date"
              value={selectedDate} // Format dob as YYYY-MM-DD string
              onChange={(event) => setDate(event.target.value)}
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
        <Button variant="filled" color="#292929" ml={20} mt={10} className={classes.save}>
          SEARCH
        </Button>
        <Table highlightOnHoverColor="#00000" withTableBorder>
          <Table.Thead style={{ color: 'white' }}>
            <Table.Tr>
              <Table.Th>Semester</Table.Th>
              <Table.Th>Batch</Table.Th>
              <Table.Th>Branch</Table.Th>
              <Table.Th>Subject</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          {/* <Table.Tbody>{rows}</Table.Tbody> */}
        </Table>
      </AppShell.Main>
    </AppShell>
  );
}
