import React from 'react';

const PlainLayout = ({ children }) => {
    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    );
};

export default PlainLayout;