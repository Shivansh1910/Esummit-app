import React from 'react';
import Svg, { Path, Defs, Pattern, Use, Image } from 'react-native-svg';

interface IEventMenuSvgProps {
  isActive: boolean;
  style?: any;
}

const EventMenuSvg = (props: IEventMenuSvgProps) => {
  return (
    <Svg width={28} height={28} fill="none" style={props.style}>
      <Path
        opacity={props.isActive ? 1 : 0.8}
        fill="url(#a)"
        d="M0 0h28v28H0z"
      />
      <Defs>
        <Pattern
          id="a"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use xlinkHref="#b" transform="scale(.00781)" />
        </Pattern>
        <Image
          id="b"
          width={128}
          height={128}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
export default EventMenuSvg;
