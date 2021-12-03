import React from 'react'
import './Footer.css'
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FacebookIcon from '@material-ui/icons/Facebook';
import Twitter from '@material-ui/icons/Twitter';
import Instagram from '@material-ui/icons/Instagram';

function Footer() {
    return (
        <div className="footerContainer">
            <div className="footerColumn">
            <div>
                <Button variant="text" startIcon={<FacebookIcon />}>Facebook</Button>
            </div>
            <div>
                <Button variant="text" startIcon={<Twitter />}>twitter</Button>
            </div>
            <div>
                <Button variant="text" startIcon={<Instagram />}>Instagram</Button>
            </div>
            
            </div>
            <div className="footerColumn">
                Special Links
                <div>
                <a>Link one</a>
                </div>
                <div>
                <a>Link two</a>
                </div>
                <div>
                <a>Link three</a>
                </div>
            </div>
            <div className="footerColumn">
                <div>
                    Contact Us
                </div>
                <div>
                Phone Number : 0112345678
                </div>
                <div>
                Address : 
                </div>
            </div>
        </div>
    )
}

export default Footer
