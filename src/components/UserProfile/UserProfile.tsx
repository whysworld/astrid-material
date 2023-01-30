import Avatar from '@mui/material/Avatar';
import UserIcon from '@mui/icons-material/Person';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const UserProfile = () => {
  return (
    <>
      <Grid container flexDirection='row' sx={{ textAlign: 'left' }} spacing={3} alignItems='center'> 
        <Grid item>
          <Avatar alt="Abdullah" sx={{ width: 96, height: 96 }}><UserIcon sx={{ width: 80, height: 80 }} /></Avatar>
        </Grid>
        <Grid item>
          <Typography>Abdullah Darwech</Typography>
          <Typography>amdarwech68@gmail.com</Typography>
        </Grid>
      </Grid>
    </>
  )
}