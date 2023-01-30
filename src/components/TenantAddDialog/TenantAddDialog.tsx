/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

interface Props {
  onClose: () => void;
  onSave: () => void;
  open: boolean;
}
export const TenantAddDialog: React.FC<Props> = ({ onClose, onSave, open }) => {
  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onSave();
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          minWidth: 400,
          maxHeight: 435,
        },
      }}
      open={open}
    >
      <DialogTitle>Add New Tenant</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: 400 }}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              paddingBottom: '10px'
            }}
          >
            <Grid item xs>
              <Typography>Name</Typography>
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                size="small"
                sx={{ width: 300 }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              paddingBottom: '10px'
            }}
          >
            <Grid item xs>
              <Typography>Address</Typography>
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                size="small"
                sx={{ width: 300 }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Grid item xs>
              <Typography>Website</Typography>
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                size="small"
                sx={{ width: 300 }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
