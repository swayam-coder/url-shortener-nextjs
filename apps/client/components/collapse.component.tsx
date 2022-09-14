import React from 'react'
import { ActionIcon, Collapse, CopyButton, Group, Paper, Text, Tooltip } from "@mantine/core"
import { IconCheck, IconCopy } from '@tabler/icons'

export default function CollapseComponent({ opened, copyRef }: any) {
    return (
        <Collapse in={opened} mt='50px'>
            <Group sx={{ justifyContent: 'center' }}>
                <Paper shadow="xs">
                    <Text ref={copyRef} p="2px 15px">Paper is the most basic ui component</Text>
                </Paper>
                
                <CopyButton value={(copyRef.current && copyRef.current.innerText) ? copyRef.current.innerText : ''} timeout={2000}>
                    {({ copied, copy }) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                            <ActionIcon size="md" variant="light" color='blue' onClick={copy}>
                                {copied ? <IconCheck color='blue' size={20} /> : <IconCopy size={20} />}
                            </ActionIcon>
                        </Tooltip>
                    )}
                </CopyButton>
            </Group>
        </Collapse>
    )
}
