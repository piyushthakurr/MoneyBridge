// import React, { Component } from "react";
// import { connect } from "react-redux";
// import FadeLoader from "react-spinners/FadeLoader";
// import "./Loader.css";
// import Loader from "react-loader-spinner";

// class LoaderComponent extends Component {
//   render() {
//     return (
//       <div
//         className="text-center"
//         style={
//           this.props.loading === true
//             ? {
//                 height: "100vh",
//                 zIndex: "99999",
//                 position: "relative",
//                 display: "block",
//                 backgroundColor: "rgba(0,0,0,0.8)",
//               }
//             : { display: "none" }
//         }
//       >
//         <div className="overlayDiv">
//           <Loader
//             type="Bars"
//             color="#f45126"
//             height={50}
//             width={50}
//             //  timeout={300000} //3 secs
//           />
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     loading: state.loader.loading,
//   };
// };

// export default connect(mapStateToProps, null)(LoaderComponent);

import React, { Component } from "react";
import { connect } from "react-redux";
// import { Container, Spinner } from "react-bootstrap";
import Loader from "react-loader-spinner";

class LoaderComponent extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div className="overlayDiv">
          <Loader
            type="BallTriangle"
            color="#947FFE"
            height={80}
            width={80}
            // timeout={3000000} //3 secs
            visible={true}
          />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loader.loading,
  };
};

export default connect(mapStateToProps, null)(LoaderComponent);
