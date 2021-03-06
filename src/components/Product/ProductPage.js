import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadProduct } from "../../actions/ProductActions";
import { clearErrors } from "../../actions/ErrorActions";

import { loader as Loader } from "../images/loader";
import Nav from "./Nav";
import SubNav from "./SubNav";
import ImageSec from "./ImageSec";
import InfoSec from "./InfoSec";
import IconLine from "./IconLine";
import DescBox from "./DescBox";
import ReviewSec from "./ReviewSec";
import SimilarProducts from "./SimilarProducts";
import CouldNot from "./Couldnot";
import Footer from "./Footer";

import "./Product.scss";
// import { Loader } from "semantic-ui-react";

class ProductPage extends Component {
  static propTypes = {
    product: PropTypes.object,
    error: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    loadProduct: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  static defaultProps = {
    res: {
      errorcode: "000",
      status: "OK",
      message: "Seller's Product Detail found",
      productDetail: {
        sellerId: 12,
        sellerName: "Rajdeep Telecom",
        categoryId: 1,
        subCategoryId: 6,
        productId: 6,
        productName:
          "Apple Macbook Pro Core i7 - (16 GB/256 GB SSD/Mac OS Sierra/2 GB Graphics) MLH32HN/A  (15 inch, SPace Grey, 1.83 kg)",
        productDescription:
          "\r\nThe Vivo Y91i smartphone is here to make your life simpler. Its Halo Fullview Display paves the way for an enhanced viewing experience. Its 13 MP rear camera and the AI-powered 5 MP front camera, ensure that every picture you click is extremely likeable. With the presence of a whopping 4030 mAh battery, this phone will keep you engrossed, even when you are on the go.",
        productSpecification: {
          OS: "Android",
          RAM: "8 GB",
          "Item Weight": "195 g",
          "Product Dimensions": "16.4 x 0.9 x 7.6 cm",
          Batteries: "1 Lithium Polymer batteries required. (included)",
          "Item model number": "CPH1937",
          "Wireless communication technologies": "Bluetooth, WiFi Hotspot",
          "Connectivity technologies":
            "802.11a/b/g/n/ac, WLAN 2.4G, WLAN 5.1G, WLAN 5.8G, WLAN Display",
          "Special features":
            "Dual SIM, GPS, Music Player, Video Player, Built-in GPS, Supports A-GPS, Beidou, Glonass, GALILEO",
          "Display technology":
            "IPS LCD capacitive touchscreen, 16M colors,6.5 inches, 102.0 cm2 (~82.5% screen-to-body ratio)",
          "Other camera features": "8MP",
          "Form Factor": "Touchscreen Phone",
          Weight: "195 Grams",
          Colour: "Space Purple",
          "Battery Power Rating": "5000",
          "In The Box":
            "Handset, USB Cable, Sim Tray Ejecter, Pre-applied Screen Protector and Protective Case, Booklet with Warranty Card and Quick Guide",
        },
        productKeyFeatures: [
          "13MP + 2MP | 8MP Front Camera",
          "4 GB RAM | 64 GB ROM | Expandable Upto 256 GB",
          "15.75 cm (6.2 inch) HD+ Display",
          "MTK MT6765 Processor",
          "4230 mAh Battery",
        ],
        productResources: [
          {
            resourceType: "image",
            resourceURL:
              "https://rukminim1.flixcart.com/image/832/832/computer/r/x/u/apple-macbook-pro-notebook-original-imaepax8usdzrh5h.jpeg",
            orderRender: 2,
          },
          {
            resourceType: "image",
            resourceURL:
              "https://rukminim1.flixcart.com/image/832/832/computer/r/x/u/apple-macbook-pro-notebook-original-imaepax8usdzrh5h.jpeg",
            orderRender: 1,
          },
        ],
        brandId: 1,
        brandName: "OnePlus",
        variants: [
          {
            variantId: 2,
            variantName: "colour",
            variantDescription: "blue",
            sellerPrice: 24599,
            elocalsPrice: 22000,
            quantity: 20,
            variantResourcesSet: [
              {
                resourceType: "image",
                resourceURL:
                  "https://quantummobiles.com/wp-content/uploads/2020/04/2020-Macbook-in-three-colors-Gold-space-gray-and-silver.jpg",
                orderRender: 2,
              },
              {
                resourceType: "image",
                resourceURL:
                  "https://quantummobiles.com/wp-content/uploads/2020/04/2020-Macbook-in-three-colors-Gold-space-gray-and-silver.jpg",
                orderRender: 1,
              },
            ],
            mrp: 38000,
          },
        ],
      },
    },
  };

  state = { drop: false, product: null, loading: false };

  async componentDidMount() {
    await this.props.loadProduct();

    await setTimeout(() => {
      if (!this.props.product) {
        console.log("time out");
        this.setState({
          product: this.props.res.productDetail,
          loading: false,
        });
      } else {
        this.setState({
          product: this.props.product,
          loading: false,
        });
      }
    }, 5000);
  }

  render() {
    const { history, error } = this.props;
    const { product, loading } = this.state;

    return (
      <div className="product">
        <Nav />
        <SubNav />
        {!product ? (
          <div
            style={{
              height: "80%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <Loader />
          </div>
        ) : (
          <>
            <div className="containerDiv">
              <ImageSec image={product.productResources[0].resourceURL} />
              <InfoSec
                features={product.productKeyFeatures}
                name={product.productName}
                variant={product.variants}
              />
            </div>
            <IconLine name={product.sellerName} history={history} />
            <DescBox
              specs={product.productSpecification}
              desc={product.productDescription}
            />
            <ReviewSec />
            <SimilarProducts />
            <CouldNot />
            <Footer />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product.product,
  loading: state.product.isLoading,
  error: state.error,
});

export default connect(mapStateToProps, { loadProduct, clearErrors })(
  ProductPage
);
