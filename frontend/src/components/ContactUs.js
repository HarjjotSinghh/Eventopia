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
import { ContactIconsList } from './ContactUsInfo.tsx';
import Navbar from './Navbar.js';
import Footer from './Footer.jsx';
  
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
        background: 'linear-gradient(25deg, #ff6739 ,#ff9a7b)',
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
        <>
            <Navbar/>
            <div className='flex items-center justify-center lg:h-screen lg:w-screen py-24 mt-2'>
                <Paper className='scale-[1.1]' shadow="md" radius="lg">
                    <div className={classes.wrapper}>
                    <div className={`${classes.contacts} flex items-center justify-center  flex-col`}>
                        <Text fz="2xl" fw={700} className={`${classes.title} text-center`} c="#fff">
                            Contact Us
                        </Text>
                        <ContactIconsList variant="black"/>
                    </div>
            
                    <form className={classes.form} onSubmit={(event) => event.preventDefault()}>

            
                        <div className={classes.fields}>
                        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                            <TextInput label="Your Name" placeholder="Your name" />
                            <TextInput label="Your Email" placeholder="your@email.com" required />
                        </SimpleGrid>
            
                        <TextInput mt="md" label="Subject" placeholder="Subject" required />
            
                        <Textarea
                            mt="md"
                            label="Your Message"
                            placeholder="Please include all relevant information"
                            minRows={5}
                        />
            
                        <Group position="right" mt="lg">
                            <Button type="submit" className={`${classes.control} rounded-[10px] bg-gradient-to-r from-[#ff6739] to-[#ff9a7b]`}>
                            Send message
                            </Button>
                        </Group>
                        </div>
                    </form>
                    </div>
                </Paper>
            </div>
          <Footer/>
        </>
        
      
    );
  }