import React, {useEffect} from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';
import { Surface, TouchableRipple, ActivityIndicator } from 'react-native-paper';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import ProgressCircle from 'react-native-progress-circle';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Linking } from 'react-native';
import Intercom from 'react-native-intercom';
import { Portal } from 'react-native-paper';
import Config from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';

import eventEmitter from '../../Services/EventEmitter';
import NavigationService from '../../Services/NavigationService';
import Text from '../../Components/Text';
import images from '../../Themes/Images';
import colors from '../../Themes/Colors';
import styles from './styles';
import SeparatorLine from '../../Components/SeparatorLine';
import Button from '../../Components/Button';
import BottomSheet from '../../Components/BottomSheet';

const FirstSection = ({
  userInfo: { first_name, last_name, email, phone_number, profile_picture },
  onPressPreview,
}) => {

  const profileSource = profile_picture
    ? { uri: profile_picture }
    : require('../../Images/profile_empty.png');
    
  return (
    <View style={styles.personalData}>
      <View style={styles.imageAndContactContainer}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={profileSource} />
        </View>
        <View style={styles.contact}>
          <Text style={styles.name}>
            {first_name} {last_name}
          </Text>
          <Text style={styles.mail} numberOfLines={1}>
            {email}
          </Text>
          <Text style={styles.number}>{phone_number}</Text>
          <TouchableOpacity onPress={onPressPreview}>
            <Text style={{ color: colors.ligh_navi }}>Preview My Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.editInformationButton}>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('EditProfile')}>
            <Image
              resizeMode="contain"
              style={styles.editInformation}
              source={images.edit}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Box = ({ children }) => (
  <Surface style={styles.surface}>{children}</Surface>
);

const Rating = ({ children, number, text }) => (
  <View style={styles.ratingContainer}>
    <View style={styles.numberContainer}>
      <Text style={styles.ratingNumber}>{number}</Text>
      {children}
    </View>
    <Text style={styles.ratingText}>{text}</Text>
  </View>
);

const Earnings = () => {

}

const MyPerformance = ({data, loading, fetchData}) => {

  const Loading = () => {
    return (
      <Box>
        <ActivityIndicator
          size="large"
          style={styles.performanceLoading}
        />
      </Box>
    );  
  }

  return (
    <View style={styles.performanceContainer}>
      <View style={styles.showPerformance}>
        <Text style={styles.performanceTitle}>My Performance</Text>
        {/* <TouchableOpacity style={styles.arrowImageContainer}>
          <Text style={styles.weeklyText}>Weekly</Text>
          <Image source={images.downArrow} style={styles.arrowImage} />
        </TouchableOpacity> */}
      </View>
      <TouchableRipple rippleColor={colors.snow} onPress={() => fetchData()}>
        <View style={styles.surfaceContainer}>
          {loading && <Loading />}
          {!loading && (
            <Box>
              <Text style={styles.earnings}>Earnings</Text>
              <Text style={styles.money}>
                ${data.payout_amount != null ? data.payout_amount.toFixed(2) : `-.--`}
              </Text>
              <Text style={styles.currentWeek}>Current week</Text>
            </Box>
          )}
          {loading && <Loading />}
          {!loading && (
            <Box>
              <Text style={styles.ordersPerHour}>Pending</Text>
              <Text style={styles.orders}>
                ${data.pending_amount != null ? data.pending_amount.toFixed(2) : "-.--"}
              </Text>
              <Text style={styles.currentWeek}>Current week</Text>
            </Box>
          )}
        </View>
      </TouchableRipple>
      {/* <View style={styles.rates}>
        <Rating text="Average Rating" number="4.8">
          <Image style={styles.starImage} source={images.star} />
        </Rating>
        <Rating text="Rated Orders" number="143" />
        <Rating text="Lifetime Orders" number="123" />
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressWithText}>
          <ProgressCircle
            percent={100}
            bgColor="#fff"
            radius={hp('4%')}
            borderWidth={3.5}
            color={colors.pale_teal}
            shadowColor={colors.light_grey}
            outerCircleStyle={{ height: hp('8%'), width: hp('8%') }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>On Time</Text>
            <Text style={styles.percent}>100%</Text>
          </View>
        </View>
        <View style={styles.progressWithText}>
          <ProgressCircle
            percent={65}
            bgColor="#fff"
            radius={hp('4%')}
            borderWidth={3.5}
            color={colors.pale_teal}
            shadowColor={colors.light_grey}
            outerCircleStyle={{ height: hp('8%'), width: hp('8%') }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Completion Rate</Text>
            <Text style={styles.percent}>65%</Text>
          </View>
        </View> */}
      {/* </View> */}
    </View>
  );
}

export const RippleButton = ({ onPress, children, style }) => (
  <TouchableRipple
    style={[styles.ripple, style]}
    rippleColor="rgba(0, 0, 0, .1)"
    onPress={onPress}>
    <View>{children}</View>
  </TouchableRipple>
);

const MyAccountOption = ({
  text,
  image,
  onPress,
  imageStyle,
  containerStyle,
}) => (
  <RippleButton style={containerStyle} onPress={onPress}>
    <View style={styles.myAccountOptionContainer}>
      <View style={styles.myAccountOptionIconContainer}>
        <Image
          resizeMode="contain"
          style={[styles.accountOptionLeftIcon, imageStyle]}
          source={image}
        />
        <Text style={styles.myAccountOptionText}>{text}</Text>
      </View>
      <Image
        style={styles.accountOptionRightIcon}
        source={images.forwardArrow}
      />
    </View>
  </RippleButton>
);

const MyAccount = ({ navigation }) => (
  <View style={styles.myAccountContainer}>
    <Text style={styles.myAccountAndMoreTitle}>My Account</Text>
    {/* <MyAccountOption
      text="Earnings"
      image={images.myOrdersUnselected}
      onPress={() => navigation.navigate('Earnings')}
    /> */}
    <MyAccountOption
      text="Preferences"
      image={images.preferences}
      imageStyle={styles.preferencesImage}
      containerStyle={styles.orderPreferencesContainer}
      onPress={() => navigation.navigate('Preferences')}
    />
    <MyAccountOption
      resizeMode="contain"
      text="Manage Bank Accounts"
      image={images.dropps}
      imageStyle={styles.droppsImage}
      containerStyle={styles.orderDroppsContainer}
      onPress={() => navigation.navigate('BankAccounts')}
    />
    <MyAccountOption
      resizeMode="contain"
      text="Order Dropps"
      image={images.dropps}
      imageStyle={styles.droppsImage}
      containerStyle={styles.orderDroppsContainer}
      onPress={() =>
        Linking.openURL(
          `https://www.dropps.com/products/sensitive-skin-laundry-detergent-pods-unscented?utm_source=hampr&utm_medium=email&utm_campaign=tryhampr`,
        )
      }
    />
  </View>
);

const MoreOption = ({ text, onPress }) => (
  <RippleButton onPress={onPress}>
    <View style={styles.myAccountOptionContainer}>
      <Text style={styles.moreOptionText}>{text}</Text>
      <Image
        style={styles.accountOptionRightIcon}
        source={images.forwardArrow}
      />
    </View>
  </RippleButton>
);

const handleLogOut = () => {
  Auth.signOut()
    .then(() => {
      Intercom.logout();
      NavigationService.navigate('Auth');
    })
    .catch(err => eventEmitter.emit('showNotification', err));
};

const renderMoreSection = (
  <View style={styles.moreContainer}>
    <Text style={styles.myAccountAndMoreTitle}>MORE</Text>
    <View style={styles.options}>
      {Config.ALLOW_MANUAL_LOCATION_SELECTION === "true" && (
        <MoreOption
          text="Set Debug location"
          onPress={() => NavigationService.navigate('SetDebugLocation')}
        />
      )}
      <MoreOption
        text="Frequently Asked Questions"
        onPress={() => NavigationService.navigate('FAQ')}
      />
      <MoreOption
        text="Help and support"
        onPress={() => Intercom.displayMessageComposer()}
      />
      <RippleButton style={styles.logout} onPress={handleLogOut}>
        <Text style={styles.moreOptionText}>Log out</Text>
      </RippleButton>
    </View>
    <View style={styles.bottomRights}>
      <Text style={styles.washrByHampr}>washr by hampr</Text>
      <Text style={styles.rights}>© All rights reserved</Text>
      <Text style={styles.version}>VERSION 1.1.0</Text>
    </View>
  </View>
);

const WasherProfile = ({ user, onClosePress }) => {

  const profileSource = user.profile_picture
    ? { uri: user.profile_picture }
    : require('../../Images/profile_empty.png');
  
  const renderBio = (user) => {
    if (!user.bio || !user.bio.length) {
      return
    }

    return (
      <View style={styles.bioContainer}>
        <Text style={styles.washrProfileAboutMe}>About me</Text>
        <Text style={styles.washrProfileBio}>{user.bio}</Text>
      </View>
    );
  }


  return (
    <View style={{ alignItems: 'center' }}>
      <LinearGradient
        colors={user.pop_colors || colors.popColorGradient.default} 
        style={styles.washrProfileGradient}
      />
      <View style={styles.washrProfileHeaderContainer}>
        <View style={styles.washrProfileRatingContainer}>
          <Text style={styles.washrProfileRating}>4.3 ★</Text>
        </View>
        <View style={styles.washrProfileAvatarContainer}>
          <Image style={styles.washrProfileAvatar} source={profileSource} />
        </View>
        <View style={styles.washrProfileCertifiedContainer}>
          <Image
            style={styles.washrProfileCertified}
            source={require('../../Images/certified.png')}
          />
        </View>
      </View>
      <Text style={styles.washrProfileMeet}>Meet {user.first_name}!</Text>
      {renderBio(user)}
      <View style={styles.washrProfileSeparator} />
      <Text style={styles.washrProfileRate}>Rate My Washr</Text>
      <Image
        source={require('../../Images/ratings.png')}
        style={styles.washrProfileRatingStars}
      />
      <Text style={styles.washrProfileRate}>
        Let {user.first_name} know how he/she did.
      </Text>
      <TouchableOpacity onPress={onClosePress}>
        <Text style={styles.washrProfileClose}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const CompleteProfileSection = ({user, onPress}) => {

  let completedSections = 1;

  const hasPopColor = user.pop_colors && user.pop_colors.length > 0;
  const hasProfilePicture = user.profile_picture && user.profile_picture.length > 0;
  const hasBio = user.bio && user.bio.length > 0;

  const sections = [1, 2, 3, 4]

  if (hasPopColor) {
    completedSections += 1
  }

  if (hasProfilePicture) {
    completedSections += 1
  }

  if (hasBio) {
    completedSections += 1
  }

  if (completedSections === 4) {
    return null
  }

  const titles = [
    'Your Profile is 25% Complete',
    'Complete Your Profile',
    'Complete Your Profile',
  ];

  const texts = [
    'You have 3 steps left! Having a completed profile makes your more likely to get tipped over 20%.',
    'You’re halfway there! Having a completed profile makes your more likely to get tipped over 20%.',
    'One more step! Having a completed profile makes your more likely to get tipped over 20%.',
  ];

  const steps = ['3 More Steps!', '2 More Steps!', '1 More Step!'];

  return (
    <TouchableOpacity style={styles.profileCompleteContainer} onPress={onPress}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.profileCompleteTitle}>
          {titles[completedSections - 1]}
        </Text>
        <View style={styles.profileCompleteMoreStepsContainer}>
          <Text style={styles.profileCompleteMoreSteps}>
            {steps[completedSections - 1]}
          </Text>
        </View>
      </View>
      <Text style={styles.profileCompleteText}>
        {texts[completedSections - 1]}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        {sections.map(s => {
          if (s <= completedSections) {
            return <View style={styles.profileCompleteSectionFilled} />;
          } else {
            return <View style={styles.profileCompleteSectionEmpty} />;
          }
        })}
      </View>
    </TouchableOpacity>
  );
}

const ProfileScreen = ({ navigation, user, getPerformance, performance, performanceLoading }) => {
  
  let previewProfileBottomSheet = React.createRef();

  useEffect(() => {
    getPerformance();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <FirstSection
        userInfo={user}
        onPressPreview={() => {
          previewProfileBottomSheet.current.launch();
        }}
      />

      {/* <TouchableOpacity
        style={styles.stripeButton}
        onPress={() => {
          Linking.openURL(`https://dashboard.stripe.com/login`);
        }}>
        <Text style={styles.stripeTitle}>Stripe Account</Text>
      </TouchableOpacity> */}

      <SeparatorLine style={styles.separator} />

      <CompleteProfileSection
        user={user}
        onPress={() => navigation.navigate("EditProfile")}/>

      <MyPerformance
        data={performance}
        loading={performanceLoading}
        fetchData={getPerformance}
      />
      <SeparatorLine style={styles.separator} />
      <MyAccount navigation={navigation} />
      <SeparatorLine style={styles.separator} />
      {renderMoreSection}

      <Portal>
        <BottomSheet ref={previewProfileBottomSheet}>
          <WasherProfile user={user} onClosePress={() => previewProfileBottomSheet.current.close()}/>
        </BottomSheet>
      </Portal>
    </ScrollView>
  );
};

RippleButton.defaultProps = {
  onPress: () => {},
  children: undefined,
  style: {},
};

RippleButton.propTypes = {
  style: PropTypes.oneOfType([
    ViewPropTypes.style,
    PropTypes.arrayOf([ViewPropTypes.style]),
  ]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  onPress: PropTypes.func,
};

Box.defaultProps = {
  children: undefined,
};

Box.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

Rating.defaultProps = {
  text: '',
  number: '',
  children: undefined,
};

Rating.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  text: PropTypes.string,
  number: PropTypes.string,
};

MyAccountOption.defaultProps = {
  text: '',
  image: '',
  onPress: () => {},
};

MyAccountOption.propTypes = {
  text: PropTypes.string,
  image: PropTypes.string,
  onPress: PropTypes.func,
};

MyAccount.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

MoreOption.defaultProps = {
  text: '',
};

MoreOption.propTypes = {
  text: PropTypes.string,
};

FirstSection.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
  }).isRequired,
};

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileScreen;
