import { useEffect } from "react";

import Box from "@mui/material/Box";
import { usePathname } from "../../router/hooks";
import Scrollbar from "../../components/scrollbar";
import MenuListItem from "./MenuListItem";
import MenuListIconItem from "./MenuListIconItem";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const theme = useTheme();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderWebContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <MenuListItem />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  const renderMobileContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <MenuListIconItem />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
    
      }}
    >
      {isMobile ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
          }}
        >
          {renderMobileContent}
        </Box>
      ) : (
        <Box
          sx={{
            height: 1,
            position: "fixed",
          }}
        >
          {renderWebContent}
        </Box>
      )}
    </Box>
  );
}

