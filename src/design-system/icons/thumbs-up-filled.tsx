import { themed } from './themed';
import { memo } from 'react';
import { Svg, Path } from 'react-native-svg';

const Icon = (props) => {
  const { color = 'black', size = 24, ...otherProps } = props;
  return (  
    <Svg
      width={size}
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      {...otherProps}
    >
      <Path 
        d="M13.3333 5.99996H10.2666L10.7333 4.06663C10.8 3.86663 10.8 3.66663 10.8 3.46663C10.8 2.73329 10.5333 2.06663 9.99996 1.53329C9.46662 0.999959 8.79996 0.666626 8.06662 0.666626C7.79996 0.666626 7.59996 0.799959 7.46662 1.06663L5.13329 5.59996C4.99996 5.86662 4.79996 5.99996 4.53329 5.99996H2.66663C1.53329 5.99996 0.666626 6.86662 0.666626 7.99996V13.3333C0.666626 14.4666 1.59996 15.3333 2.66663 15.3333H11.7333C12.6 15.3333 13.4 14.7333 13.6666 13.8666L15.2 8.53329C15.3333 8.39996 15.3333 8.19996 15.3333 7.99996C15.3333 6.86662 14.4 5.99996 13.3333 5.99996Z"
       fill={color}
      />
    </Svg>
  );
};

Icon.displayName = 'ThumbsUpFilled';

export const ThumbsUpFilled = memo(themed(Icon));
