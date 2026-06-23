import { themed } from './themed';
import { memo } from 'react';
import { Svg, ClipPath, G, Defs, Rect,Path } from 'react-native-svg';

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
          <G clip-path="url(#clip0_2626_104270)">
              <Path 
                d="M13.3333 0.666626H4.26663C3.33329 0.666626 2.53329 1.26663 2.33329 2.13329L0.799959 7.46663C0.666626 7.59996 0.666626 7.79996 0.666626 7.99996C0.666626 9.13329 1.59996 9.99996 2.66663 9.99996H5.73329L5.26663 11.9333C5.19996 12.1333 5.19996 12.3333 5.19996 12.5333C5.19996 14.0666 6.39996 15.3333 7.93329 15.3333C8.19996 15.3333 8.39996 15.2 8.53329 14.9333L10.8666 10.3333C11 10.1333 11.2 9.93329 11.4666 9.93329H13.3333C14.4666 9.93329 15.3333 9.06663 15.3333 7.93329V2.66663C15.3333 1.53329 14.4 0.666626 13.3333 0.666626Z" 
                fill={color}
              />
          </G>
          <Defs>
            <ClipPath id="clip0_2626_104270">
                <Rect 
                  width={size}
                  height={size}
                  fill="white"
                />
            </ClipPath>
          </Defs>
        </Svg>
  );
};

Icon.displayName = 'ThumbsDownFilled';

export const ThumbsDownFilled = memo(themed(Icon));
