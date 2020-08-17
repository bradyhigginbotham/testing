import React from 'react';
import { Image, Linking } from 'react-native';
import { Avatar } from 'react-native-paper';
import 'react-native-gesture-handler';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Theme
import colors from '../Themes/Colors';
import images from '../Themes/Images';

// Components
import HeaderButton from '../Components/HeaderButton';
import SkipOnboardingButton from '../Components/SkipOnboardingButton';
import IconBadge from '../Components/IconBadge';
import ProfileIcon from '../Components/ProfileIcon';

// Modals
import FirstOrderModal from '../screens/FirstOrderModal';
import OrderDetailsModal from '../screens/OrderDetailsModal';
import ScanModal from '../screens/ScanModal';
import PlanRouteScreen from '../screens/PlanRouteScreen';
import RouteScreen from '../screens/RouteScreen';

// Screen
import FAQScreen from '../screens/FAQScreen';
import ApplyNowScreen from '../screens/ApplyNowScreen';
import EditProfile from '../screens/EditProfile';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CarouselScreen from '../screens/CarouselScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import ChagePassScreen from '../screens/ChagePassScreen';
import CreatePassScreen from '../screens/CreatePassScreen';
import InProgressScreen from '../screens/InProgressScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import PhoneNumberScreen from '../screens/PhoneNumberScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import BankAccountsScreen from '../screens/BankAccountsScreen';
import BankAccountScreen from '../screens/BankAccountScreen';
import BankAccountCreateScreen from '../screens/BankAccountCreateScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import VerifyNumberScreen from '../screens/VerifyNumberScreen';
import ShareLocationScreen from '../screens/ShareLocationScreen';
import EarningsOverviewScreen from '../screens/EarningsOverviewScreen';
import EarningsBreakdownScreen from '../screens/EarningsBreakdownScreen';
import PickedUpClothes from '../screens/PickedUpClothes';
import SetDebugLocationScreen from '../screens/SetDebugLocationScreen';

import VerificationBlockerScreen from '../screens/VerificationBlockerScreen';
import VerificationBlockerFieldsScreen from '../screens/VerificationBlockerFieldsScreen';
import VerificationBlockerPendingScreen from '../screens/VerificationBlockerPendingScreen';
import BankAccountBlockerScreen from '../screens/BankAccountBlockerScreen';

import ShiningStarScreen from '../screens/ShiningStarScreen';
import CreateBioScreen from '../screens/ShiningStarScreen/CreateBioScreen';
import ChoosePopColorScreen from '../screens/ShiningStarScreen/ChoosePopColorScreen';

// Styles
import styles from './Styles/NavigationStyles';

// Orders tab
const OrdersStack = createStackNavigator({
  OrdersHome: {
    screen: OrdersScreen,
    navigationOptions: {
      title: 'Available Orders',
      headerTitleAlign: 'center',
      headerTitleStyle: styles.headerTitle,
    },
  },
});

// MyOrders Tab
const MyOrdersTabs = createMaterialTopTabNavigator(
  {
    deliveries: {
      screen: MyOrdersScreen,
      navigationOptions: {
        tabBarLabel: 'PICK UP & DROP OFF',
      },
    },
    inProgress: {
      screen: InProgressScreen,
      navigationOptions: {
        tabBarLabel: 'IN PROGRESS',
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: colors.navi,
      inactiveTintColor: colors.blue_grey,
      style: {
        backgroundColor: colors.snow,
      },
      tabStyle: {
        justifyContent: 'flex-end',
        paddingBottom: 0,
        paddingTop: 22,
      },
      labelStyle: {
        fontSize: hp('1.7%'),
        fontWeight: 'bold',
        letterSpacing: wp('0.2%'),
      },
      indicatorStyle: {
        backgroundColor: colors.navi,
      },
    },
  }
);

const MyOrdersStack = createStackNavigator(
  {
    MyOrdersHome: {
      screen: MyOrdersTabs,
      navigationOptions: {
        title: 'My Orders',
        headerTitleStyle: styles.headerTitle,
      },
    },
    MyOrdersDetail: {
      screen: PickedUpClothes,
      navigationOptions: {
        title: 'Order Details',
        headerTitleStyle: styles.headerTitle,
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
    },
  }
);

const EarningsTabs = createMaterialTopTabNavigator(
  {
    Overview: {
      screen: EarningsOverviewScreen,
      navigationOptions: {
        tabBarLabel: 'OVERVIEW',
      },
    },
    Breakdown: {
      screen: EarningsBreakdownScreen,
      navigationOptions: {
        tabBarLabel: 'BREAKDOWN',
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: colors.navi,
      inactiveTintColor: colors.blue_grey,
      style: {
        backgroundColor: colors.snow,
        elevation: 0,
      },
      labelStyle: {
        fontSize: hp('1.7%'),
        fontWeight: 'bold',
        letterSpacing: wp('0.2%'),
      },
      indicatorStyle: {
        backgroundColor: colors.navi,
      },
    },
  }
);

const EarningsStack = createStackNavigator({
  EarningsHome: {
    screen: EarningsTabs,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const ProfileStack = createStackNavigator(
  {
    ProfileHome: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'My Profile',
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitle,
      },
    },
    SetDebugLocation: {
      screen: SetDebugLocationScreen,
    },
    BankAccount: {
      screen: BankAccountScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Account Details',
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitle,
        headerLeft: () => (
          <HeaderButton
            source={images.backArrow}
            onPress={() => navigation.goBack()}
            containerStyle={styles.closeButtonContainer}
          />
        ),
      }),
    },
    BankAccounts: {
      screen: BankAccountsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'My Accounts',
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitle,
        headerLeft: () => (
          <HeaderButton
            source={images.backArrow}
            onPress={() => navigation.goBack()}
            containerStyle={styles.closeButtonContainer}
          />
        ),
      }),
    },
    BankAccountCreate: {
      screen: BankAccountCreateScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Add Bank Account',
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitle,
        headerLeft: () => (
          <HeaderButton
            source={images.backArrow}
            onPress={() => navigation.goBack()}
            containerStyle={styles.closeButtonContainer}
          />
        ),
      }),
    },
    Preferences: {
      screen: PreferencesScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Preferences',
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitle,
        headerLeft: () => (
          <HeaderButton
            source={images.backArrow}
            onPress={() => navigation.goBack()}
            containerStyle={styles.closeButtonContainer}
          />
        ),
      }),
    },
    Earnings: {
      screen: EarningsStack,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.routeName,
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitle,
        headerLeft: () => (
          <HeaderButton
            source={images.backArrow}
            onPress={() => navigation.goBack()}
            containerStyle={styles.closeButtonContainer}
          />
        ),
      }),
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: () => ({
        tabBarVisible: false,
        headerTitleAlign: 'center',
        title: 'Edit My Profile',
        headerTitleStyle: styles.headerTitle,
      }),
    },
    ChagePass: {
      screen: ChagePassScreen,
      navigationOptions: {
        title: 'Change Password',
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitle,
      },
    },
  },
  {
    headerLayoutPreset: 'center',
    backBehavior: 'initialRoute',
    initialRouteName: 'ProfileHome',
    navigationOptions: ({ navigation }) => {
      let tabBarVisible = true;
      if (navigation.state.index > 0) {
        tabBarVisible = false;
      }
      return {
        tabBarVisible,
      };
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
    },
  }
);

const MainNavigator = createBottomTabNavigator(
  {
    Orders: {
      screen: OrdersStack,
      navigationOptions: {
        tabBarLabel: 'Orders',
        tabBarIcon: ({ focused }) => (
          <Image source={images[`orders${focused ? '' : 'Unselected'}`]} />
        ),
      },
    },
    MyOrders: {
      screen: MyOrdersStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'My Orders',
        tabBarIcon: ({ focused }) => <IconBadge focused={focused} />,
      }),
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: () => <ProfileIcon size={21} />,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: colors.navi,
      inactiveTintColor: colors.blue_grey,
      style: {
        borderTopColor: colors.light_grey,
      },
    },
    initialRouteName: 'Orders',
  },
);

const OnboardingStack = createStackNavigator({
  Carousel: {
    screen: CarouselScreen,
    navigationOptions: ({ navigation }) => ({
      title: null,
      headerStyle: styles.headerFlat,
      headerRight: () => <SkipOnboardingButton navigation={navigation} />,
    }),
  },
});

const AuthStack = createStackNavigator(
  {
    OnBoardingScreen: {
      screen: OnBoardingScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ApplyNowScreen: {
      screen: ApplyNowScreen,
      navigationOptions: {
        title: 'Apply Now',
        headerTitleStyle: styles.headerTitle,
      },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: () => ({
        title: null,
        headerStyle: {
          ...styles.header,
          backgroundColor: colors.navi,
        },
        headerLeft: null,
      }),
    },
    CreatePassScreen: {
      screen: CreatePassScreen,
      navigationOptions: {
        title: null,
      },
    },
    ForgotPasswordScreen: {
      screen: ForgotPasswordScreen,
      navigationOptions: {
        title: null,
        headerStyle: {
          ...styles.header,
          backgroundColor: colors.light_green,
        },
      },
    },
    PasswordResetScreen: {
      screen: PasswordResetScreen,
      navigationOptions: {
        title: null,
        headerStyle: {
          ...styles.header,
          backgroundColor: colors.light_green,
        },
      },
    },
    ShareLocationScreen: {
      screen: ShareLocationScreen,
      navigationOptions: {
        title: null,
        headerLeft: null,
        headerStyle: {
          ...styles.header,
          backgroundColor: colors.light_green,
        },
      },
    },
    PhoneNumberScreen: {
      screen: PhoneNumberScreen,
      navigationOptions: {
        title: null,
      },
    },
    VerifyNumberScreen: {
      screen: VerifyNumberScreen,
      navigationOptions: {
        title: null,
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: styles.header,
      headerTintColor: colors.navi,
    },
  },
);

const VerificationBlockerModal = createStackNavigator(
  {
    VerificationBlockerScreen: {
      screen: VerificationBlockerScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: null,
      }),
    },
    VerificationBlockerFieldsScreen: {
      screen: VerificationBlockerFieldsScreen,
    },
    VerificationBlockerPendingScreen: {
      screen: VerificationBlockerPendingScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: null,
      }),
    },
  },
  {
    navigationOptions: {
      headerShown: false,
    },
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: styles.headerTitle,
      title: ``,
      headerTintColor: colors.navi,
    }),
  },
);

const ShiningStarModal = createStackNavigator(
  {
    ShiningStarScreen: {
      screen: ShiningStarScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitleStyle: styles.headerTitleWhite,
        headerStyle: styles.statusBarMargin,
        headerTransparent: true,
        headerRight: null,
        title: ' ',
        headerLeft: (
          <HeaderButton
            source={images.closeWhite}
            style={styles.closeButton}
            onPress={() => navigation.popToTop()}
            containerStyle={styles.closeButtonContainer}
          />
        ),
      }),
    },
    CreateBioScreen: {
      screen: CreateBioScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitleStyle: styles.headerTitleWhite,
        headerStyle: styles.statusBarMargin,
        headerTransparent: true,
      }),
    },
    ChoosePopColorScreen: {
      screen: ChoosePopColorScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitleStyle: styles.headerTitleWhite,
        headerStyle: styles.statusBarMargin,
        headerTransparent: true,
      }),
    },
  },
  {
    navigationOptions: {
      headerShown: false,
    },
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: styles.headerTitle,
      title: ``,
      headerTintColor: colors.navi,
    }),
  },
);

const PlanRouteModal = createStackNavigator(
  {
    PlanRoute: {
      screen: PlanRouteScreen,
      navigationOptions: ({ navigation }) => ({
        title: `Plan Route`,
      }),
    },
    Route: {
      screen: RouteScreen,
      navigationOptions: ({ navigation }) => ({
        title: `Your Route`,
      }),
    },
  },
  {
    navigationOptions: {
      headerShown: false,
    },
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: styles.headerTitle,
      headerLeft: (
        <HeaderButton
          source={images.close}
          style={styles.closeButton}
          onPress={() => navigation.popToTop()}
          containerStyle={styles.closeButtonContainer}
        />
      ),
    }),
  },
);

const MainStack = createStackNavigator(
  {
    Main: {
      screen: MainNavigator,
      navigationOptions: { headerShown: false },
    },
    // modals
    FirstOrder: {
      screen: FirstOrderModal,
      navigationOptions: {
        title: 'My First Order',
        headerTitleStyle: styles.headerTitle,
      },
    },
    OrderDetails: {
      screen: OrderDetailsModal,
      navigationOptions: {
        headerTitleStyle: styles.headerTitle,
      },
    },
    Scan: {
      screen: ScanModal,
      navigationOptions: ({ navigation }) => ({
        headerTitleStyle: styles.headerTitleWhite,
        headerStyle: styles.statusBarMargin,
        headerTransparent: true,
        headerRight: null,
        headerLeft: (
          <HeaderButton
            source={images.closeWhite}
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
            containerStyle={styles.closeButtonContainer}
          />
        ),
      }),
    },
    PlanRouteModal: {
      screen: PlanRouteModal,
    },
    Route: {
      screen: RouteScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitleStyle: styles.headerTitle,
        title: `Your Route`,
      }),
    },
    VerificationBlockerModal: {
      screen: VerificationBlockerModal,
    },
    ShiningStarModal: {
      screen: ShiningStarModal
    },
    BankAccountBlocker: {
      screen: BankAccountBlockerScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitleStyle: styles.headerTitle,
        title: `Link Account`,
        headerLeft: null,
      }),
    },
    FAQ: {
      screen: FAQScreen,
      navigationOptions: {
        title: 'FAQ',
        headerTitleStyle: styles.headerTitle,
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitleAlign: 'center',
      headerLeft: () => (
        <HeaderButton source={images.close} style={styles.closeButton} onPress={() => navigation.goBack()} containerStyle={styles.closeButtonContainer} />
      ),
    }),
    mode: 'modal',
    headerLayoutPreset: 'center',
  },
);

const AppStack = createStackNavigator(
  {
    Main: MainStack,
    Auth: AuthStack,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const ContainerStack = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Onboarding: OnboardingStack,
  App: AppStack,
});

export default createAppContainer(ContainerStack);
