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

import classes from './addsubject.module.css';
import { Nav } from '../nav/nav';
import { Breadcrumbs, Anchor, Table } from '@mantine/core';
import { useEffect, useState } from 'react';

const items = [
  { title: 'Admin', href: '/admin' },
  { title: 'ADD SUBJECT', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));
const elements = [];

export function Addsubject() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const [subject_name, setSubject_name] = useState('');
  const [subject_code, setSubject_code] = useState('');
  const [subject_credit, setSubject_credit] = useState('');

  const [branch, setBranch] = useState('');
  const [subData, setSubData] = useState([]);
  const [branches, setBranches] = useState([]);

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

  const handleRequest = async () => {
    try {
      const subData = {
        sub_name: subject_name,
        sub_code: subject_code,
        branch: branch,
        subject_credit: subject_credit,
      };

      console.log('Data being sent:', subData);

      const response = await fetch('http://127.0.0.1:8000/api/subjects/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subData),
      });

      if (response.ok) {
        setRedirectUrl('/addsubject');
        setShowSuccess(true);
        console.log('Subject added successfully');
      } else {
        console.error('Failed to add Subject:', response.status, response.statusText);
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
    const fetchSubData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/subjects/');
        const data = await response.json();
        setSubData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSubData();
  }, []);

  const rows = subData.map((element) => {

    // Find the branch name corresponding to the branch ID
    const branchName =
      branches.find((branch) => branch.branch === element.branch_id)?.branch_name || '';

    return (
      <Table.Tr style={{ backgroundColor: '#474747', color: 'white' }} key={element.sub_id}>
        <Table.Td>{element.sub_name}</Table.Td>
        <Table.Td>{element.sub_code}</Table.Td>
        <Table.Td>{branchName}</Table.Td>
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
          Subject Registration
        </Title>
        <Grid p={20}>
          <Grid.Col span={4}>
            <TextInput
              label="Subject"
              placeholder="enter subject"
              value={subject_name}
              onChange={(event) => setSubject_name(event.target.value)}
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
              label="Subject Code"
              placeholder="Enter subject Code"
              value={subject_code}
              onChange={(event) => setSubject_code(event.target.value)}
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
              label="Credits"
              value={subject_credit}
              onChange={(event) => {
                const selectedValue = event.target.value;
                console.log('Selected Subject Credit:', selectedValue);
                setSubject_credit(selectedValue);
              }}
              data={[
                { label: 'Select Type', value: '' },
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
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
              <Table.Th>Subject</Table.Th>
              <Table.Th>Subject Code</Table.Th>
              <Table.Th>Branch</Table.Th>
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
