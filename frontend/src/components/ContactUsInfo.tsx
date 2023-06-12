import { createStyles, ThemeIcon, Text, SimpleGrid, Box, Stack } from '@mantine/core';
// import { IconPhone, IconMapPin, IconAt } from '@tabler/icons-react';
import AlternateEmailIcon from '../assets/svg/alternate_email.svg';
import PhoneIcon from '../assets/svg/phone.svg';
import LocationOnIcon from '../assets/svg/location.svg';


import { Helmet } from 'react-helmet';

type ContactIconVariant = 'white' | 'gradient';

interface ContactIconStyles {
  variant: ContactIconVariant;
}

const useStyles = createStyles((theme, { variant }: ContactIconStyles) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    color: theme.white,
  },

  icon: {
    marginRight: theme.spacing.md,
    backgroundImage:
      variant === 'gradient'
        ? `linear-gradient(135deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
            theme.colors[theme.primaryColor][6]
          } 100%)`
        : 'none',
    backgroundColor: 'transparent',
  },

  title: {
    color: variant === 'gradient' ? theme.colors.gray[6] : theme.colors[theme.primaryColor][0],
  },

  description: {
    color: variant === 'gradient' ? theme.black : theme.white,
  },
}));

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  title: React.ReactNode;
  description: React.ReactNode;
  variant?: ContactIconVariant;
}

function ContactIcon({
  title,
  description,
  variant = 'gradient',
  className,
  ...others
}: ContactIconProps) {
  const { classes, cx } = useStyles({ variant });
  return (
    <div className={cx(classes.wrapper, className)} {...others}>

      <div>
        <Text size="14px" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

interface ContactIconsListProps {
  data?: ContactIconProps[];
  variant?: ContactIconVariant;
}

// const PhoneIcon = () => {
//   <span className="material-icons"> phone </span>
// }
// const AlternateEmailIcon = () => {
//   <span className="material-icons"> alternate_email </span>
// } 
// const LocationOnIcon = () => {
//   <span className="material-icons"> location_on </span>
// }




const MOCKDATA = [
  { title: 'Email', description: 'contact@eventopia.org', icon: AlternateEmailIcon },
  { title: 'Phone', description: '+91 99582 10259', icon: PhoneIcon },
  { title: 'Address', description: 'New Delhi, India', icon: LocationOnIcon },
];

export function ContactIconsList({ data = MOCKDATA, variant }: ContactIconsListProps) {
  const items = data.map((item, index) => <ContactIcon key={index} variant={variant} {...item} />);
  return <Stack>{items}</Stack>;
}

export function ContactIcons() {
  return (
    <>

      <Helmet>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
      </Helmet>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 755, cols: 1 }]}>
        <Box
          sx={(theme) => ({
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            backgroundColor: theme.white,
          })}
        >
          <ContactIconsList />
        </Box>

        <Box
          sx={(theme) => ({
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            backgroundImage: `linear-gradient(135deg, ${theme.colors[theme.primaryColor][6]} 0%, ${
              theme.colors[theme.primaryColor][4]
            } 100%)`,
          })}
        >
          <ContactIconsList variant="white" />
        </Box>
      </SimpleGrid>
    </>
  );
}