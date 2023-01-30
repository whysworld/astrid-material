
import {
  Card,
  CardContent,
  Typography,
  Divider,
  CardHeader,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { BreadcrumbWidget } from '../../components/BreadcrumbWidget';
import { UserProfile } from '../../components/UserProfile';
import { UserSettingsThemeToggle } from '../../components/UserSettingsThemeToggle';

export const SettingsPage = () => {

  return (
    <>
      <BreadcrumbWidget>
        <Link href="/settings" underline="none">
          Settings
        </Link>
      </BreadcrumbWidget>
      <Grid container padding={10} spacing={4}>
        <Grid item xs>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Profile">
              <Typography variant="h4" component="div">
                Profile
              </Typography>
            </CardHeader>
            <Divider />
            <CardContent>
              <UserProfile />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Appearance">
              <Typography variant="h4" component="div">
                Appearance
              </Typography>
            </CardHeader>
            <Divider />
            <CardContent>
              <UserSettingsThemeToggle />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>

  )
}