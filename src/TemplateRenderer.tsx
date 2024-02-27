import React from 'react';

type IconConfig = Record<string, React.ReactNode>;
type UtilConfig = Record<string, () => string>;

type TemplateProps = {
    template: string;
    icons: IconConfig;
    utils: UtilConfig;
};

const Template: React.FC<TemplateProps> = ({ template, icons, utils }) => {
    const handleClickTime = () => {
        const time = utils['current_datetime']();
        alert(`Current time is ${time}`);
    };

    const handleClickLanguage = () => {
        const language = utils['language']();
        alert(`Selected language is ${language}`);
    };

    const renderTemplate = () => {
        const parts = template.split(/({(?:icon|utils):[^{}]*})/);
        return parts.map((part, index) => {
            if (part.startsWith('{icon:')) {
                const iconName = part.substring(6, part.length - 1);
                if (iconName === 'clock') {
                    return (
                        <span key={index} onClick={handleClickTime}>
                            {icons[iconName]}
                        </span>
                    );
                } else if (iconName === 'language') {
                    return (
                        <span key={index} onClick={handleClickLanguage}>
                            {icons[iconName]}
                        </span>
                    );
                }
            } else if (part.startsWith('{utils:')) {
                const utilName = part.substring(7, part.length - 1);
                return <span key={index}>{utils[utilName]?.()}</span>;
            } else {
                return <span key={index}>{part}</span>;
            }
        });
    };

    return <>{renderTemplate()}</>;
};

const App: React.FC = () => {
    const icons: IconConfig = {
        clock: <span role="img" aria-label="Clock" style={{ cursor: 'pointer' }}>⏰</span>,
        language: <span role="img" aria-label="Language" style={{ cursor: 'pointer' }}>🌐</span>,
    };

    const utils: UtilConfig = {
        current_datetime: () => new Date().toLocaleString(),
        language: () => navigator.language || navigator.userLanguage,
    };

    return (
        <div className="App">
            <h1>Шаблонизатор</h1>
            <div>
                <p>
                    <Template
                        template="Current time is {icon:clock}, selected language is {icon:language}"
                        icons={icons}
                        utils={utils}
                    />
                </p>
            </div>
        </div>
    );
};

export default App;
