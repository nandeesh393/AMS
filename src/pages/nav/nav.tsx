import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  IconHome2,
  IconIdBadge,
  IconUserCog,
 
  IconUser,
  IconSettings,
  IconLogout,
  
} from '@tabler/icons-react';


import classes from './nav.module.css';
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

export function Nav() {
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

  const isAdminActive = location.pathname === '/';

  return (

    <div className={classes.Container}>
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={20}>
          <Link to="/admin">
              <NavbarLink icon={IconUserCog} label="Admin" active={isAdminActive}  />
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
  );
}