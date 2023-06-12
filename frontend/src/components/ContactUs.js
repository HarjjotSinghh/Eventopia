import {
    Paper,
    Text,
    TextInput,
    Textarea,
    Button,
    Group,
    SimpleGrid,
    createStyles,
    rem,
    Center,
  } from '@mantine/core';
  
  const useStyles = createStyles((theme) => {
    const BREAKPOINT = theme.fn.smallerThan('sm');
  
    return {
      wrapper: {
        display: 'flex',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        borderRadius: theme.radius.lg,
        border: `${rem(1)} solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
        }`,
        
        [BREAKPOINT]: {
          flexDirection: 'column',
          width: '90vw',
        },
      },
  
      form: {
        boxSizing: 'border-box',
        flex: 1,
        padding: '50px',
        paddingLeft: `calc(${theme.spacing.xl} * 2)`,
        borderLeft: 0,
        
        [BREAKPOINT]: {
          padding: '50px',
          paddingLeft: '50px',
          width: '90vw',
        },
      },
  
      fields: {
        marginTop: rem(-12),
      },
  
      fieldInput: {
        flex: 1,
  
        '& + &': {
          marginLeft: theme.spacing.md,
  
          [BREAKPOINT]: {
            marginLeft: 0,
            marginTop: theme.spacing.md,
          },
        },
      },
  
      fieldsGroup: {
        display: 'flex',
  
        [BREAKPOINT]: {
          flexDirection: 'column',
        },
      },
  
      contacts: {
        boxSizing: 'border-box',
        position: 'relative',
        borderRadius: theme.radius.lg,
        background: 'linear-gradient(25deg, #25ffed, #07feaa)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: `${rem(1)} solid transparent`,
        padding: theme.spacing.xl,
        flex: `0 0 ${rem(280)}`,
  
        [BREAKPOINT]: {
          marginBottom: theme.spacing.sm,
          paddingLeft: theme.spacing.md,
        },
      },
  
      title: {
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,

        fontSize: rem(40),
        [BREAKPOINT]: {
          marginBottom: theme.spacing.xl,
        },
      },
  
      control: {
        [BREAKPOINT]: {
          flex: 1,
        },
      },
    };
  });
  
  export function ContactUs() {
    const { classes } = useStyles();
  
    return (
        <div className='flex items-center justify-center lg:h-screen lg:w-screen '>
            <Paper shadow="md" radius="lg">
                <div className={classes.wrapper}>
                <div className={`${classes.contacts} flex items-center justify-center text-center`}>
                    <Text fz="2xl" fw={700} className={classes.title} c="#fff">
                        Contact Us
                    </Text>
                    
                </div>
        
                <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
                    <Text fz="xl" fw={700} className={classes.title}>
                    Get in touch
                    </Text>
        
                    <div className={classes.fields}>
                    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                        <TextInput label="Your name" placeholder="Your name" />
                        <TextInput label="Your email" placeholder="hello@mantine.dev" required />
                    </SimpleGrid>
        
                    <TextInput mt="md" label="Subject" placeholder="Subject" required />
        
                    <Textarea
                        mt="md"
                        label="Your message"
                        placeholder="Please include all relevant information"
                        minRows={3}
                    />
        
                    <Group position="right" mt="md">
                        <Button type="submit" className={classes.control}>
                        Send message
                        </Button>
                    </Group>
                    </div>
                </form>
                </div>
            </Paper>
        </div>
      
    );
  }