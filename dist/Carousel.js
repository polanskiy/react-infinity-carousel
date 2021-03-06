function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: props.initialSlide,
      dragging: null,
      sliding: false,
      offset: 0
    };
    this.setTimer = this.setTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.events = {
      onTouchStart: this.onDraggingStart.bind(this),
      onTouchMove: this.onDraggingMove.bind(this),
      onTouchEnd: this.onDraggingEnd.bind(this),
      onTouchCancel: this.onDraggingEnd.bind(this),
      onClick: this.onClick.bind(this),
      onTransitionEnd: this.onTransitionEnd.bind(this)
    };
  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  onTransitionEnd() {
    const {
      children
    } = this.props;
    let {
      slide
    } = this.state;
    const count = Children.count(children);
    if (slide === count + 1) slide = 1;
    if (slide === 0) slide = count;
    this.setState({
      slide,
      sliding: false
    }, () => {
      this.setTimer();
    });
  }

  onDraggingStart(event) {
    if (event.touches) {
      this.setState({
        dragging: {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY
        },
        offset: 0
      });
    }
  }

  onDraggingMove(event) {
    const {
      sliding,
      dragging
    } = this.state;
    if (sliding || !dragging || !event.touches) return;
    const x = event.touches[0].pageX;
    const y = event.touches[0].pageY;
    const offset = x - dragging.x;
    if (Math.abs(y - dragging.y) < Math.abs(offset)) event.preventDefault();
    this.setState({
      offset
    });
  }

  onDraggingEnd(event) {
    const sliderWidth = event.currentTarget.clientWidth;
    const {
      slide,
      offset,
      dragging
    } = this.state;
    if (!dragging) return;
    const target = Math.abs(offset) > sliderWidth / 5 ? offset > 0 ? slide - 1 : slide + 1 : slide; // check if we did a drag to fire onTranstionEnd

    if (Math.abs(Math.abs(dragging.x) - event.nativeEvent.changedTouches[0].pageX) > 5) {
      this.setState({
        dragging: null
      }, this.changeSlide.bind(this, target));
    }
  }

  changeSlide(slide) {
    const {
      children
    } = this.props;
    if (document.hidden) return;

    if (slide >= 0 && slide <= React.Children.count(children) + 1) {
      this.setState({
        slide,
        sliding: true,
        dragging: null,
        offset: 0
      }, this.setTimer);
    }
  }

  setTimer() {
    const {
      autoPlayInterval,
      children
    } = this.props;
    const {
      slide
    } = this.state;

    if (Children.count(children) > 1 && autoPlayInterval > 0) {
      this.clearTimer();
      this.timer = window.setInterval(this.changeSlide.bind(this, this.state.slide + 1), autoPlayInterval);
    }
  }

  clearTimer() {
    window.clearInterval(this.timer);
  }

  onClick(event) {
    const {
      offset
    } = this.state;
    if (Math.abs(offset) < 25) return;
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
  }

  render() {
    const {
      children,
      arrows,
      dots,
      transitionDuration,
      transitionTimingFunction,
      className
    } = this.props;
    const {
      slide,
      sliding,
      offset
    } = this.state;
    const goPrevSlide = this.changeSlide.bind(this, slide - 1);
    const goNextSlide = this.changeSlide.bind(this, slide + 1);
    const slides = Children.map(children, child => React.cloneElement(child, {
      key: `${child.key}_clone`
    }));
    const count = Children.count(children);
    const enabled = count > 1;
    const slideStyle = {
      flexBasis: '100%',
      flexShrink: 0
    };
    return React.createElement("div", {
      className: className,
      style: {
        position: 'relative',
        overflowX: 'hidden',
        touchAction: 'pan-y pinch-zoom'
      }
    }, React.createElement("ul", _extends({
      style: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        transitionProperty: sliding ? 'transform' : 'none',
        transform: enabled ? offset !== 0 ? `translateX(calc(${offset * 1}px - ${slide * 100}%))` : `translateX(-${slide * 100}%)` : null,
        transitionDuration: transitionDuration + 's',
        transitionTimingFunction,
        contain: 'layout',
        willChange: 'transform'
      }
    }, this.events), enabled && Children.map(slides.slice(-1).concat(children, slides.slice(0, 1)), (item, index) => React.createElement("li", {
      "aria-current": slide === index,
      style: slideStyle
    }, item)) || React.createElement("li", null, children)), enabled && dots && React.createElement("ol", {
      className: "dots"
    }, Children.map(children, (item, index) => React.createElement("li", {
      "aria-current": slide === index + 1,
      onClick: () => this.changeSlide(index + 1)
    }, index + 1))), enabled && arrows && React.createElement("div", null, React.createElement("button", {
      type: "button",
      className: "prev",
      onClick: goPrevSlide
    }), React.createElement("button", {
      type: "button",
      className: "next",
      onClick: goNextSlide
    })));
  }

}

Carousel.propTypes = {
  className: PropTypes.string,
  autoPlayInterval: PropTypes.number,
  transitionDuration: PropTypes.number,
  transitionTimingFunction: PropTypes.string,
  arrows: PropTypes.bool,
  dots: PropTypes.bool,
  initialSlide: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
Carousel.defaultProps = {
  className: 'carousel',
  initialSlide: 1,
  transitionTimingFunction: 'ease-in-out',
  transitionDuration: .5,
  autoPlayInterval: 3000,
  arrows: true,
  dots: true
};
export default Carousel;