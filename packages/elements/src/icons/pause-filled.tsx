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
      fill="none"
      {...otherProps}>
      <Path
        d="M17 4H15C14.4477 4 14 4.44772 14 5V19C14 19.5523 14.4477 20 15 20H17C17.5523 20 18 19.5523 18 19V5C18 4.44772 17.5523 4 17 4Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 4H7C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H9C9.55228 20 10 19.5523 10 19V5C10 4.44772 9.55228 4 9 4Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

Icon.displayName = 'PauseFilled';

export const PauseFilled = memo(themed(Icon));
