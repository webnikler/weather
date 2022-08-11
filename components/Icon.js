import { Icon as IconElement } from 'react-native-elements';

const Icon = ({
    color = '#fff',
    size = 28,
    name,
    type = 'font-awesome',
}) => (
    <IconElement type={type} name={name} size={size} color={color}/>
);

export class IconName {
    static cloud = 'cloud';
    static sun = 'sun';
    static clouds = 'clouds';
    static cloudBolt = 'cloud-bolt';
    static cloudDrizzle = 'cloud-drizzle';
    static cloudSunRain = 'cloud-sun-rain';
}

export default Icon;