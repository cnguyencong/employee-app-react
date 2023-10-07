import React, { Fragment } from "react";
import { Image } from '../../../../AbstractElements';

const BannerOne = () => {
    return (
        <Fragment>
            <table border={0} cellPadding="0" cellSpacing="0" align="center" className='product'>
                <tbody>
                    <tr className="add-with-banner" style={{ textAlign: 'center' }}>
                        <td><a href="#javascript">
                            <Image attrImage={{ src: `${require("../../../../assets/images/email-template/banner.jpg")}`, alt: "product", className: 'img-product' }} /></a></td>
                    </tr>
                </tbody>
            </table>
            <table border={0} cellPadding="0" cellSpacing="0" align="center" className="product">
                <tbody>
                    <tr>
                        <td><Image attrImage={{ src: `${require("../../../../assets/images/email-template/banner-2.jpg")}`, alt: "", className: 'img-product' }} /></td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    )
}

export default BannerOne;