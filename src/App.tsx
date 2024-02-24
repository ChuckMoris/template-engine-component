import React from 'react';
import TemplateRenderer from './TemplateRenderer';

const App: React.FC = () => {
    return (
        <div>
            <TemplateRenderer template="Template with {icon:alert}" />
            <TemplateRenderer template="Current time is {utils:current_datetime}, selected language is {utils:language}" />
        </div>
    );
};

export default App;
