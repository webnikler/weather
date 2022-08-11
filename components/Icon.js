import { Icon as IconElement } from 'react-native-elements';
import PropTypes from 'prop-types'

const Icon = ({
    color,
    size,
    name,
    type,
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

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,

}

Icon.defaultProps = {
    color: '#fff',
    size:  28,
    type: 'font-awesome'
}

export default Icon;
