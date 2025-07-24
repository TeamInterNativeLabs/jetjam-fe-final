import React from 'react'
import { UserLayout } from '../../Components/Layout'

const MusicLicenseDisclosure = () => {
    return (
        <UserLayout>
            <section className="auth-bg">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-11 col-12">
                            <h4 className="mt-3">Privacy Policy</h4>
                            <p className="mt-4 l-grey-text">
                                Effective Date: May 28, 2025
                            </p>
                            <p className="mt-3 l-grey-text">
                                Welcome to JetJams.net. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website.
                            </p>

                            <ul className='site-list'>
                                <li className="mt-3">
                                    <span className="semi-bold">1. Information We Collect</span>
                                    <ul className='mt-2'>
                                        <li><strong>a. Personal Information:</strong> We may collect your name, email address, billing address, and payment information (securely processed via PCI-DSS compliant providers such as PayPal or credit card processors).</li>
                                        <li><strong>b. Non-Personal Information:</strong> Includes IP address, browser type/version, device information, cookies, and other tracking technologies.</li>
                                    </ul>
                                </li>

                                <li className="mt-3">
                                    <span className="semi-bold">2. How We Use Your Information</span>
                                    <ul className='mt-2'>
                                        <li>To process transactions and manage your subscription.</li>
                                        <li>To communicate with you about your account or our services.</li>
                                        <li>To improve our website and service offerings.</li>
                                        <li>To comply with legal obligations and enforce our policies.</li>
                                    </ul>
                                </li>

                                <li className="mt-3">
                                    <span className="semi-bold">3. Sharing Your Information</span>
                                    <ul className='mt-2'>
                                        <li>We do not sell or rent your personal information.</li>
                                        <li>We may share data with payment processors, service providers, and legal authorities if required by law.</li>
                                    </ul>
                                </li>

                                <li className="mt-3">
                                    <span className="semi-bold">4. Security</span>
                                    <p className="l-grey-text mt-2">We use industry-standard security practices, including PCI-DSS compliance, to protect your personal data during transmission and storage.</p>
                                </li>

                                <li className="mt-3">
                                    <span className="semi-bold">5. Cookies and Tracking</span>
                                    <p className="l-grey-text mt-2">We use cookies to enhance your experience. You may disable cookies in your browser settings.</p>
                                </li>

                                <li className="mt-3">
                                    <span className="semi-bold">6. Your Rights</span>
                                    <ul className='mt-2'>
                                        <li>Access, update, or delete your personal information.</li>
                                        <li>Withdraw your consent at any time.</li>
                                        <li>Contact us with any privacy-related concerns.</li>
                                    </ul>
                                </li>

                                <li className="mt-3">
                                    <span className="semi-bold">7. Changes to This Privacy Policy</span>
                                    <p className="l-grey-text mt-2">We may revise this policy occasionally. Updates will be posted on this page with the new effective date.</p>
                                </li>

                                <li className="mt-3">
                                    <span className="semi-bold">8. Contact Us</span>
                                    <p className="l-grey-text mt-2">Email: info@jetjamsllc.com<br />Website: www.jetjams.net</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    )
}

export default MusicLicenseDisclosure
