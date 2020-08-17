import {connect} from 'react-redux';
import AuthenticationCreators from '../../Redux/AuthenticationRedux';
import UsersCreators from '../../Redux/UsersRedux';
import EditProfile from './EditProfile';

const mapStateToProps = ({
  authentication: {updateUserInformationLoading, updateUserInformationError}, users: { user, updateUserLoading }
}) => ({
  user,
  updateUserLoading,
  updateUserInformationError,
  updateUserInformationLoading,
});

const mapDispatchToProps = {
  setUser: AuthenticationCreators.setUser,
  updateUserInformation: AuthenticationCreators.updateUserInformation,
  updateProfilePicture: UsersCreators.updateProfilePicture,
  updateUser: UsersCreators.updateUser,
  deleteProfilePicture: UsersCreators.deleteProfilePicture,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
