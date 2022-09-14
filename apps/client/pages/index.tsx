import { Box, Container, Paper, createStyles, Text, Title, TextInput, Button, Group, CopyButton, Tooltip, ActionIcon, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useRef, useState } from 'react'
import styled from '@emotion/styled';
import { IconCopy, IconCheck } from '@tabler/icons';
import NavbarComponent from '../components/navbar.component';
import { HeadingTitle } from '../styled-components/typography.styled';
import CollapseComponent from '../components/collapse.component';

const useStyles = createStyles((theme) => ({
  title: {
    textAlign: 'center',
    fontSize: 40,
    color: theme.colors.white[1]
  },
  form: {
    justifyContent:'center',
  },
  inner: {
    // paddingTop: 120
  },
  hero: {
    position: 'relative',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${theme.other.links.heroimglink})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: 120
  }
}))

const FormGroup = styled(Group)`
  > * {
    border-radius: 0
  }
`;

export default function Home(): JSX.Element {
  const { classes } = useStyles()
  const [opened, setOpened] = useState(true);
  const copyRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    initialValues: {
      url: ''
    }
  })

  return (
    <>
      <NavbarComponent />
      <div className={classes.hero}>
        <Container>
          <Box component='div' className={classes.inner}>
            <HeadingTitle className={classes.title}>
              Shorten your{' '}
              <Text component='span'>URLs</Text>{' '}
              with Slink
            </HeadingTitle>
          </Box>
          <Box>
            <form onSubmit={form.onSubmit(() => setOpened((curropened) => !curropened))}>
              <FormGroup mt="md" className={classes.form} sx={{ gap: 10 }}>
                <TextInput
                  placeholder='Enter your long URL here'
                  // width='lg'
                  radius="xs"
                  {...form.getInputProps('url')}
                />
                <Button radius="xs" type="submit">Shorten !</Button>
              </FormGroup>
            </form>
            
            <CollapseComponent opened={opened} copyRef={copyRef} />
          </Box>
        </Container>
      </div>
    </>
  );
}