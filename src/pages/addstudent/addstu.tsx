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

import classes from './addstu.module.css';
import { Nav } from '../nav/nav';
import { Breadcrumbs, Anchor, Table } from '@mantine/core';
import { useEffect, useState } from 'react';

const items = [
  { title: 'Admin', href: '/admin' },
  { title: 'ADD STUDENT', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));
const elements = [

];

export function Addstudent() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const [branch_name, setBranchName] = useState('');
  const [branchData, setBranchData] = useState([]);

  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');
  const [roll_no, setRoll_no] = useState('');
  const [sem, setSem] = useState('');
  const [sec, setSec] = useState('');
  const [batch, setBatch] = useState('');
  const [gen, setGen] = useState('');
  const [branch, setBranch] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');

  const [stdData, setStdData] = useState([]);

  const [branches, setBranches] = useState([]);
  const [batches, setBatches] = useState([]);

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

  const handleRequest = async () => {
    try {
      const distData = {
        std_usn: usn,
        std_name: name,
        roll_no: roll_no,
        sem: sem,
        sec: sec,
        batch: batch,
        gender: gen,
        branch: branch,
        mobile: phone,
        dob: dob.toString(),
      };

      console.log('Data being sent:', distData);

      const response = await fetch('http://127.0.0.1:8000/api/students/ ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(distData),
      });

      if (response.ok) {
        setRedirectUrl('/addstudent');
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

  

  useEffect(() => {
    const fetchStdData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/students/');
        const data = await response.json();
        setStdData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStdData();
  }, []);
  const rows = stdData.map((element) => (
    <Table.Tr style={{ backgroundColor: '#474747', color: 'white' }} key={element.std_id}>
      <Table.Td>{element.roll_no}</Table.Td>
      <Table.Td>{element.std_name}</Table.Td>
      <Table.Td>{element.std_usn}</Table.Td>
      <Table.Td>{element.sem}</Table.Td>
      <Table.Td>{element.sec}</Table.Td>
      <Table.Td>{element.batch}</Table.Td>
      <Table.Td>{element.gender}</Table.Td>
      <Table.Td>{element.branch}</Table.Td>
      <Table.Td>{element.mobile}</Table.Td>
      <Table.Td>{element.dob}</Table.Td>
    </Table.Tr>
  ));

  // const rows = elements.map((element) => (
  //   <Table.Tr style={{ backgroundColor: '#474747', color: 'white' }} key={element.rollNum}>
  //     <Table.Td>{element.rollNum}</Table.Td>
  //     <Table.Td>{element.name}</Table.Td>
  //     <Table.Td>{element.usn}</Table.Td>
  //     <Table.Td>{element.semester}</Table.Td>
  //     <Table.Td>{element.branch}</Table.Td>
  //     <Table.Td>{element.option}</Table.Td>
  //   </Table.Tr>
  // ));
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
          Student Registration
        </Title>
        <Grid p={20}>
          <Grid.Col span={4}>
            <TextInput
              label="Name"
              placeholder="enter your name"
              className={classes.form}
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              label="USN"
              placeholder="enter your USN"
              value={usn}
              onChange={(event) => setUsn(event.target.value)}
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
              label="Roll num"
              placeholder="enter your roll num"
              value={roll_no}
              onChange={(event) => setRoll_no(event.target.value)}
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
              label="Batch"
              value={batch}
              onChange={(event) => {
                const selectedValue = event.target.value;
                console.log('Selected batch Id:', selectedValue);
                setBatch(selectedValue ? parseInt(selectedValue, 10) : null);
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
              label="Semester"
              value={sem}
              onChange={(event) => {
                const selectedValue = event.target.value;
                console.log('Selected Organization Type:', selectedValue);
                setSem(selectedValue);
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
              value={sec}
              onChange={(event) => {
                const selectedValue = event.target.value;
                console.log('Selected Organization Type:', selectedValue);
                setSec(selectedValue);
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
              label="Gender"
              onChange={(event) => {
                const selectedValue = event.target.value;
                console.log('Selected Organization Type:', selectedValue);
                setGen(selectedValue);
              }}
              data={[
                { label: 'Select Type', value: '' },
                { label: 'M', value: 'M' },
                { label: 'F', value: 'F' },
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
            <TextInput
              label="Phone num"
              placeholder="enter your phone num"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
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
              value={dob} // Format dob as YYYY-MM-DD string
              onChange={(event) => setDob(event.target.value)}
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
              <Table.Th>Roll num</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Usn</Table.Th>
              <Table.Th>Batch</Table.Th>
              <Table.Th>Semester</Table.Th>
              <Table.Th>Section</Table.Th>
              <Table.Th>Gender</Table.Th>
              <Table.Th>Branch</Table.Th>
              <Table.Th>Phone Num</Table.Th>
              <Table.Th>DOB</Table.Th>
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
