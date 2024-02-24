import React from 'react';
import Icon from './Icon';

interface TemplateProps {
    template: string;
}

const TemplateRenderer: React.FC<TemplateProps> = ({ template }) => {
    const renderTemplate = () => {
        const parts = template.split(/{([^{}]+)}/g);
        return parts.map((part, index) => {
            if (index % 2 === 0) {
                return <span key={index}>{part}</span>;
            } else {
                const [type, arg] = part.split(':');
                switch (type) {
                    case 'icon':
                        return <Icon key={index} name={arg} />;
                    case 'utils':
                        return arg === 'current_datetime' ? <span key={index}>{new Date().toLocaleString()}</span> : <span key={index}>{navigator.language || navigator.userLanguage}</span>;
                    default:
                        return null;
                }
            }
        });
    };

    return <>{renderTemplate()}</>;
};

export default TemplateRenderer;
