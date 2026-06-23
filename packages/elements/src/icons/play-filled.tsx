import { themed } from './themed';
import { memo } from 'react';
import { Path, Svg } from 'react-native-svg';

const Icon = (props) => {
  const { color = 'black', size = 40, ...otherProps } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M20.5 11.2008L6.5 2.20078C6.2 2.00078 5.8 2.00078 5.5 2.20078C5.2 2.40078 5 2.70078 5 3.10078V21.1008C5 21.5008 5.2 21.8008 5.5 22.0008C5.6 22.0008 5.8 22.1008 6 22.1008C6.2 22.1008 6.4 22.1008 6.5 21.9008L20.5 12.9008C20.8 12.7008 21 12.4008 21 12.1008C21 11.8008 20.8 11.4008 20.5 11.3008V11.2008Z"
        fill="white"
      />
    </Svg>
  );
};

Icon.displayName = 'PlayFilled';

export const PlayFilled = memo(themed(Icon));
