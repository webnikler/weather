import { IImageProps, Image, Pressable } from 'native-base';
import React from 'react';

import { iconSources } from './sources';

type AppIconProps = {
  name: string;
  dir: string;
  onPress?: () => void;
} & IImageProps;

export const AppIcon = ({ name, dir, onPress, ...imageProps }: AppIconProps): JSX.Element => {
  return (
    <Pressable onPress={onPress}>
      <Image {...imageProps} source={iconSources[dir][name].source} alt={name} />
    </Pressable>
  );
};
