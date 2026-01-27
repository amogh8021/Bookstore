import React from 'react';
import SupportPageLayout from '../Components/SupportPageLayout';

const TermsConditions = () => {
    return (
        <SupportPageLayout title="Terms & Conditions">
            <p className="mb-4">
                Welcome to AmoghStore. By using our website, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-3">1. Use of the Site</h2>
            <p className="mb-4">
                You agree to use this site only for lawful purposes and in a way that does not infringe the rights of, restrict,
                or inhibit anyone else's use and enjoyment of the site.
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-3">2. Intellectual Property</h2>
            <p className="mb-4">
                All content included on this site, such as text, graphics, logos, and images, is the property of AmoghStore
                or its content suppliers and is protected by copyright laws.
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-3">3. Product Descriptions</h2>
            <p className="mb-4">
                We attempt to be as accurate as possible. However, we do not warrant that product descriptions or other content
                of this site is accurate, complete, reliable, current, or error-free.
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-3">4. Limitation of Liability</h2>
            <p className="mb-4">
                AmoghStore shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting
                from the use or inability to use our products or services.
            </p>
        </SupportPageLayout>
    );
};

export default TermsConditions;
