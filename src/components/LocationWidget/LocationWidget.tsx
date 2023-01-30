/*
 * Copyright 2023 The Astrid Authors
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
import TreeView from '@mui/lab/TreeView';
import TreeItem, {
  TreeItemProps,
  useTreeItem,
  TreeItemContentProps,
} from '@mui/lab/TreeItem';
import clsx from 'clsx';
import { Typography, MenuItem, Chip, Popover } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/Remove';
import CollapseIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface CustomContentProps extends TreeItemContentProps {
  onAction: (e: any) => void;
  count: number;
}
const CustomContent: any = React.forwardRef(function CustomContent(
  props: CustomContentProps,
  ref,
) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    onAction,
    count,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    preventSelection(event);
  };

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleSelection(event);
  };

  const onActionClick = (e: any) => {
    onAction(e);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      style={{ height: 44 }}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
      >
        {label}
      </Typography>
      {count > 0 && (
        <Chip
          sx={(theme) => ({
            width: '50px',
            height: '30px',
            marginRight: '20px',
            '& .MuiChip-label': {
              color: theme.palette.text.primary,
            },
          })}
          label={<Typography>{count}</Typography>}
          variant="outlined"
        />
      )}
      <MoreVertIcon onClick={onActionClick} />
    </div>
  );
});
interface CustomTreeItemProps extends TreeItemProps {
  onAction: (e: any) => void;
  count: number;
}
const CustomTreeItem: React.FC<CustomTreeItemProps> = (props: any) => {
  const { onAction, count, ...other } = props;
  return (
    <TreeItem
      ContentComponent={CustomContent}
      {...other}
      ContentProps={props}
    />
  );
};
export const LocationWidget = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const onAddLocation = () => {
    setAnchorEl(null);
  };

  const onEditLocation = () => {
    setAnchorEl(null);
  };

  const onDeleteLocation = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <TreeView
        aria-label="icon expansion"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<CollapseIcon />}
        sx={{
          height: 'calc(100vh - 260px)',
          flexGrow: 1,
          maxWidth: '400px',
          overflowY: 'auto',
          textAlign: 'left'
        }}
      >
        <CustomTreeItem
          nodeId="00"
          label="Tenant1"
          sx={{
            '& .MuiTreeItem-content': {
              paddingLeft: '0',
              borderBottom: '1px solid',
            },
            '& .MuiTreeItem-iconContainer': {
              width: '0 !important',
              margin: 0,
            },
          }}
          onAction={handlePopoverOpen}
          count={0}
        />
        <CustomTreeItem
          nodeId="1"
          label="Location1"
          onAction={handlePopoverOpen}
          count={10}
        >
          <CustomTreeItem
            nodeId="2"
            label="Location1-Child1"
            onAction={handlePopoverOpen}
            count={0}
          />
          <CustomTreeItem
            nodeId="3"
            label="Location1-Child2"
            onAction={handlePopoverOpen}
            count={0}
          />
          <CustomTreeItem
            nodeId="4"
            label="Location1-Child3"
            onAction={handlePopoverOpen}
            count={0}
          />
          <CustomTreeItem
            nodeId="5"
            label="Location1-Child3"
            onAction={handlePopoverOpen}
            count={0}
          />
          <CustomTreeItem
            nodeId="6"
            label="Location1-Child3"
            onAction={handlePopoverOpen}
            count={0}
          />
          <CustomTreeItem
            nodeId="7"
            label="Location1-Child3"
            onAction={handlePopoverOpen}
            count={0}
          />
          <CustomTreeItem
            nodeId="8"
            label="Location1-Child3"
            onAction={handlePopoverOpen}
            count={0}
          />
          <CustomTreeItem
            nodeId="9"
            label="Location1-Child3"
            onAction={handlePopoverOpen}
            count={0}
          />
          <CustomTreeItem
            nodeId="10"
            label="Location1-Child3"
            onAction={handlePopoverOpen}
            count={0}
          />
          <CustomTreeItem
            nodeId="11"
            label="Location1-Child3"
            onAction={handlePopoverOpen}
            count={0}
          />
        </CustomTreeItem>
        <CustomTreeItem
          nodeId="12"
          label="Location2"
          onAction={handlePopoverOpen}
          count={2}
        >
          <CustomTreeItem
            nodeId="13"
            label="Location2-Child1"
            onAction={handlePopoverOpen}
            count={0}
          />
          <CustomTreeItem
            nodeId="14"
            label="Location2-Child2"
            onAction={handlePopoverOpen}
            count={0}
          />
        </CustomTreeItem>
        <CustomTreeItem
          nodeId="15"
          label="Location3"
          onAction={handlePopoverOpen}
          count={0}
        />
        <CustomTreeItem
          nodeId="16"
          label="Location4"
          onAction={handlePopoverOpen}
          count={0}
        />
        <CustomTreeItem
          nodeId="17"
          label="Location5"
          onAction={handlePopoverOpen}
          count={0}
        />
        <CustomTreeItem
          nodeId="18"
          label="Location6"
          onAction={handlePopoverOpen}
          count={0}
        />
        <CustomTreeItem
          nodeId="19"
          label="Location7"
          onAction={handlePopoverOpen}
          count={0}
        />
        <CustomTreeItem
          nodeId="20"
          label="Location8"
          onAction={handlePopoverOpen}
          count={0}
        />
      </TreeView>
      <Popover
        PaperProps={{
          sx: {
            width: '200px',
            maxHeight: '200px',
          }
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <MenuItem
          key="Add"
          value="Add"
          onClick={onAddLocation}
          sx={{
            display: 'flex',
            alignContent: 'center',
            '& .MuiInput-underline:after': {
              transition: 'none',
            },
          }}
          disableRipple
        >
          <AddIcon fontSize="medium" />
          <Typography>Add</Typography>
        </MenuItem>
        <MenuItem
          key="edit"
          value="edit"
          onClick={onEditLocation}
          sx={{
            display: 'flex',
            alignContent: 'center',
            '& .MuiInput-underline:after': {
              transition: 'none',
            },
          }}
          disableRipple
        >
          <EditIcon fontSize="medium" />
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem
          key="delete"
          value="delete"
          onClick={onDeleteLocation}
          sx={{
            display: 'flex',
            alignContent: 'center',
            '& .MuiInput-underline:after': {
              transition: 'none',
            },
          }}
          disableRipple
        >
          <DeleteIcon fontSize="medium" />
          <Typography>Delete</Typography>
        </MenuItem>
      </Popover>
    </>
  );
};
