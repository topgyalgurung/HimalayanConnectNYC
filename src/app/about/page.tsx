import React from 'react'
import { Box, Container, Typography, Paper, Button } from '@mui/material'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const AboutPage = () => {
  return (
    <Box sx={{ 
      height: '100vh',
      overflowY: 'auto',
      position: 'relative',
      bgcolor: 'background.default'
    }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 4 }}>
          <Link href="/" passHref>
            <Button 
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              sx={{ color: '#1a237e', borderColor: '#1a237e' }}
            >
              Go Back
            </Button>
          </Link>
        </Box>

        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
            About Himalayan Connect NYC
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Empowering the Himalayan community in New York with essential resources and support
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ flex: '1 1 300px' }}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#1a237e' }}>
                Our Mission
              </Typography>
              <Typography sx={{ mb: 2 }}>
                We are dedicated to connecting the  Himalayan community in New York with vital resources including nonprofit services, legal assistance, immigration support, housing, and job opportunities.
              </Typography>
              <Typography>
                Our platform serves as a centralized hub, making it easier for community members to access the support they need to thrive in New York City.
              </Typography>
            </Paper>
          </Box>

          <Box sx={{ flex: '1 1 300px' }}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#1a237e' }}>
                Our Vision
              </Typography>
              <Typography sx={{ mb: 2 }}>
                To create a strong, well-connected Himalayan community in New York where every member has easy access to essential resources and support services.
              </Typography>
              <Typography>
                We envision a future where our community members can navigate life in New York with confidence, supported by a network of trusted resources and services.
              </Typography>
            </Paper>
          </Box>

          <Box sx={{ width: '100%', mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#1a237e', textAlign: 'center' }}>
                Join Our Community
              </Typography>
              <Typography sx={{ textAlign: 'center', mb: 2 }}>
                Whether you&apos;re seeking resources, looking to contribute, or want to stay connected with the  Himalayan community in New York, Himalayan Connect NYC is here for you.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Link href="/" passHref>
                  <Button variant="contained" color="primary" size="large" sx={{ minWidth: '200px' }}>
                    Enter Website
                  </Button>
                </Link>
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                  Discover our features:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Add and share valuable resources
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Save your favorite resources
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Suggest new resources
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Leave reviews and feedback
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
        {/* Built with love by my LinkedIn */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Built with <span role="img" aria-label="love">❤️</span> by{' '}
            <Link href="https://www.linkedin.com/in/topgyalgurung" target="_blank" rel="noopener noreferrer" style={{ color: '#1a237e', textDecoration: 'underline' }}>
              my LinkedIn
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default AboutPage