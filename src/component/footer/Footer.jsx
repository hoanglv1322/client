import React from 'react'
import './footer.css'

export default function Footer() {
	return (
        <div>
            <div className="footer-app">

                <div className="header-footer">
                    <div className="social-link">
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-instagram-square"></i>
                        <i className="fab fa-twitter-square"></i>
                        <i className="fab fa-youtube"></i>
                    </div>
                </div>
                <div className="container-footer">
                    <div className="footer-section">
                        <h2>HELP & INFORMATION</h2>
                        <ul>
                            <li>Help</li>
                            <li>Track order</li>
                            <li>Delivery & Returns</li>
                            <li>Shipping Policy</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h2>ABOUT US</h2>
                        <ul>
                            <li>Contact Us</li>
                            <li>Address</li>
                            <li>Privacy Policy</li>
                            <li>FAQs</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h2>BRANDS</h2>
                        <ul className="brand-list">
                            <li>
                                <img
                                    src="https://www.globalbrandsmagazine.com/wp-content/uploads/2021/06/Dior.jpg"
                                    alt="brand"
                                />
                            </li>
                            <li>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm3cZCiGqXIKYFYx-vC4N8gz6yCrTOu2-GtyLnreeg4Zu4LAEtbm6KNpf_gbnp09NT314&usqp=CAU"
                                    alt="brand"
                                />
                            </li>
                            <li>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ0yOSY8gIi8VOt1jppBA4ehsApA_a6jr8oOQyirGjpY6g5smO_XX8bhGCFhwF4eFerDg&usqp=CAU"
                                    alt="brand"
                                />
                            </li>
                            <li>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS-8N-ZZC2KKlSRj1mMAR89g-iiOU9QnfgtXDuFNJh1tTsSCg67gc-vIah_cLnxmVqve8&usqp=CAU"
                                    alt="brand"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-privacy">&copy; 2021 HVL- Blog App</div>
            </div>
		</div>
	)
}
