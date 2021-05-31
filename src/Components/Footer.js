import React from "react";
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const Footer = () => {
    return(
        <div className={"footer"}>
            <div className={"row"}>
                <div className={"col-md-5"}>
                    LOGO<br /><br />

                    <CallIcon /> 1234567890 <br/>
                    <EmailIcon /> <a href="mailto: freshfromfarmer@gmail.com">freshfromfarmer@gmail.com</a> <br />
                    <LocationOnIcon /> No.1, abc street, chennai
                </div>
                <div className={"col-md-4"}>

                        Home<br />
                        Contact<br />
                        Products<br />
                        Gallery<br />
                        Feedback<br />

                </div>
                <div className="col-md-3">
                    Follow us on<br />
                    <InstagramIcon /> Instagram <br />
                    <FacebookIcon /> Facebook <br />
                    <TwitterIcon /> Twitter <br />
                </div>
            </div>
            <div className={"copyright"}>
                <p>Copyright &#169; Fresh From Farmer 2021, All rights Reserved</p>
            </div>
        </div>
    );
}

export default Footer;