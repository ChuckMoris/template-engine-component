import React from 'react';

interface IconProps {
    name: string;
}

const Icon: React.FC<IconProps> = ({ name }) => {
    return <span className={`icon icon-${name}`}>Icon: {name}</span>;
};

export default Icon;
