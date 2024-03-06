import SimpleBar from 'simplebar-react';

import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

export const StyledRootScrollbar = styled(Box)(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
}));

export const StyledScrollbar = styled(Box)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
}));
