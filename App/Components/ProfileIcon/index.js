import React from 'react';
import { Avatar } from 'react-native-paper';
import { connect } from 'react-redux';

const ProfileIcon = ({user}) => {
  return (
    <Avatar.Image source={user && user.profile_picture ? {uri: user.profile_picture} : undefined} size={21} />
  );
};

const mapStateToProps = ({ users: { user } }) => ({
  user,
});

const mapDispatchToProps = {
  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileIcon);
