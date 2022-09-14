import React from 'react';
import { Group, useMantineTheme } from '@mantine/core';
import { HeadingTitle } from '../styled-components/typography.styled';
import { Nav } from '../styled-components/navbar.styled';

export default function NavbarComponent() {
    const theme = useMantineTheme()
    return (
        <Nav height={80} p="xs">
            <Group sx={{ height: '100%' }} px={20} position="apart">
                <HeadingTitle sx={{ color: theme.colors.white[1] }}>Slink</HeadingTitle>
            </Group>
        </Nav>
    )
}