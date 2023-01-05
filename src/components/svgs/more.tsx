import React from 'react';

import Svg, {Rect, Path, Defs, Pattern, Use, Image} from 'react-native-svg';

interface IMoreMenuSvgProps {
  isActive: boolean;
  style?: any;
}

const MoreMenuSvg = (props: IMoreMenuSvgProps) => {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      style={props.style}>
      <Rect
        opacity={props.isActive ? 1 : 0.8}
        width={28}
        height={28}
        fill="url(#pattern0)"
      />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use xlinkHref="#image0_613_1297" transform="scale(0.0078125)" />
        </Pattern>
        <Image
          id="image0_613_1297"
          width={128}
          height={128}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};

export default MoreMenuSvg;
