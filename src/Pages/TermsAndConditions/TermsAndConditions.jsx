import React from 'react';
import { UserLayout } from '../../Components/Layout';

const TermsAndConditions = () => {
    return (
        <UserLayout>
            <section className="auth-bg">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-11 col-12">
                            <h4 className="mt-3">Terms & Conditions</h4>
                            <p className="mt-4 l-grey-text">
                                Welcome to JetJams.net. By accessing or using our website, you agree to these Terms and Conditions. Please read them carefully.
                            </p>
                            <ul className='site-list'>
                                <li className="mt-3">
                                    <span className="semi-bold">1. Eligibility</span>
                                    <span className="l-grey-text"> - You must be at least 18 years old or have parental consent to use our site and services.</span>
                                </li>
                                <li className="mt-3">
                                    <span className="semi-bold">2. Subscription and Payment</span>
                                    <span className="l-grey-text">
                                        - Access to beatmixed music sets requires a subscription at $9.99/month. Payments can be made via PayPal or credit card through our PCI-DSS compliant system. Subscription fees are billed monthly and automatically renew unless canceled.
                                    </span>
                                </li>
                                <li className="mt-3">
                                    <span className="semi-bold">3. Use of Content</span>
                                    <span className="l-grey-text">
                                        - The beatmixed sets are for lawful use only. They are licensed for use by instructors in classes and performances. You may not resell, redistribute, or share the sets outside your instructional use without our prior written consent. The sets are lyric-free to facilitate instruction; reproduction or modification is prohibited.
                                    </span>
                                </li>
                                <li className="mt-3">
                                    <span className="semi-bold">4. Licensing and Rights</span>
                                    <span className="l-grey-text">
                                        - JetJams.net is a member of ASCAP and BMI, and we have obtained necessary licenses and permissions to distribute our music sets. All royalty fees are paid in accordance with licensing agreements.
                                    </span>
                                </li>
                                <li className="mt-3">
                                    <span className="semi-bold">5. Intellectual Property</span>
                                    <span className="l-grey-text">
                                        - All content on the site, including music sets, trademarks, and logos, are the property of JetJams.net or its licensors. Unauthorized use is prohibited.
                                    </span>
                                </li>
                                <li className="mt-3">
                                    <span className="semi-bold">6. Security and Privacy</span>
                                    <span className="l-grey-text">
                                        - Your payment information is processed securely via PCI-DSS compliant providers. Please review our Privacy Policy for details on data handling.
                                    </span>
                                </li>
                                <li className="mt-3">
                                    <span className="semi-bold">7. Termination</span>
                                    <span className="l-grey-text">
                                        - We reserve the right to suspend or terminate access to the site for violations of these terms or for any reason without notice.
                                    </span>
                                </li>
                                <li className="mt-3">
                                    <span className="semi-bold">8. Limitation of Liability</span>
                                    <span className="l-grey-text">
                                        - JetJams.net is not responsible for any damages resulting from the use or inability to use our music sets or website.
                                    </span>
                                </li>
                                <li className="mt-3">
                                    <span className="semi-bold">9. Indemnification</span>
                                    <span className="l-grey-text">
                                        - You agree to indemnify and hold harmless JetJams.net from any claims arising from your use of the site or violation of these terms.
                                    </span>
                                </li>
                                <li className="mt-3">
                                    <span className="semi-bold">10. Changes to Terms</span>
                                    <span className="l-grey-text">
                                        - We may update these Terms and Conditions periodically. Continued use of the site constitutes acceptance of the revised terms.
                                    </span>
                                </li>
                                <li className="mt-3">
                                    <span className="semi-bold">11. Governing Law</span>
                                    <span className="l-grey-text">
                                        - These terms are governed by the laws of Florida, United States of America.
                                    </span>
                                </li>
                                <li className="mt-3">
                                    <span className="semi-bold">12. Contact</span>
                                    <span className="l-grey-text">
                                        - For questions about these Terms, Contact us at: <br /><br />
                                        Email: info@jetjamsllc.com <br />
                                        Website: www.jetjams.net
                                    </span>
                                </li>
                            </ul>
                            <p className="mt-4 l-grey-text">Effective Date: Mar 28, 2025</p>
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    );
};

export default TermsAndConditions;
