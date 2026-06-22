import { themed } from './themed';
import { memo } from 'react';
import { Rect, Svg } from 'react-native-svg';

// A filled, rounded square — the "stop" affordance shown while a response is
// streaming (mirrors PauseFilled / PlayFilled). The fill follows the themed icon
// colour, so it reads white on a contained button.
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
      <Rect x="6" y="6" width="12" height="12" rx="2.5" fill={color} stroke={color} />
    </Svg>
  );
};

Icon.displayName = 'StopFilled';

export const StopFilled = memo(themed(Icon));
