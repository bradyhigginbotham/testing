import React, { PureComponent } from "react";
import {
  Text,
  View,
  FlatList,
  Dimensions,
  Platform,
  ViewPropTypes,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { Colors } from "../../Themes";
import styles from "./styles";
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const deviceWidth = Dimensions.get(`window`).width;

export default class ScrollPicker extends PureComponent {
  static propTypes = {
    style: ViewPropTypes.style,
    dataSource: PropTypes.instanceOf(Array).isRequired,
    selectedIndex: PropTypes.number,
    itemHeight: PropTypes.number,
    wrapperHeight: PropTypes.number,
    curve: PropTypes.string,
    onValueChange: PropTypes.func
  };

  static defaultProps = {
    style: {},
    selectedIndex: 0,
    itemHeight: 47,
    wrapperHeight: 150,
    curve: null,
    onValueChange: () => {}
  };

  constructor(props) {
    super(props);

    this.sview = React.createRef();
    let selectedIndex =
      this.props.selectedIndex && this.props.selectedIndex === -1
        ? 0
        : this.props.selectedIndex;

    if (selectedIndex !== 0) {
      setTimeout(() => {
        this.scrollToIndex(selectedIndex);
      }, 300);
    }

    this.state = {
      selectedIndex,
      currentPosition: selectedIndex
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.selectedIndex !== this.props.selectedIndex &&
      this.props.selectedIndex !== prevProps.selectedIndex &&
      this.props.selectedIndex !== -1
    ) {
      let selectedIndex = this.props.selectedIndex;

      this.setState({
        selectedIndex,
        currentPosition: selectedIndex
      });

      setTimeout(() => {
        this.scrollToIndex(selectedIndex);
      }, 300);

      let selectedValue = this.props.dataSource[selectedIndex];
      if (selectedValue) {
        if (selectedValue.value) {
          this.props.onValueChange(selectedValue.value, selectedIndex);
        } else {
          this.props.onValueChange(selectedValue, selectedIndex);
        }
      }
    } else if (
      this.props.selectedIndex === -1 &&
      this.props.selectedIndex !== prevProps.selectedIndex
    ) {
      let selectedIndex = 0;

      this.setState({
        selectedIndex,
        currentPosition: selectedIndex
      });

      setTimeout(() => {
        this.scrollToIndex(selectedIndex);
      }, 300);

      let selectedValue = this.props.dataSource[selectedIndex];
      if (selectedValue) {
        if (selectedValue.value) {
          this.props.onValueChange(selectedValue.value, selectedIndex);
        } else {
          this.props.onValueChange(selectedValue, selectedIndex);
        }
      }
    }
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  getSelected() {
    let selectedIndex = this.state.selectedIndex;
    let selectedValue = this.props.dataSource[selectedIndex];
    return selectedValue;
  }

  _renderPlaceHolder(itemHeight, wrapperHeight) {
    let h = (wrapperHeight - itemHeight) / 2;
    let header = <View style={[styles.placeHolder, { height: h }]} />;
    let footer = <View style={[styles.placeHolder, { height: h }]} />;
    return { header, footer };
  }

  _renderTitle = (data, style) => {
    if (data.title) {
      return <Text style={style}>{data.title}</Text>;
    }
  };

  _renderText = (data, style) => {
    if (data) {
      if (data.label) {
        return <Text style={style}>{data.label}</Text>;
      } else {
        return <Text style={style}>{data}</Text>;
      }
    } else {
      return null;
    }
  };

  _renderItem = ({ item, index }) => {
    const { itemHeight, curve } = this.props;
    const { currentPosition } = this.state;

    let offset = Math.abs(-currentPosition + index);
    // let fontSize = scale(16 - offset);
    let color = Colors.text;
    let labelOpacity = offset > 3 ? 0.9 : Math.abs(1 - offset / 2);
    let titleOpacity =
      offset > 3 ? 0 : offset === 0 ? 0.6 : 0.6 - Math.abs(offset * 0.1);

    let marginLeft = 0;
    let marginRight = 0;
    let itemWrapper = styles.itemWrapper;

    if (curve) {
      if (curve === `right`) {
        // marginRight = offset === 0 ? 0 : scale((offset / 3) * curvedMargin);
        itemWrapper = styles.itemWrapperRight;
      } else if (curve === `left`) {
        // marginLeft = offset === 0 ? 0 : scale((offset / 3) * curvedMargin);
        itemWrapper = styles.itemWrapperLeft;
      }
    }

    let style = {
      marginLeft,
      marginRight
    };

    let textStyle = {
      fontFamily: 'AvenirNext-Medium',
      fontSize: hp('2.3%'),
      color: Colors.navi,
      opacity: labelOpacity,
    };

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.scrollToIndex(index);
        }}
        style={[itemWrapper, { height: itemHeight }]}
        key={index}>
        <View style={style}>
          {this._renderTitle(item, [
            textStyle,
            { opacity: titleOpacity, fontSize: 10 }
          ])}
          {this._renderText(item, textStyle)}
        </View>
      </TouchableOpacity>
    );
  };
  _scrollFix(e) {
    const { itemHeight } = this.props;
    let y = 0;
    let h = itemHeight;
    if (e.nativeEvent.contentOffset) {
      y = e.nativeEvent.contentOffset.y;
    }
    let selectedIndex = Math.round(y / h);
    let _y = selectedIndex * h;
    if (_y !== y) {
      if (Platform.OS === `ios`) {
        this.isScrollTo = true;
      }
      this.scrollToIndex(selectedIndex);
    }

    // onValueChange
    if (this.props.onValueChange) {
      let selectedValue = this.props.dataSource[selectedIndex];
      this.setState({
        selectedIndex: selectedIndex
      });

      if (selectedValue) {
        if (selectedValue.value) {
          this.props.onValueChange(selectedValue.value, selectedIndex);
        } else {
          this.props.onValueChange(selectedValue, selectedIndex);
        }
      }
    }
  }

  _onScrollBeginDrag = () => {
    this.dragStarted = true;
    if (Platform.OS === `ios`) {
      this.isScrollTo = false;
    }
    this.timer && clearTimeout(this.timer);
  };

  _onScrollEndDrag = e => {
    this.dragStarted = false;
    // if not used, event will be garbaged
    let _e = {
      nativeEvent: {
        contentOffset: {
          y: e.nativeEvent.contentOffset.y
        }
      }
    };
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.momentumStarted && !this.dragStarted) {
        this._scrollFix(_e, `timeout`);
      }
    }, 10);
  };

  _onMomentumScrollBegin = () => {
    this.momentumStarted = true;
    this.timer && clearTimeout(this.timer);
  };

  _onMomentumScrollEnd = e => {
    this.momentumStarted = false;
    if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
      this._scrollFix(e);
    }
  };

  scrollToIndex = ind => {
    const { dataSource, onValueChange, itemHeight } = this.props;
    this.setState({ selectedIndex: ind });
    onValueChange(dataSource[ind], ind);

    if (ind >= 0 && ind < dataSource.length) {
      let y = itemHeight * ind;

      if (this.sview && this.sview.current) {
        this.sview.current.scrollToOffset({ offset: y });
      }
    }
  };

  render() {
    const { itemHeight, wrapperHeight } = this.props;
    let { header, footer } = this._renderPlaceHolder(itemHeight, wrapperHeight);
    let highlightWidth = deviceWidth;
    let highlightColor = `#eff3f3`;
    let wrapperStyle = {
      height: wrapperHeight,
      flex: 1,
      backgroundColor: `white`,
      overflow: `hidden`
    };

    let highlightStyle = {
      position: `absolute`,
      top: (wrapperHeight - itemHeight) / 2,
      height: itemHeight,
      width: highlightWidth,
      borderTopColor: highlightColor,
      borderBottomColor: highlightColor,
      borderTopWidth: 1,
      borderBottomWidth: 1
    };

    return (
      <View style={[wrapperStyle, this.props.style]}>
        <View style={highlightStyle} />
        <FlatList
          ref={this.sview}
          data={this.props.dataSource}
          showsVerticalScrollIndicator={false}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollBeginDrag={this._onScrollBeginDrag}
          onScrollEndDrag={this._onScrollEndDrag}
          onScrollToIndexFailed={() => {}}
          scrollEventThrottle={2}
          keyExtractor={(item, index) => index.toString()}
          onScroll={e => {
            let y = 0;
            let h = itemHeight;
            if (e.nativeEvent.contentOffset) {
              y = e.nativeEvent.contentOffset.y;
              let selectedIndex = Math.round(y / h);
              if (selectedIndex !== this.state.selectedIndex) {
                this.setState({
                  selectedIndex: selectedIndex,
                  currentPosition: y / h
                });
              } else {
                this.setState({
                  currentPosition: y / h
                });
              }
            }
          }}
          renderItem={this._renderItem}
          ListHeaderComponent={() => header}
          ListFooterComponent={() => footer}
          removeClippedSubviews
          windowSize={21}
          maxToRenderPerBatch={7}
        />
      </View>
    );
  }
}
