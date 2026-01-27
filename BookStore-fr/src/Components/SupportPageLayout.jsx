import React from 'react';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

const SupportPageLayout = ({ title, children }) => {
    return (
        <div className="bg-background min-h-screen flex flex-col">
            <NavBar />
            <div className="container mx-auto px-6 py-12 flex-1">
                <h1 className="text-4xl font-bold text-primary mb-8 font-serif">{title}</h1>
                <div className="bg-white p-8 rounded-lg shadow-md prose prose-lg max-w-none text-gray-700">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SupportPageLayout;
