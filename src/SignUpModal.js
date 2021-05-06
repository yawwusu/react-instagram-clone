import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input, Modal } from '@material-ui/core';
import './SignUpModal.css';
import { auth } from './firebase';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '35%',
    left: '32%',
  },
}));

export default function SignUpModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeUsername = (e) => {
    setUsername(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value)
  } 

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleSignUp = (e) => {
    e.preventDefault()

    auth.createUserWithEmailAndPassword(email, password)
    .then((result) => result.user.updateProfile({
      displayName: username,
    }))
    .catch((error) => alert(error.message))

    handleClose()
  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Sign Up
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <center>
              <img
                className="app__headerImage" 
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram text-logo"
              />
            <form className="signup">                
                <Input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={changeUsername}
                />

                <Input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={changePassword}
                />

                <Input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={changeEmail}
                />

              <Button onClick={handleSignUp} type="submit">Sign Up</Button>
            </form>
          </center>
        </div>
      </Modal>
    </div>
  );
}
