import React, { useState, useEffect, useRef } from "react";
import './courseoverviewheader.css'
import Popover from "react-awesome-popover";
import CryptoJS from "crypto-js";
import {
  CPopover,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,

} from "@coreui/react";
import $ from 'jquery'
import { useParams, useHistory, Link } from "react-router-dom";
import BaseUrl from "../BaseUrl/BaseUrl";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { toast } from "react-toastify";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

toast.configure();
const ProductWarnToast = () => {
  return (
    <div>
      <i class="fa fa-info info-toast"></i>
      Please select product.
    </div>
  );
};
function Header(params) {
  const myvideo = useRef(null);
  const [visible, setVisible] = useState(false)
  const [duration, setDuratin] = useState(0);
  const [watchProcess, setWatchProcess] = useState({
    progress: '', certificate: ''
  });
  // console.log(watchProcess)
  const [userNotes, setUserNotes] = useState({
    title: '',
    notes: ''
  })
  const [notesList, setNotList] = useState([])
  const [lessonid, setLessonid] = useState(0)
  const [section, setSection] = React.useState([]);
  const [download, setDownloadFile] = React.useState([]);


  let history = useHistory()
  const [videoLink, setVideoLink] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const editid = useParams();
  const courseId = editid.id.toString().replace('xMl3Jk', '+').replace('Por21Ld', '/').replace('Ml32', '=');
  let decrypted = CryptoJS.AES.decrypt(courseId, "asdfghjkl");
  let id = decrypted.toString(CryptoJS.enc.Utf8);

  // console.log('my id', id)
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push('/sign_in')

    } else {

      GetSectionData();
      RecieveNotes()
      watchSbmit()
    }
  }, [])
  const GetSectionData = async () => {
    await axios.get(`${BaseUrl}forentend/courselesson/${id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      // console.log(response.data.data, "get section list")
      setSection(response.data.data)
    });
  }

  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      history.push('/sign_in')

    } else {

      GetSectionData();
    }
  }, [])
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

  }, [videoLink])
  const playmyvideo = async () => {
    if (new Date(myvideo.current.currentTime * 1000).toISOString().substr(11, 8) == '00:00:30') {
      await axios.post(`${BaseUrl}forentend/watchhistory/`, {
        courseId: parseInt(id),
        lessonId: lessonid
      }, {
        headers: {
          "auth": localStorage.getItem("LMS_Token")
        },

      }).then((response) => {

      }).catch((error) => {
        // console.log(error);
      });
    }
    setDuratin(new Date(myvideo.current.currentTime * 1000).toISOString().substr(11, 8))
  }
  const Lessonpreview = (videourl, title, lessonId) => {
    setVideoLink(videourl)
    setCourseTitle(title)
    setLessonid(lessonId)

  }
  const change = (e) => {
    const { name, value } = e.target
    setUserNotes((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const RecieveNotes = async () => {
    await axios
      .get(`${BaseUrl}forentend/listofmynotes/${id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {

        // For displaying Data
        setNotList(response.data)

      });
  };
  const submitNotes = async () => {
    const noteData = {
      ...userNotes,
      lesson_id: lessonid,
      course_id: id,
      duration: duration
    }
    await axios.post(`${BaseUrl}forentend/createnotes/`, noteData, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      },

    }).then((response) => {
      setVisible(false)
      RecieveNotes()
    }).catch((error) => {
      // console.log(error);
    });

    // console.log(noteData)
  }
  const watchSbmit = async () => {

    await axios.post(`${BaseUrl}forentend/myprogress/`, { course_id: id }, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      },

    }).then((response) => {

      setWatchProcess(response.data)
    }).catch((error) => {
      // console.log(error);
    });


  }

  const CourseContentTabOpen = () => {

    $("#courseopen").click(function () {
      $("#video-col").removeClass("col-md-12");
      $("#video-col").addClass("col-md-8");
      $("#video-col2").show();
      $(this).hide();
    });

  }
  const CourseContentTabClose = () => {

    $("#courseclose").click(function () {
      $("#video-col").removeClass("col-md-8");
      $("#video-col").addClass("col-md-12");
      $("#video-col2").hide();
      $("#courseopen").show();
    });

  }
  const exportSelected = (csvData) => {
    // console.log("selcet export")
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "course_download" + fileExtension);
  }
  const exportHandler = (ID, CourseID) => {
    // console.log(ID,"export handler")
    let newcourse = []
    let i = 0
    for (i = 0; i < section.length; i++) {
      {
        section.forEach((cv, index) => {
          if (ID) {
            // console.log("if lesson",ID)

            newcourse.push({
              id: ID,
              title: cv.lesson[0].title,
              duration: cv.lesson[0].duration,
              course_id: cv.lesson[0].course_id,
              section_id: cv.lesson[0].section_id,
              video_type: cv.lesson[0].video_type,
              video_url: cv.lesson[0].video_url,
              lesson_type: cv.lesson[0].lesson_type,
              summary: cv.lesson[0].summary,
            })
          }
        })
      }

    }
    if (newcourse.length > 0) {
      setDownloadFile({ download: newcourse })
      exportSelected(newcourse)
      documentWatchHistory(ID, CourseID)
    } else {
      toast.warn(<ProductWarnToast />, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }
  const exportAllHandler = (SectionID) => {
    let newAllcourse = []
    let i = 0
    for (i = 0; i < section.length; i++) {
      {
        section.forEach((cv, index) => {
          if (SectionID) {
            newAllcourse.push({
              id: SectionID,
              sectiontitle: cv.title,
              title: cv.lesson[0].title,
              duration: cv.lesson[0].duration,
              course_id: cv.lesson[0].course_id,
              section_id: cv.lesson[0].section_id,
              video_type: cv.lesson[0].video_type,
              video_url: cv.lesson[0].video_url,
              lesson_type: cv.lesson[0].lesson_type,
              summary: cv.lesson[0].summary,
            })
          }
        })
      }

    }
    if (newAllcourse.length > 0) {
      setDownloadFile({ download: newAllcourse })
      exportSelected(newAllcourse)
    } else {
      toast.warn(<ProductWarnToast />, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }
  const documentWatchHistory = async (ID, CourseID) => {
    let urlencoded = new URLSearchParams()
    urlencoded.append('courseId', CourseID);
    urlencoded.append('lessonId', ID);

    await axios.post(`${BaseUrl}forentend/watchhistory`, urlencoded, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      },

    }).then((response) => {
    }).catch((error) => {
      // console.log(error);
    });
  }
  return (
    <>
      <div className='coursecontainer'>
        <div className='div-left'>
          <ul>
            <li>
              <div>{courseTitle ? courseTitle : ''}</div>
            </li>
          </ul>
        </div>
        <div className='div-right'>
          <ul>
            <li>
              <Popover>< button className='trophy' onClick={watchSbmit}><i class="fa fa-trophy" aria-hidden="true"></i></button>
                <div className='prop'>{watchProcess.progress ? watchProcess.progress : ''}
                  <div>{watchProcess.certificate ? <button className='p-2 btn btn-primary'>Get certificate</button> : ''}</div>
                </div>

              </Popover>
            </li>
            <li>
              <div className='share'><i class="fas fa-share"></i></div>
            </li>
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12" id="video-col">
          <video controls disablePictureInPicture controlsList="nodownload" style={{ height: "500px", width: "100%" }} ref={myvideo} onTimeUpdate={playmyvideo} src={videoLink ? videoLink : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} />
        </div>
        <div className="col-md-4" id="video-col2" style={{ display: "none" }}>
          <div className="title">
            <h5 className="c-title mb-3" >Course content</h5>
            <button className="a-fa-time" id="courseclose" style={{ background: "transparent", border: "0px" }} onClick={CourseContentTabClose}><i class="fa fa-times fa-time" aria-hidden="true"></i></button>
          </div>
          <div className="Drop-dec" style={{
            maxHeight: "445px", overflow: "auto"
          }}>
            {section.map((sectionList, index) => (
              <div key={index}>
                <div id="accordion" className="ui-accordion ui-widget ui-helper-reset" data-bs-toggle="collapse" data-bs-target={"#collapsetwo" + index + 1} aria-expanded="true" aria-controls="collapsetwo">

                  <div
                    className="accordion-header ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all  video-accordian"
                  >

                    <div className="section-header-left ">
                      <span className="section-title-wrapper">
                        <i className="uil ui l-presentation-play crse_icon"></i>
                        <span className="section-title-text">{sectionList.title}
                        </span>
                      </span>
                    </div>

                    <div className="section-header-right">
                      <i className="fas fa-download" onClick={() => exportAllHandler(sectionList.id)} style={{ marginTop: "2px", fontSize: "15px", marginRight: "3px", color: "#4183c4" }}></i>
                      <span className="section-header-length" style={{ marginRight: "10px", width: "auto", marginLeft: "10px" }}>{sectionList.duration}</span>


                    </div>

                  </div>
                  <div id={"collapsetwo" + index + 1} class="accordion-collapse collapse" aria-labelledby="collapsetwo" data-bs-parent="#accordionExample">
                    {sectionList.lesson.map((lessonlist, index) => (
                      <div className="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ">
                        <div className="lecture-container video-lecture">
                          <div className="left-content">
                            <i className="uil uil-file icon_142"></i>
                            <div className="top">
                              <div className="title">{lessonlist.title}</div>
                            </div>
                          </div>
                          <div className="details" >
                            {
                              lessonlist.lesson_type === 'Video_file' ? <a className="content-summary" onClick={() => Lessonpreview(lessonlist.video_url, lessonlist.title, lessonlist.id)}
                                style={{ 'cursor': 'pointer', position: "relative", zIndex: "2" }} title='preview for video file'>
                                {/* <i className="fas fa-download" style={{marginTop:"5px",color: "#4183c4",marginRight: "-65px"}} onClick={()=>exportHandler(lessonlist.id,lessonlist.course_id)}></i> */}

                                <i class="fas fa-play-circle" style={{ fontSize: '25px', color: '#9b3d35' }}></i>
                              </a> : <>
                                <span style={{ fontSize: '23px', color: '#9b3d35', position: "relative", float: "right" }}><i className="fas fa-file-download" onClick={() => exportHandler(lessonlist.id, lessonlist.course_id)}></i></span>

                                {/* <i className="fas fa-download" onClick={()=>exportHandler(lessonlist.id)} style={{marginTop:"5px",fontSize:"15px",color: "#4183c4"}}></i> */}
                              </>
                            }


                          </div>


                          <div className="details" style={{ width: "auto", marginLeft: "10px" }}>
                            <span className="content-summary" style={{ marginRight: "10px", marginTop: "3px" }}>{lessonlist.duration}</span>
                          </div>


                        </div>
                      </div>

                    ))}
                  </div>
                </div>
              </div>

            ))}


          </div>
        </div>
      </div>

      <br></br>
      <br></br>

      <div className="sa4d25" id="instructorstyle">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">


              <div className="setting_tabs">
                <CTabs activeTab="account">
                  <div className=" nav-pills mb-4">
                    <CNav>
                      <CNavItem>
                        <CNavLink data-tab="account">
                          <span>Course content</span>
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink data-tab="notification">
                          <span>Overview</span>
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink data-tab="privacy">
                          <span>Notes</span>
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink data-tab="closeaccount">
                          <span>announcements</span>
                        </CNavLink>
                      </CNavItem>
                    </CNav>
                  </div>

                  <div class="tab-content" id="pills-tabContent">
                    <CTabContent>
                      <CTabPane data-tab="account">
                        {/* <ContentTab id={tempSection.course_id} sectionId={tempSection.id} /> */}
                        <div className="crse_content">
                          <h3>Course content</h3>
                          <div className="_112456">
                            <ul className="accordion-expand-holder">
                              {/* <li>
                              <span className="accordion-expand-all _d1452">Expand all</span>
                            </li>
                            <li>
                              <span className="_fgr123"> 200 lectures</span>
                            </li>
                            <li>
                              <span className="_fgr123">47:06:29</span>
                            </li> */}
                            </ul>
                          </div>
                          {section.map((sectionList, index) => (
                            <div key={index}>
                              <div id="accordionone" className="ui-accordion ui-widget ui-helper-reset" data-bs-toggle="collapse" data-bs-target={"#collapseone" + index + 1} aria-expanded="true" aria-controls="collapseone">

                                <div

                                  className="accordion-header ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all"
                                >
                                  <div className="section-header-left" >
                                    <span className="section-title-wrapper" >
                                      <i className="uil ui l-presentation-play crse_icon"></i>
                                      <span className="section-title-text">{sectionList.title}</span>
                                    </span>
                                  </div>

                                  <div className="section-header-right">
                                    <i className="fas fa-download" onClick={() => exportAllHandler(sectionList.id)} style={{ marginTop: "2px", fontSize: "15px", color: "#4183c4", }}></i>
                                    <span className="section-header-length" style={{ marginRight: "15px", width: "auto", marginLeft: "10px" }}>{sectionList.duration}</span>
                                  </div>

                                </div>
                                <div id={"collapseone" + index + 1} class="accordion-collapse collapse" aria-labelledby="collapseone" data-bs-parent="#accordionExample">
                                  {sectionList.lesson.map((lessonlist, index) => (
                                    <div className="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom">
                                      <div className="lecture-container">
                                        <div className="left-content">
                                          <i className="uil uil-file icon_142"></i>
                                          <div className="top">
                                            <div className="title">{lessonlist.title}</div>
                                          </div>
                                        </div>
                                        <div className="details">



                                        </div>

                                        <div className="details">


                                          {
                                            lessonlist.lesson_type === 'Video_file' ? <a className="content-summary" onClick={() => Lessonpreview(lessonlist.video_url, lessonlist.title, lessonlist.id)} style={{ 'cursor': 'pointer', position: "relative", zIndex: "2" }} title='preview for video file'>
                                              {/* <i className="fas fa-download" style={{marginTop:"5px",color: "#4183c4",marginRight:"-287px",}} onClick={()=>exportHandler(lessonlist.id,lessonlist.course_id)}></i> */}

                                              <i class="fas fa-play-circle" style={{ fontSize: '25px', color: '#9b3d35' }}></i>
                                            </a> : <>
                                              <span style={{ marginRight: "0px", fontSize: '23px', color: '#9b3d35', position: "relative", float: "right" }}><i className="fas fa-file-download" onClick={() => exportHandler(lessonlist.id, lessonlist.course_id)}></i></span>
                                            </>
                                          }
                                          <span className="content-summary" style={{
                                            marginRight: "16px", marginTop: "5px",
                                            width: "auto", marginLeft: "10px"

                                          }}>{lessonlist.duration}</span>
                                        </div>

                                      </div>
                                    </div>
                                    //     <Link className="btn1458" to="#">
                                    //       20 More Sections
                                    // </Link>
                                  ))}
                                </div>
                              </div>
                            </div>

                          ))}
                        </div>









                      </CTabPane>

                      {/* new section start */}





                      <CTabPane data-tab="notification">
                        {/* <Notificationtab /> */}
                      </CTabPane>
                      <CTabPane data-tab="privacy">

                        <CModal show={visible} onDismiss={() => setVisible(false)}>
                          <div className='p-3' closeButton> <h3>Add notes</h3></div>
                          <hr className='hr hr-success'></hr>
                          <CModalBody>
                            <div class="view_info10">
                              <div class="row">
                                <div class="col-lg-12 col-md-12">
                                  <div class="ui search focus mt-30 lbel25">
                                    <label>Notes title*</label>
                                    <div class="ui left icon input swdh19">
                                      <input class="prompt srch_explore" type="text" placeholder="Insert notes title." name="coursetitle" data-purpose="edit-course-title" maxlength="60" id="Content[title]"
                                        type="text"
                                        name="title"
                                        onChange={change}
                                      />

                                    </div>

                                  </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                  <div class="ui search focus mt-30 lbel25">
                                    <label>Notes content*</label>
                                    <div >
                                      <CKEditor
                                        name="notes"
                                        value={userNotes.notes}
                                        required
                                        type="text"
                                        editor={ClassicEditor}
                                        data=""
                                        style={{ width: "100px" }}
                                        onReady={editor => {
                                          // You can store the "editor" and use when it is needed.
                                        }}
                                        onChange={(event, editor) => {
                                          const data = editor.getData();
                                          setUserNotes((prev) => {
                                            return {
                                              ...prev,
                                              notes: data
                                            }
                                          })
                                        }}
                                      />

                                    </div>

                                  </div>
                                </div>

                              </div>
                            </div>
                          </CModalBody>
                          <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)}>
                              Close
                            </CButton>
                            <CButton color="primary" onClick={submitNotes}>Save changes</CButton>
                          </CModalFooter>
                        </CModal>
                        <div class='section' >
                          <div class="tab-from-content">
                            <div className='d-flex justify-content-center'>
                              <CButton className='p-2 ' onClick={() => setVisible(!visible)} style={{ backgroundColor: '#9b3d35', color: 'white' }}>
                                create notes at {duration}
                              </CButton>
                            </div>
                            <div class="title-icon">
                              <h3 class="title"><i class="uil uil-film"></i>Notes</h3>
                            </div>


                          </div>
                          <div className="table-responsive mt-30">
                            <table className="table ucp-table">
                              <thead className="thead-s">
                                <tr>
                                  <th className="text-center" scope="col">
                                    No.
                                  </th>
                                  <th className="cell-ta" scope="col">
                                    Title
                                  </th>
                                  <th className="cell-ta" scope="col">
                                    Notes
                                  </th>
                                  <th className="cell-ta" scope="col">
                                    Duration
                                  </th>

                                  <th className="text-center" scope="col">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  notesList.map((cv, i) => {
                                    return (<>
                                      <tr>
                                        <td className="text-center">{i + 1}</td>
                                        <td className="text-center">{cv.notes}</td>
                                        <td className="text-center">{cv.duration}</td>

                                        <td className="text-center">
                                          {cv.Purchase_Date}
                                        </td>


                                        <td className="text-center" >

                                          View

                                        </td>
                                      </tr>

                                    </>)
                                  })
                                }
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </CTabPane>
                      <CTabPane data-tab="closeaccount">
                        {/* <CloseAccountTab /> */}
                      </CTabPane>
                    </CTabContent>

                  </div>
                </CTabs>

              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="btn btn-primary btn-set" id="courseopen" onClick={CourseContentTabOpen}><i class="fa fa-arrow-left left-icon" aria-hidden="true"></i></button>
        </div>
      </div>

    </>
  )
}

export default Header;