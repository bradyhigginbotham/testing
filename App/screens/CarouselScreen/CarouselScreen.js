import React, { useState, useRef } from 'react';
import { View, StatusBar, Image } from 'react-native';
import SnapCarousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import styles from './styles';
import Text from '../../Components/Text';
import Button from '../../Components/Button';
import images from '../../Themes/Images';

const Item = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Image style={styles.Image} source={item.img} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
};

const Carousel = ({ navigation, setFirstTime }) => {
  const carousel = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [buttonText, setButtonText] = useState('Next');
  const entries = [
    {
      title: 'Work when you want',
      img: images.hampr,
      text: 'Become your own boss; hampr allows\nyou the flexibility you’ve always wanted.',
    },
    {
      title: 'Plan your routes ahead\nof time',
      img: images.washr,
      text:
        'Pick up hampr orders in one swoop.\nScan hamprs to see special instructions,\nthen turn on your favorite podcast!',
    },
    {
      title: 'Wash, dry, fold, then\ndeliver',
      img: images.folded,
      text:
        'Deliver freshly folded hamprs within\n24 hours of their pickup time. It’s\n that simple!',
    },
  ];

  const currentDot = index => {
    setActiveSlide(index);
    if (index === 2) {
      setButtonText('Get Started Today');
    } else {
      setButtonText('Next');
    }
  };

  const nextScreen = () => {
    if (activeSlide === 2) {
      setFirstTime(false);
      navigation.navigate('Auth');
    } else {
      currentDot(activeSlide + 1);
      carousel.current.snapToNext();
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SnapCarousel
        ref={carousel}
        data={entries}
        renderItem={Item}
        sliderWidth={wp('100%')}
        itemWidth={wp('100%')}
        onSnapToItem={index => currentDot(index)}
      />
      <Pagination
        dotsLength={entries.length}
        dotContainerStyle={styles.dotContainerStyle}
        containerStyle={styles.dotContainer}
        activeDotIndex={activeSlide}
        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.2}
        inactiveDotScale={1}
        inactiveDotStyle={styles.inactiveDotStyle}
      />
      <Button title={buttonText} containerStyle={styles.button} onPress={nextScreen} />
    </View>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

Carousel.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  setFirstTime: PropTypes.func.isRequired,
};

export default Carousel;
