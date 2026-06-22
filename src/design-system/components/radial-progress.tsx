import { Stack, useColorValue } from '..';
import React, { useMemo } from 'react';
import { Circle, G, Path, Svg } from 'react-native-svg';
import { useTheme } from 'tamagui';

export type RadialProgressProps = {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
};

export const RadialProgress: React.FC<RadialProgressProps> = ({
  size = 24,
  percentage = 0,
  strokeWidth,
  trackColor = '$primaryOpacity16P',
  progressColor = '$primary',
  children
}) => {
  const computedStrokeWidth = strokeWidth || 2 + size / 20; // Scaling the default strokeWidth
  const radius = (size - computedStrokeWidth - 2) / 2;
  const progress = (percentage - 0.5) / 100; // Hack

  const pathData = useMemo(() => {
    const centerX = size / 2; // X-coordinate of the circle's center
    const centerY = size / 2; // Y-coordinate of the circle's center
    const startAngle = 0; // Starting angle in radians
    const endAngle = Math.PI * 2 * progress; // Calculate the end angle based on progress

    // Calculate the start and end points of the arc
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);

    return `M ${startX},${startY} A ${radius},${radius} 0 ${
      endAngle <= Math.PI ? 0 : 1
    } 1 ${endX},${endY}`;
  }, [percentage, computedStrokeWidth, size]);

  return (
    <Stack height={size} width={size} alignItems="center" justifyContent="center">
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={useColorValue(trackColor)}
          strokeWidth={computedStrokeWidth}
          fill="none"
        />
        {/* Please dont change the rotation its finely adjusted */}
        <G transform={`rotate(-87.865 ${size / 2} ${size / 2})`}>
          <Path
            d={pathData}
            fill="none"
            stroke={useColorValue(progressColor)}
            strokeWidth={computedStrokeWidth}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <Stack position="absolute" alignItems="center" justifyContent="center">
        {children}
      </Stack>      
    </Stack>
  );
};


// export const RadialProgress: React.FC<RadialProgressProps> = ({
//   size = 24,
//   percentage = 0,
//   strokeWidth,
//   trackColor = '$primaryOpacity16P',
//   progressColor = '$primary',
//   children
// }) => {
//   const computedStrokeWidth = strokeWidth || 2 + size / 20; // Scaling the default strokeWidth
//   const radius = (size - computedStrokeWidth - 2) / 2;
//   const progress = (percentage - 0.5) / 100;

//   const pathData = useMemo(() => {
//     const centerX = size / 2;
//     const centerY = size / 2;
//     const startAngle = 0;
//     const endAngle = Math.PI * 2 * progress;

//     const startX = centerX + radius * Math.cos(startAngle);
//     const startY = centerY + radius * Math.sin(startAngle);
//     const endX = centerX + radius * Math.cos(endAngle);
//     const endY = centerY + radius * Math.sin(endAngle);

//     return `M ${startX},${startY} A ${radius},${radius} 0 ${
//       endAngle <= Math.PI ? 0 : 1
//     } 1 ${endX},${endY}`;
//   }, [progress, radius, size]);

//   return (
//     <Stack height={size} width={size} alignItems="center" justifyContent="center" position="relative">
//       <Svg width={size} height={size}>
//         <Circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           stroke={useColorValue(trackColor)}
//           strokeWidth={computedStrokeWidth}
//           fill="none"
//         />
//         <G transform={`rotate(-87.865 ${size / 2} ${size / 2})`}>
//           <Path
//             d={pathData}
//             fill="none"
//             stroke={useColorValue(progressColor)}
//             strokeWidth={computedStrokeWidth}
//             strokeLinecap="round"
//           />
//         </G>
//       </Svg>
//       {/* Render children within radial progress */}
//       <Stack position="absolute" alignItems="center" justifyContent="center">
//         {children}
//       </Stack>
//     </Stack>
//   );
// };
