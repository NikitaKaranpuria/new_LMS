// import React from "react";
// import { useState, useEffect } from "react";
// import BaseUrl from "../BaseUrl/BaseUrl";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import SearchResult from "./SearchResult";
// function Accordian({ Heading, Body, Acodiandata }) {
//   const [isOpen, SetIsOpen] = useState(false);
//   const [colased, Setcollased] = useState(true);
//   const mycollapsed = () => {
//     SetIsOpen(!isOpen);
//     Setcollased(!colased);
//   };
//   let history = useHistory();
//   useEffect(async () => {
//     if (!localStorage.getItem("LMS_Token")) {
//       // localStorage.setItem(
//       //   "LMS_Token",
//       //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyNX0sImlhdCI6MTYxNTU0ODYzNn0.LQQN1nw5rAS-SpWIv9h5kinLdlb0f849g0yDFIweKtE"
//       // );
//       history.push(`/sign_in`);
//     }
//   }, []);
//   const [topic, setTopicdata] = useState([]);
//   // const RecieveBody = async () => {
//   //   await axios
//   //     .get(`${BaseUrl}${Body}`, {
//   //       method: "GET",
//   //       headers: {
//   //         "Access-Control-Allow-Origin": "*",
//   //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
//   //         "Content-Type": "application/x-www-form-urlencoded",
//   //         auth: localStorage.getItem("LMS_Token"),
//   //       },
//   //     })
//   //     .then(function (response) {
//   //       setTopic(response.data);
//   //       console.log(response.data);
//   //     });
//   // };

//   useEffect(() => {
//     // handleChange()
//     AllCourseList()
//   }, []);

//   const { Checked, setChecked } = useState([]);

//   // const handleChange = (id) => {
//   //   console.log(id,"id")
//   //   return <SearchResult filterid={id}/>
//   // // history.push("/search_results")
//   // }
//   const handleChange = async (id) => {
//     const topic_id = {
//       id_topic: id
//     }
//     console.log(topic_id, "id")
//     await axios
//       .post(`${BaseUrl}forentend/filtercourse`, topic_id, {
//         method: "POST"
//       }, {

//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
//           "Content-Type": "application/x-www-form-urlencoded",
//           auth: localStorage.getItem("LMS_Token"),
//         },
//       })
//       .then(function (response) {
//         console.log(response.data, "listttt")
//         setallCourseList(response.data)

//       });
//   };

//   return (
//     <>
//       <div class="panel-heading" id="headingOne">
//         <div class="panel-title10">
//           <a
//             class={colased ? "collapsed" : ""}
//             data-toggle="collapse"
//             data-target="#collapseOne"
//             aria-expanded="false"
//             aria-controls="collapseOne"
//             onClick={mycollapsed}
//           >
//             {Heading}
//           </a>
//         </div>
//       </div>

//       <div id="collapseOne">
//         {isOpen && (
//           <div class="panel-body ">
//             <div class="ui form">
//               {Acodiandata.map((cv, id) => {
//                 return (
//                   <div class="grouped fields" key={id}>
//                     <div class="ui form checkbox_sign">
//                       <div class="inline field">
//                         <div class="ui checkbox mncheck">
//                           <input
//                             type="checkbox"
//                             // checked={
//                             //   Checked.indexOf(cv.name) === -1 ? false : true
//                             // }
//                             checked={Checked}
//                             value={cv.name}
//                             onChange={() => handleChange(cv.id)}
//                           />
//                           <label>
//                             {cv.name}{" "}
//                             <span class="filter__counter">
//                               ({cv.Total_course})
//                             </span>{" "}
//                           </label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Accordian;
