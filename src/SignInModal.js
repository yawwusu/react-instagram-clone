import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input, Modal } from '@material-ui/core';
import './SignInModal.css';
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

export default function SignInModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changePassword = (e) => {
    setPassword(e.target.value)
  } 

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleSignIn = (e) => {
    e.preventDefault()

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    handleClose()
  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Sign In
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
            <form className="signin">         
                <Input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={changeEmail}
                />
                                   
                <Input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={changePassword}
                />

              <Button onClick={handleSignIn} type="submit">Sign In</Button>
            </form>
          </center>
        </div>
      </Modal>
    </div>
  );
}
