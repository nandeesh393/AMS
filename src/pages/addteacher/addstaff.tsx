import {
  AppShell,
  Burger,
  Group,
  TextInput,
  Title,
  Card,
  Button,
  Grid,
  Center,
  NativeSelect,
  Modal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Header } from '../header/header';

import classes from './addstaff.module.css';
import { Nav } from '../nav/nav';
import { Breadcrumbs, Anchor, Table } from '@mantine/core';
import { useEffect, useState } from 'react';

const items = [
  { title: 'Admin', href: '/admin' },
  { title: 'ADD STAFF', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));
const elements = [
  // { rollNum: 1, name: 'Nandeesh', usn: '3VC21CS109', semester: 5, branch: 'CSE' ,option: <Button variant="filled" color="red">Delete</Button>},
  // { rollNum: 2, name: 'Nandeesh', usn: '3VC21CS110', semester: 5, branch: 'CSE' ,option: <Button variant="filled" color="red">Delete</Button> },
  // { rollNum: 3, name: 'Nandeesh', usn: '3VC21CS111', semester: 5, branch: 'CSE' ,option: <Button variant="filled" color="red">Delete</Button> },
  // { rollNum: 4, name: 'Nandeesh', usn: '3VC21CS112', semester: 5, branch: 'CSE' ,option: <Button variant="filled" color="red">Delete</Button> },
  // { rollNum: 5, name: 'Nandeesh', usn: '3VC21CS113', semester: 5, branch: 'CSE' ,option: <Button variant="filled" color="red">Delete</Button> },
  // { rollNum: 6, name: 'Nandeesh', usn: '3VC21CS114', semester: 5, branch: 'CSE' ,option: <Button variant="filled" color="red">Delete</Button> },
];

export function Addstaff() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const [showSuccess, setShowSuccess] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  const [staffData, setStaffData] = useState([]);

  const [branch_name, setBranchName] = useState('');
  const [branchData, setBranchData] = useState([]);

  const [branches, setBranches] = useState('');
  const [subjects, setSubjects] = useState('');

  const [staff_name, setStaffName] = useState('');
  const [staff_code, setStaffCode] = useState('');
  const [branch, setBranch] = useState('');
  const [subject, setSubject] = useState('');
  // const [sem, setSem] = useState('');

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
        staff_name: staff_name,
        staff_code: staff_code,
        // sem: sem,
        subject: subject,
        branch: branch,
      };

      console.log('Data being sent:', distData);

      const response = await fetch('http://127.0.0.1:8000/api/staff/ ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(distData),
      });

      if (response.ok) {
        setRedirectUrl('/addstaff');
        setShowSuccess(true);
        console.log('Staff added successfully');
      } else {
        console.error('Failed to add Staff:', response.status, response.statusText);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/branches/');
        const data = await response.json();
        setBranchData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/staff/');
        const data = await response.json();
        setStaffData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStaffData();
  }, []);

  const rows = staffData.map((element) => {
    // Find the branch name corresponding to the branch ID
    const branchName =
      branches.find((branch) => branch.branch === element.branch_id)?.branch_name || '';

    // Find the branch name corresponding to the branch ID
    const subName = subjects.find((subject) => subject.subject === element.sub_id)?.sub_name || '';

    return (
      <Table.Tr style={{ backgroundColor: '#474747', color: 'white' }} key={element.staff_id}>
        <Table.Td>{element.staff_name}</Table.Td>
        <Table.Td>{element.staff_code}</Table.Td>
        <Table.Td>{branchName}</Table.Td> {/* Display branch name instead of ID */}
        <Table.Td>{subName}</Table.Td>
      </Table.Tr>
    );
  });

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
        <Nav />
      </AppShell.Navbar>

      <AppShell.Main style={{ backgroundColor: '#474747' }}>
        <Breadcrumbs ml={15} mt={20} className={classes.path}>
          {items}
        </Breadcrumbs>
        <Title order={1} mt={20} ml={20} style={{ color: 'white' }}>
          Staff Registration
        </Title>
        <Grid p={20}>
          <Grid.Col span={4}>
            <TextInput
              label="Staff Name"
              placeholder="enter staff name"
              className={classes.form}
              value={staff_name}
              onChange={(event) => setStaffName(event.target.value)}
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
              label="Staff code"
              placeholder="enter staff code"
              value={staff_code}
              onChange={(event) => setStaffCode(event.target.value)}
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
              value={branch}
              onChange={(event) => {
                const selectedValue = event.target.value;
                console.log('Selected branch Id:', selectedValue);
                setBranch(selectedValue ? parseInt(selectedValue, 10) : null);
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
              label="Subjects"
              value={subject}
              onChange={(event) => {
                const selectedValue = event.target.value;
                console.log('Selected subject Id:', selectedValue);
                setSubject(selectedValue ? parseInt(selectedValue, 10) : null);
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
          {/* <Grid.Col span={4}>
      <NativeSelect label="Semester" data={[ '1', '2','3', '4', '5','6','7','8']} styles={{
        label: {
          color: 'white',
        },
        input: {
          backgroundColor: '#292929',
          border: 'none',
          color: 'white',
          height: '40px'
         },
      }}/>
      </Grid.Col> */}
        </Grid>
        <Button
          variant="filled"
          color="#292929"
          ml={20}
          mt={10}
          className={classes.save}
          onClick={handleRequest}
        >
          Registration
        </Button>
        <Table highlightOnHoverColor="#00000" withTableBorder>
          <Table.Thead style={{ color: 'white' }}>
            <Table.Tr>
              <Table.Th>Staff Name</Table.Th>
              <Table.Th>Staff code</Table.Th>
              <Table.Th>Branch</Table.Th>
              <Table.Th>Subject</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Modal title="Success" opened={showSuccess} onClose={handleModalClose} withCloseButton>
          Data added successfully!
        </Modal>
      </AppShell.Main>
    </AppShell>
  );
}
