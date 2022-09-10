import { IImageProps, Image, Pressable } from 'native-base';
import React from 'react';

import { iconSources } from './sources';

type AppIconProps = {
  name: string;
  dir: string;
  size?: number;
  onPress?: () => void;
} & IImageProps;

export const AppIcon = ({ name, dir, size, onPress, ...imageProps }: AppIconProps): JSX.Element => {
  return (
    <Pressable onPress={onPress}>
      <Image
        width={size}
        height={size}
        {...imageProps}
        source={iconSources[dir][name].source}
        alt={name}
      />
    </Pressable>
  );
};
