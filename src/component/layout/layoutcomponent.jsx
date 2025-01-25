import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  ListItemIcon,
  Popover,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  School,
  AttachMoney,
  Report,
  PostAdd,
  Flag,
  Message,
  Feedback as FeedbackIcon,
  Web,
  Settings,
  Person,
  ExitToApp,
  Notifications,
  AccountCircle,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

// Drawer width constant
const drawerWidth = 240;

// Layout component
const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0); // Track the selected item index
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, logout } = useAuth();

  // Handle mobile drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // List items with icons
  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, url: "/dashboard" },
    { text: "Schools", icon: <School />, url: "/schools" },
    { text: "Profit", icon: <AttachMoney />, url: "/profit" },
    { text: "Report", icon: <Report />, url: "/report" },
    { text: "Posts", icon: <PostAdd />, url: "/posts" },
    { text: "Reported Posts", icon: <Flag />, url: "/reported-posts" },
    { text: "Messages", icon: <Message />, url: "/messages" },
    { text: "Feedback", icon: <FeedbackIcon />, url: "/feedback" },
    { text: "Webbuilder", icon: <Web />, url: "/webbuilder" },
  ];
  const router = useRouter();

  useEffect(() => {
    const currentIndex = menuItems.findIndex(
      (item) => item.url === router.asPath
    );
    if (currentIndex !== -1) {
      setSelectedIndex(currentIndex); // Set the selected index when the URL changes
    }
  }, [router.asPath]);

  // Handle item click
  const handleItemClick = (index) => {
    try {
      setSelectedIndex(index); // Set the selected item index
      if (router.asPath != menuItems[index].url) {
        router.push(`/${menuItems[index].url}`);
      }
    } catch (error) {}
  };

  // Notification Menu handling
  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  // Profile Menu handling
  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget); // Set anchor element for profile menu
  };
  const handleProfileClose = () => {
    setProfileAnchorEl(null); // Close profile menu
  };

  // Drawer content
  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        bgcolor: theme.palette.background.paper,
        color: "#fff",
      }}
    >
      <List sx={{ bgcolor: theme.palette.primary.main }}>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleItemClick(index)} // Set the selected item
            sx={{
              "&:hover": {
                bgcolor: theme.palette.primary.light,
                color: "#fff",
                cursor: "pointer",
              },
              bgcolor:
                selectedIndex === index
                  ? theme.palette.primary.dark
                  : "inherit", // Highlight selected item
              color: selectedIndex === index ? "#fff" : "inherit", // White text for selected item
            }}
          >
            <ListItemIcon
              sx={{ color: selectedIndex === index ? "#fff" : "#fff" }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
            My School (Admin)
          </Typography>

          {/* Box to align the icons to the right */}
          {user && (
            <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
              {/* Notification Icon */}
              <IconButton color="inherit" onClick={handleNotificationClick}>
                <Notifications />
              </IconButton>

              {/* Profile Icon */}
              <IconButton color="inherit" onClick={handleProfileClick}>
                <AccountCircle />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            bgcolor: theme.palette.primary.main, // Same color as AppBar
            borderRight: "1px solid #ddd",
          },
        }}
      >
        {/* Drawer header */}
        <Box
          sx={{
            height: 70,
            bgcolor: theme.palette.primary.main, // Ensure header matches AppBar and Drawer
          }}
        >
          App Menu
        </Box>

        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: theme.palette.background.default,
          paddingTop: theme.spacing(8), // To account for AppBar
          padding: theme.spacing(3),
        }}
      >
        {children}
      </Box>

      {/* Notification Popover */}
      <Popover
        open={Boolean(notificationAnchorEl)}
        anchorEl={notificationAnchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6">Notifications</Typography>
          <Divider sx={{ margin: "10px 0" }} />
          <Typography>New message from John</Typography>
          <Typography>New comment on your post</Typography>
          <Typography>System update available</Typography>
        </Box>
      </Popover>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right", // Align to the right of the profile icon
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right", // Align the menu's top to the bottom of the icon
        }}
      >
        <MenuItem onClick={handleProfileClose}>View Profile</MenuItem>
        <MenuItem onClick={handleProfileClose}>Settings</MenuItem>
        <MenuItem onClick={()=>logout()}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default Layout;
