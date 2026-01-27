import React from 'react';
import SupportPageLayout from '../Components/SupportPageLayout';

const PrivacyPolicy = () => {
    return (
        <SupportPageLayout title="Privacy Policy">
            <p className="mb-4">
                At AmoghStore, we are committed to protecting your privacy and ensuring the security of your personal information.
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-3">Information We Collect</h2>
            <p className="mb-4">
                We collect information you provide directly to us, such as when you create an account, make a purchase, or contact
                customer support. This may include your name, email address, shipping address, and payment information.
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-3">How We Use Your Information</h2>
            <p className="mb-4">
                We use the information we collect to process your orders, communicate with you about your account, and improve
                our services. We do not sell or share your personal information with third parties for their marketing purposes.
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-3">Security</h2>
            <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against
                unauthorized access, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-3">Changes to This Policy</h2>
            <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy
                on this page.
            </p>
        </SupportPageLayout>
    );
};

export default PrivacyPolicy;
