import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';

const LoginPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome! Please Log In or Sign Up</h2>
      <p style={styles.description}>
        Use your Google account to get started. No need to create a separate account!
      </p>
      <GoogleLoginButton />
      <div style={styles.separator}>OR</div>
      <button style={styles.signupButton}>Sign Up with Email</button>
      <p style={styles.footerText}>
        By signing up, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  description: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  separator: {
    margin: '20px 0',
    fontWeight: 'bold',
  },
  signupButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  footerText: {
    marginTop: '20px',
    fontSize: '12px',
    color: '#555',
    textAlign: 'center',
  },
};

export default LoginPage;