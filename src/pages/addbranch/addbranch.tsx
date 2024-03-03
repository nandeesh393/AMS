import { AppShell, Burger,Group,  TextInput, Title, Card, Button, Grid, Center, NativeSelect, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Header } from '../header/header';

import classes from './addbranch.module.css'
import { Nav } from '../nav/nav';
import { Breadcrumbs, Anchor, Table } from '@mantine/core';
import { useEffect, useState } from 'react';

const items = [
  { title: 'Admin', href: '/admin' },
  { title: 'ADD BRANCH', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));
const elements = [
  
];

export function Addbranch() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(true);
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const [branch_name, setBranch_name] = useState('');
  const [branch_code, setBranch_code] = useState('');

  
  const [branchData, setBranchData] = useState([]);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');
  

  const handleAddBranch = async () => {
    try {
      const branchData = {
        branch_name: branch_name,
        branch_code: branch_code,            
      };
  
      console.log('Data being sent:', branchData);

      const response = await fetch('http://127.0.0.1:8000/api/branches/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(branchData),
        
      });
  
      if (response.ok) {
        setRedirectUrl('/addbranch');
        setShowSuccess(true);
        console.log('Branch added successfully');
      } else {
        console.error('Failed to add Branch:', response.status, response.statusText);
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
 
  const rows = branchData.map((element) => (
    <Table.Tr style={{ backgroundColor: '#474747', color: 'white' }} key={element.branch_id}>
       <Table.Td>{element.branch_name}</Table.Td>
       <Table.Td>{element.branch_code}</Table.Td>      
      
    </Table.Tr>
  ));
  // const rows = elements.map((element) => (
  //   <Table.Tr style={{ backgroundColor: '#474747', color: 'white' }} key={element.branch_id}>
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
      <Title order={1} mt={20} ml={20} style={{ color: 'white' }}>Branch Registration</Title>
      <Grid p={20}>
      <Grid.Col span={4}>
      <TextInput label="Branch" placeholder="enter branch" value={branch_name}
      onChange={(event) => setBranch_name(event.target.value)} styles={{
        label: {
          color: 'white',
        },
        input: {
          backgroundColor: '#292929',
          border: 'none',
          color: 'white',
          height: '40px'
         },
         
      }}  
      
/>
      </Grid.Col>
      <Grid.Col span={4}>
      <TextInput label="Branch" placeholder="enter branch" value={branch_code}
      onChange={(event) => setBranch_code(event.target.value)} styles={{
        label: {
          color: 'white',
        },
        input: {
          backgroundColor: '#292929',
          border: 'none',
          color: 'white',
          height: '40px'
         },
         
      }}  
      
/>
      </Grid.Col>
    </Grid>
    <Button variant="filled" color="#292929" ml={20} mt={10} className={classes.save} onClick={handleAddBranch}>Registration</Button>
    <Table highlightOnHoverColor='#00000' withTableBorder >
      <Table.Thead style={{ color: 'white' }}>
        <Table.Tr>
          <Table.Th>Branch</Table.Th>
          <Table.Th>Branch Code</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Td>{rows}</Table.Td>
    </Table>

    <Modal
          title="Success"
          opened={showSuccess}
          onClose={handleModalClose}
          withCloseButton
          >
          Data added successfully!
    </Modal>
    
      </AppShell.Main>
    </AppShell>
  );
}