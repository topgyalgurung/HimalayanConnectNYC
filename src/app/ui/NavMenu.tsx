

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/context/UserProvider";
import { usePopup } from "@/app/hooks/usePopup";

import AddResourcePopup from "@/app/components/dashboard/ResourcePopup/AddResourcePopup";


import UserProfileMenu from "./UserProfileMenu";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";


const pages = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" }
];



export default function NavMenu() {
  const pathname = usePathname();
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { isOpen, openPopup, closePopup } = usePopup();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const router = useRouter();


  // Handle hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleAddClick = (event: React.MouseEvent<HTMLElement>) => {
    // check if user is logged in
    if (!user) {
      toast.error("Please login to add a resource");
      router.push("/login");
      return;
    }
    setAnchorEl(event.currentTarget);
    openPopup({});
  };


  // Don't render anything until after hydration
  if (!mounted) {
    return null;
  }

  return (
    <AppBar position="static" sx={{ bgcolor: "background.paper", color: "text.primary", height: "100px" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '4px' // Added padding to the top
          }}
        >
          {/* Left side - Navigation Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {pages.map((page) => (
              <Link
                key={page.name}
                href={page.path}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  transition: 'all 0.2s',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  backgroundColor: pathname === page.path ? '#f87171' : 'rgba(0, 0, 0, 0.04)',
                  color: pathname === page.path ? 'white' : 'inherit',
                }}
              >
                {page.name}
              </Link>
            ))}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "text.primary" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href={page.path} style={{ width: '100%', textAlign: 'center' }}>
                    <Typography sx={{ textAlign: "center" }}>{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Center - Logo */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
            <Link href="/" style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/logo.png"
                alt="Himalayan Connect Logo"
                width={200}
                height={200}
                style={{ width: '100px', height: 'auto', objectFit: 'contain' }}
              />
            </Link>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginRight: 4 }}>
        

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddClick} 
              sx={{
                padding: '0.5rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '0.375rem',
                transition: 'all 0.2s',
                fontSize: '0.875rem',
                fontWeight: 500,
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  backgroundColor: '#2563eb',
                },
              }}
            >
              <Image src="https://cdn-icons-png.flaticon.com/512/7887/7887095.png" alt="add" width={20} height={20} style={{ marginRight: 8 }} />
              Add Resource
            </Button>

            <AddResourcePopup
              anchor={anchorEl}
              open={isOpen}
              onClose={() => {
                setAnchorEl(null);
                closePopup();
              }}
            />


          </Box>

          {/* Right side - User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user ? (
              <UserProfileMenu />
            ) : (
              <>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                href="/login"
                sx={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  transition: 'all 0.2s',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  backgroundColor: pathname === "/login" ? '#f87171' : 'rgba(0, 0, 0, 0.04)',
                  color: pathname === "/login" ? 'white' : 'inherit',
                }}

              >
                Login
              </Button>

               <Button
                variant="contained"
                color="primary"
                component={Link}
                href="/signup"
                 sx={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  transition: 'all 0.2s',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  backgroundColor: pathname === "/signup" ? '#f87171' : 'rgba(0, 0, 0, 0.04)',
                  color: pathname === "/signup" ? 'white' : 'inherit',
                }}
              >
                Sign up
              </Button>
              </>

            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
