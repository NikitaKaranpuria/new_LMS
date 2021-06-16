import React, { useState ,useEffect,useRef} from "react";
import "../student/studentstyle.css";
import coverimage from "../../images/courses/add_img.jpg";
import { useForm ,useFieldArray} from "react-hook-form";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import BaseUrl from "../BaseUrl/BaseUrl";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {CModalFooter,
  CTooltip ,
  CButton,
  CModal,
  CModalBody,
  CModalHeader
} from '@coreui/react';
import editvalidations from "./Lessoneditvalidation";
import CIcon from '@coreui/icons-react';
import { useParams } from "react-router-dom";
function InstructorLessonEdit(params) {
  const [lessonError,setLessonError]=useState({})
    const [sectionerror, SetSectioError] = useState("")
    const [filePreviw,setFilePreivew]=useState('')
    const [imges,Setimages]=useState('');

    const[lessonVideo,setLessonVideo]=useState('')
    const [volume,setVolume]=useState(0)
    const [metadata, setMetadata] = useState({
      duration: 0
    });
    const [SectionTitle, SetSectionTitle] = useState({
      title: "",
      sortorder: 1,
      course_id: localStorage.getItem('courseId'),
    })
    const LessonFilecanclefileupload=useRef(null)
    const editid = useParams();
  let histrory = useHistory()
    const [pptturl,SetPPTturl]=useState()
    const [uploadvideocomplate,Setuploadvideocomplate]=useState(false)
    const canclefileupload=useRef(null)
    const [videoUploadbar,SetvideoUploadbar]=useState()
    const [uploadcomplate,setuploadCoursecomplte]=useState(false)
    const [SectionData, SetSectionData] = useState([])
    const meterialuploadcancle=useRef(null)
    const [Lesson_Type_Option, SetLessonTypeOption] = useState({
      lesson_type: ""
    })
    const [LessonDetail,setLessondata]=useState({
      title:'',
      summary:'',
      lesson_type:'',
      course_id:'',
      section_id:''
    })
    const [uploaPDF,SetUpladPDF]=useState()
    const [meterialuploadbar,Setmeterialuploadbar]=useState()
    const [materialArray,SetmaterialArray]=useState([])
    const [materialError, SetmaterialError] = useState("")
    const [meterialpreview,SetMeterialpreview]=useState([])
    const [lessonvideomp4, setlessonvideomp4] = useState({
      mp4_url: ""
    })
    const [pffppturl,SetPfPpturl]=useState()
    const [pdfuploadbar,Setpdfuploadbar]=useState()
    const [material,Setmaterial]=useState()
    const [LessonVideoError, SetLessonVideoError] = useState("")
    const [youtuveUrl, SetYoutubeurl] = useState({
      youtube_url: ""
    })
    const [vimeovideo, SetVimeovideo] = useState({
      vimeo_url: ""
    })
    const [PPTuploadbar,SetPPtuploadbar]=useState()
    const [uploaPPT,SetUpladPPT]=useState()
    const [videoduration, Setvimeoduration] = useState()
    const [lessonEdtData,setLessoneditdata]=useState([])
    const [videoVideocheck, SetvideoVideocheck] = useState(false)
    const onlessonchange = (e) => {
    
    
        SetPPTturl ()
        SetPfPpturl()
        setlessonvideomp4({
          mp4_url:''
        })
        SetVimeovideo({
          vimeo_url:''
        })
        SetYoutubeurl({
          youtube_url:''
        })
        SetLessonTypeOption({
          lesson_type:''
        })
        
       
    
    
        SetvideoVideocheck(false)
        const { name, value } = e.target
        SetLessonTypeOption((prev) => {
          return {
            ...prev,
            [name]: value
          }
        })
      }
      useEffect(() => {
        if (!localStorage.getItem("LMS_Token")) {
            histrory.push(`/login`)
        }
        GetLessonData()
        GetSectionData()
      }, [])
    
      const GetLessonData = async () => {
        await axios.get(`${BaseUrl}forentend/lesson/${editid.id}`, {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
            "auth": localStorage.getItem("LMS_Token")
          },
        }).then(function (response) {
      
            setLessondata(response.data)
            SetLessonTypeOption({lesson_type:response.data.lesson_type})
            SetmaterialArray(response.data.meterial_url)
            setFilePreivew(response.data.video_url)
        });
      }
      const OnPdfChange=async(e)=>{
        SetUpladPDF(e.target.files[0])
      const PDFformdata=new FormData()
      
          
      PDFformdata.append('course_vido',e.target.files[0], e.target.files[0].name.split(" ").join(""))
      await axios.post(`${BaseUrl}uplodevideo`, PDFformdata, {
        headers: {
          'content-type': 'multipart/form-data',
          "auth": localStorage.getItem("LMS_Token")
        },
        onUploadProgress: progressEvent => {
          //Set the progress value to show the progress bar
    
          let persentge= Math.round( (progressEvent.loaded * 100) / progressEvent.total )
          if(persentge<100)
          {
            Setpdfuploadbar(persentge)
          }
        },
      }).then((response) => {
        SetPfPpturl(response.data.video_url)
        Setpdfuploadbar(100);
       
        setTimeout(() => {
          Setpdfuploadbar(0);
        }, 1000);
    
      }).catch((error) => {
        // console.log(error);
      });
    
      
    
      }
      const LessonvideoURL = (e) => {
        const { name, value } = e.target
        setlessonvideomp4((prev) => {
          return {
            ...prev,
            [name]: value
          }
        })
    
      }
      const OnMeterilChange=async(e)=>{
        try {
          SetmaterialError('')
          if (e.target.files[0].size > 10485760) {
            SetmaterialError("Meterial size is above 10Mb")
        
          
          }
          else{
            Setmeterialuploadbar(0)
            Setmaterial(e.target.files[0])
            
            const Meterialformdata=new FormData()
          
              
            Meterialformdata.append('course_vido',e.target.files[0], e.target.files[0].name.split(" ").join(""))
            await axios.post(`${BaseUrl}uplodevideo`, Meterialformdata, {
              headers: {
                'content-type': 'multipart/form-data',
                "auth": localStorage.getItem("LMS_Token")
              },
              onUploadProgress: progressEvent => {
                //Set the progress value to show the progress bar
          
                let persentge= Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                if(persentge<100)
                {
                  Setmeterialuploadbar(persentge)
                }
              },
              cancelToken:new axios.CancelToken(cancle=>meterialuploadcancle.current=cancle)
            }).then((response) => {
              SetmaterialArray((prev)=>[...prev,response.data.video_url])
              SetMeterialpreview((prev)=>[...prev,response.data.video_url])
              Setmeterialuploadbar(100);
          
              setTimeout(() => {
                Setmeterialuploadbar(0);
              }, 1000);
          
            }).catch((error) => {
              // console.log(error);
            });
            }
          
        } catch (error) {
          // console.log(error)
        }
      }
       //cancle upload file request
     const LessonCancleFileUpladReaquest=()=>{
      if(LessonFilecanclefileupload.current){
        LessonFilecanclefileupload.current('User has cancel the file upload')
      }
    }
    const onchangeYoutubevideo = (e) => {
      const { name, value } = e.target
      SetYoutubeurl((prev) => {
        return {
          ...prev,
          [name]: value
        }
      })
    }
    const LessonValeEdit=async(lessionId)=>{
      if(Object.keys(editvalidations(LessonDetail)).length  >0){
        setLessonError(editvalidations(LessonDetail))
      }
    
      if(Object.keys(editvalidations(LessonDetail)).length  ===0){
      const LessonAddData = new FormData();
    LessonAddData.append('meterial_url', materialArray.toString())
    if (lessonVideo) {
      LessonAddData.append('video_url',lessonVideo)
    
    
    }
  if(pffppturl){
    LessonAddData.append('video_url', pffppturl.split(" ").join(""))
   
  }
  if(pptturl){
    LessonAddData.append('video_url', pptturl.split(" ").join(""))
    
  }
 
    if (lessonvideomp4.mp4_url) {
      LessonAddData.append('video_url', lessonvideomp4.mp4_url)
   
    }
    if (vimeovideo.vimeo_url) {
      LessonAddData.append('video_url', vimeovideo.vimeo_url)
    
    }
    if (youtuveUrl.youtube_url) {
      LessonAddData.append('video_url', youtuveUrl.youtube_url)
      

    }
    if(metadata.duration){
      LessonAddData.append("duration", new Date(metadata.duration * 1000).toISOString().substr(11, 8))
    }
    else if(videoduration)
    {
      LessonAddData.append("duration", new Date(videoduration * 1000).toISOString().substr(11, 8))
    }
    else{
      LessonAddData.append("duration", '00:00:00');
    }
    
    LessonAddData.append("order", 1);
    LessonAddData.append("id_group", 1);
    LessonAddData.append("course_id", LessonDetail.course_id);
    LessonAddData.append("summary", LessonDetail.summary); 
    LessonAddData.append("lesson_type", Lesson_Type_Option.lesson_type); 
    LessonAddData.append("title", LessonDetail.title); 
    LessonAddData.append("section_id", LessonDetail.section_id); 
        await axios.put(`${BaseUrl}forentend/lessonupdate/${lessionId}`, LessonAddData, {
            headers: {
              "auth": localStorage.getItem("LMS_Token")
            },
          }).then((res) => {
            confirmAlert({
  
                customUI: ({ onClose }) => {
                  return (
                    <CModal
                      show={true}
                      centered={true}
                      onClose={onClose}
                    >
                         <div className='p-3' closeButton> <h3>{window.location.host} Says</h3></div>
                          <hr className='hr hr-success'></hr>
                      <CModalBody>
              <h4>Lesson updated successfully</h4>
                      </CModalBody>
                      <CModalFooter>
            
                        <CButton
                         style={{backgroundColor:'rgb(155, 61, 53)',color:'white'}}
                         className='btn'
                          onClick={onClose}
                        >Ok</CButton>
                      </CModalFooter>
                    </CModal>
            
                  );
               
                }
             
              });
              histrory.goBack()
          }).catch((err) => {
            // console.log(err)
          })

    }}
    const vimeovideourl = async (e) => {
      const { name, value } = e.target
      SetVimeovideo((prev) => {
        return {
          ...prev,
          [name]: value
        }
      })
    
    
      try {
    
        const vimeoid = e.target.value.substr(31);
        await axios.get(`https://vimeo.com/api/v2/video/${vimeoid}.json`).then(function (response) {
          Setvimeoduration(response.data[0].duration);
        });
        SetvideoVideocheck(true)
      } catch (error) {
    
      }
    }
    const lessonchnage=(e)=>
    {
      setLessonError((prev) => {
        return {
          ...prev,
          [name]:''
        }
      })
      const { name, value } = e.target
      setLessondata((prev) => {
        return {
          ...prev,
          [name]: value
        }
      })
    
    }
      const change=(e)=>{
        const { name, value } = e.target
        SetSectionTitle((prev) => {
          return {
            ...prev,
            [name]: value
          }
        })
    
      }
      const onPPTchange=async(e)=>{
        SetUpladPPT(e.target.files[0])
        const PPTformdata=new FormData()
          
              
        PPTformdata.append('course_vido',e.target.files[0], e.target.files[0].name.split(" ").join(""))
          await axios.post(`${BaseUrl}uplodevideo`, PPTformdata, {
            headers: {
              'content-type': 'multipart/form-data',
              "auth": localStorage.getItem("LMS_Token")
            },
            onUploadProgress: progressEvent => {
              //Set the progress value to show the progress bar
              let persentge= Math.round( (progressEvent.loaded * 100) / progressEvent.total )
        if(persentge<100)
        {
          SetPPtuploadbar(persentge)
        }
           
            },
          }).then((response) => {
            SetPPTturl(response.data.video_url)
            SetPPtuploadbar(100);
        
            setTimeout(() => {
              SetPPtuploadbar(0);
            }, 1000);
          
        
          }).catch((error) => {
            // console.log(error);
          });
        
          
        
          }
         
      const PDF_delete=async(document_url)=>{
        setFilePreivew('')
        const delete_document_url={
          'video_url':document_url
        }
        Setpdfuploadbar(0)
        SetPfPpturl('')
         await axios.post(`${BaseUrl}removevideo`,delete_document_url, {
           headers: {
             "auth": localStorage.getItem("LMS_Token")
           }
        
         })
          }
           const PPT_delete=async(ppt_url)=>{
             setFilePreivew('')
             const delete_document_url={
               'video_url':ppt_url
             }
             SetPPtuploadbar(0)
             SetPPTturl('')
              await axios.post(`${BaseUrl}removevideo`,delete_document_url, {
                headers: {
                  "auth": localStorage.getItem("LMS_Token")
                }
            
              })
           }
    
      const GetSectionData = async () => {
        await axios.get(`${BaseUrl}forentend/section/all/${localStorage.getItem("courseId")}`, {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
            "auth": localStorage.getItem("LMS_Token")
          },
        }).then(function (response) {
          SetSectionData(response.data);
        });
      }
      const Lessonfile=async(e)=>{
    
        setVolume(e.target.files[0].size)
        try {
        
          SetvideoUploadbar(0)
          if (e.target.files[0].size > 267386880) {
            SetLessonVideoError("Video size is above 250Mb")
          }
          else {
            
            const uploadvideo=new FormData()
        
            
            uploadvideo.append('course_vido',e.target.files[0], e.target.files[0].name.split(" ").join(""))
        
        
          await axios.post(`${BaseUrl}uplodevideo`, uploadvideo, {
            headers: {
              'content-type': 'multipart/form-data',
              "auth": localStorage.getItem("LMS_Token")
            },
            onUploadProgress: progressEvent => {
            //Set the progress value to show the progress bar
            let persentge= Math.round( (progressEvent.loaded * 100) / progressEvent.total )
            if(persentge<100)
            {
              SetvideoUploadbar(persentge)
            }
             },
             cancelToken: new axios.CancelToken( cancel => LessonFilecanclefileupload.current  =cancel )   
          }).then((response) => {
            SetvideoUploadbar(100);
            setuploadCoursecomplte(!uploadcomplate)
            Setuploadvideocomplate(!uploadvideocomplate)
              setTimeout(() => {
                SetvideoUploadbar(0);
              }, 1000);
              setLessonVideo(response.data.video_url) 
              e.target.value = null;
      
          }).catch((error) => {
            if(LessonFilecanclefileupload.current){
            //  console.log('User has cancel request')
            }
            SetvideoUploadbar(0);
          });
        }
            
            
        
         } catch (error) {
          //  console.log('can not upoad file')
         }
      
        }
       
        const MaterialRequestCancle=()=>{
          if(meterialuploadcancle.current){
            meterialuploadcancle.current('Material upload request is cancel');
            Setmeterialuploadbar(0)
          }
        }
        const deletemeterial=async(metrial_url,index)=>{
          const delete_mererial_url={
            'video_url':metrial_url
          }
          materialArray.splice(index,1)
          const items = materialArray.filter(item => item !== index)
          SetmaterialArray(items)
       
           await axios.post(`${BaseUrl}removevideo`,delete_mererial_url, {
             headers: {
               "auth": localStorage.getItem("LMS_Token")
             }
       
           })
         }
        
         const addSection=async()=>{
           
            if (SectionTitle.title === "") {
              SetSectioError("Title is required")
            }
        
            else {
              await axios.post(`${BaseUrl}section`, SectionTitle, {
                headers: {
                  "auth": localStorage.getItem("LMS_Token")
                },
              }).then((responce) => {
                GetSectionData()
        
              }).catch((error) => {
                // console.log("error", error);
              })
            }
          }
          const UploadileComponent=()=>{
            if (Lesson_Type_Option.lesson_type === "YouTube_Video") {
              return (
                <>
                <div class="col-lg-6 col-md-6">
                <div class="ui search focus mt-30 lbel25">
                            <label>Youtube URL*</label>
                            <div class="ui left icon input swdh19">
                              <input class="prompt srch_explore" type="text" placeholder="Enter youtube URL." name="youtube_url" value={youtuveUrl.youtube_url?youtuveUrl.youtube_url:filePreviw} onChange={onchangeYoutubevideo} data-purpose="edit-course-title" maxlength="60" id="lecture[title]" 
                                
                              />															
                            </div>
                          </div>
                          { (<><iframe src={youtuveUrl.youtube_url?youtuveUrl.youtube_url:filePreviw}  className='mt-2' width="100%" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe> </>)}
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="part_input mt-30 lbel25">
                            <label>Material*</label>
                            <div class="input-group">
                              <div class="custom-file">
                                <input type="file" class="custom-file-input" id="inputGroupFile06"  onChange={OnMeterilChange} accept="application/pdf,application/msword,
          application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
                                <label class="custom-file-label" for="inputGroupFile06">{material?material.name:'No Choose file - (Pdf, Video)'} </label>
                              </div>
                              
                            </div>
                            
                          </div>
                          <br></br>
                          {meterialuploadbar >1?<div className="d-flex justify-content-end mt-6 mr-2"><CTooltip content="Cancel uploading">
          <CButton onClick={MaterialRequestCancle} color="primary" variant="outline" >X
              </CButton></CTooltip></div>:''}
            <p className="error_message animate__animated animate__headShake" >{materialError}</p>  
                   <p className="videouplpad" >{meterialuploadbar?`File is uploading ${meterialuploadbar} %`:""}</p>
                   {
          materialArray.map((cv,i)=>{
            return <div className="d-flex" key={i}><p className="p-2 w-100 ">{i+1}{"."}  {" "}<a href={cv}target='_blank'>{cv.slice(57,)}</a> </p>  <CButton color="danger" onClick={()=>deletemeterial(cv,i)} className="p-2 flex-shrink-2   border-0" variant="outline" shape="square" size="sm" > <CIcon size={'sm'} name={'cilTrash'} /></CButton></div>
          })
        }
                        </div>
                        
                        
                </>
              )
            }
            if (Lesson_Type_Option.lesson_type === "Vimeo_Video") {
              return (
                <>
                <div class="col-lg-6 col-md-6">
                <div class="ui search focus mt-30 lbel25">
                            <label>Vimeo URL*</label>
                            <div class="ui left icon input swdh19">
                              <input class="prompt srch_explore"placeholder="Enter vimoe video URL." onChange={vimeovideourl} name="vimeo_url" value={vimeovideo.vimeo_url?vimeovideo.vimeo_url:filePreviw} data-purpose="edit-course-title" maxlength="60" id="lecture[title]" 
                                
                              />															
                            </div>
                          </div>
                          {(<><iframe src={vimeovideo.vimeo_url?vimeovideo.vimeo_url:filePreviw} width="420" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>   
                                       </>  )}
                          
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="part_input mt-30 lbel25">
                            <label>Material*</label>
                            <div class="input-group">
                              <div class="custom-file">
                                <input type="file" class="custom-file-input" id="inputGroupFile06"  onChange={OnMeterilChange} accept="application/pdf,application/msword,
          application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
                                <label class="custom-file-label" for="inputGroupFile06">{material?material.name:'No Choose file - (Pdf, Video)'} </label>
                              </div>
                              
                            </div>
                            
                          </div>
                          <br></br>
                          {meterialuploadbar >1?<div className="d-flex justify-content-end mt-6 mr-2"><CTooltip content="Cancel uploading">
          <CButton onClick={MaterialRequestCancle} color="primary" variant="outline" >X
              </CButton></CTooltip></div>:''}
            <p className="error_message animate__animated animate__headShake" >{materialError}</p>  
                   <p className="videouplpad" >{meterialuploadbar?`File is uploading ${meterialuploadbar} %`:""}</p>
                   {
          materialArray.map((cv,i)=>{
            return <div className="d-flex" key={i}><p className="p-2 w-100 ">{i+1}{"."}  {" "}<a href={cv}target='_blank'>{cv.slice(57,)}</a> </p>  <CButton color="danger" onClick={()=>deletemeterial(cv,i)} className="p-2 flex-shrink-2   border-0" variant="outline" shape="square" size="sm" > <CIcon size={'sm'} name={'cilTrash'} /></CButton></div>
          })
        }
                        </div>
                        
                        
                </>
              )
            }
            if (Lesson_Type_Option.lesson_type === "PPT") {
              return (
                <>
                  <div class="col-lg-6 col-md-6">
                          <div class="part_input mt-30 lbel25">
                            <label>PPT*</label>
                            <div class="input-group">
                              <div class="custom-file">
                                <input type="file" class="custom-file-input" id="inputGroupFile06"name="pdf" onChange={onPPTchange} accept="application/vnd.ms-powerpoint"/>
                                <label class="custom-file-label" for="inputGroupFile06">{pptturl?pptturl.slice(57,):filePreviw.slice(57,)}</label>
                              </div>
                            </div>
                          </div>
                          <p className="videouplpad mt-2" >{PPTuploadbar?`File is uploading ${PPTuploadbar} %`:""}</p>
        
        <p className="videouplpad" >{pdfuploadbar?`File is uploading ${pdfuploadbar} %`:""}</p>
        <div className="d-flex"><p className="p-2 w-100 mt-2 ml-4"><a href={pptturl?pptturl:filePreviw} target='_blank'>{pptturl?pptturl.slice(57,):filePreviw.slice(57,)}</a></p>  <CButton color="danger" onClick={()=>PPT_delete(pptturl?pptturl:filePreviw)} variant="outline" className="p-2 flex-shrink-2   border-0" shape="square" size="sm" > <CIcon size={'sm'} name={'cilTrash'} /></CButton></div>
        
                        </div>
                      
                        
                        <div class="col-lg-6 col-md-6">
                          <div class="part_input mt-30 lbel25">
                            <label>Material*</label>
                            <div class="input-group">
                              <div class="custom-file">
                                <input type="file" class="custom-file-input" id="inputGroupFile06"  onChange={OnMeterilChange} accept="application/pdf,application/msword,
          application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
                                <label class="custom-file-label" for="inputGroupFile06">{material?material.name:'No Choose file - (Pdf, Video)'} </label>
                              </div>
                              
                            </div>
                            
                          </div>
                          <br></br>
                          {meterialuploadbar >1?<div className="d-flex justify-content-end mt-6 mr-2"><CTooltip content="Cancel uploading">
          <CButton onClick={MaterialRequestCancle} color="primary" variant="outline" >X
              </CButton></CTooltip></div>:''}
            <p className="error_message animate__animated animate__headShake" >{materialError}</p>  
                   <p className="videouplpad" >{meterialuploadbar?`File is uploading ${meterialuploadbar} %`:""}</p>
                   {
          materialArray.map((cv,i)=>{
            return <div className="d-flex" key={i}><p className="p-2 w-100 ">{i+1}{"."}  {" "}<a href={cv}target='_blank'>{cv.slice(57,)}</a> </p>  <CButton color="danger" onClick={()=>deletemeterial(cv,i)} className="p-2 flex-shrink-2   border-0" variant="outline" shape="square" size="sm" > <CIcon size={'sm'} name={'cilTrash'} /></CButton></div>
          })
        }
                        </div>
                        
                </>
              )
            }
            if (Lesson_Type_Option.lesson_type === "PDF") {
              return (
                <>
                  <div class="col-lg-6 col-md-6">
                          <div class="part_input mt-30 lbel25">
                            <label>PDF*</label>
                            <div class="input-group">
                              <div class="custom-file">
                                <input type="file" class="custom-file-input" id="inputGroupFile06" name="pdf" onChange={OnPdfChange} accept="application/pdf"/>
                                <label class="custom-file-label" for="inputGroupFile06">{pffppturl?pffppturl.slice(57,):filePreviw.slice(57,)} </label>
                              </div>
                            </div>
                          </div>
                          <p className="videouplpad" >{pdfuploadbar?`File is uploading ${pdfuploadbar} %`:""}</p>
        <div className="d-flex"><p className="p-2 w-100 mt-2 ml-2 "><a href={pffppturl?pffppturl:filePreviw} target='_blank'>{pffppturl?pffppturl.slice(57,):filePreviw.slice(57,)}</a></p>  <CButton color="danger" className="p-2 flex-shrink-2   border-0"  onClick={()=>PDF_delete(pffppturl?pffppturl:filePreviw)} variant="outline"  shape="square" size="sm" > <CIcon size={'sm'} name={'cilTrash'} /></CButton></div>

                        </div>
                      
                       
                        <div class="col-lg-6 col-md-6">
                          <div class="part_input mt-30 lbel25">
                            <label>Material*</label>
                            <div class="input-group">
                              <div class="custom-file">
                                <input type="file" class="custom-file-input" id="inputGroupFile06"  onChange={OnMeterilChange} accept="application/pdf,application/msword,
          application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint"/>
                                <label class="custom-file-label" for="inputGroupFile06">{material?material.name:'No Choose file - (Pdf, Video)'} </label>
                              </div>
                              
                            </div>
                            
                          </div>
                          <br></br>
                          {meterialuploadbar >1?<div className="d-flex justify-content-end mt-6 mr-2"><CTooltip content="Cancel uploading">
          <CButton onClick={MaterialRequestCancle} color="primary" variant="outline" >X
              </CButton></CTooltip></div>:''}
            <p className="error_message animate__animated animate__headShake" >{materialError}</p>  
                   <p className="videouplpad" >{meterialuploadbar?`File is uploading ${meterialuploadbar} %`:""}</p>
                   {
          materialArray.map((cv,i)=>{
            return <div className="d-flex" key={i}><p className="p-2 w-100 ">{i+1}{"."}  {" "}<a href={cv}target='_blank'>{cv.slice(57,)}</a> </p>  <CButton color="danger" onClick={()=>deletemeterial(cv,i)} className="p-2 flex-shrink-2   border-0" variant="outline" shape="square" size="sm" > <CIcon size={'sm'} name={'cilTrash'} /></CButton></div>
          })
        }
                        </div>
                        
                </>
              )
            }
           
            else{
              return ""
            }
           
          }
          const removeUpload=async(Remove_Uploaded_vieo)=>{
            const removevideourl=Remove_Uploaded_vieo
            setFilePreivew('')
            setLessonVideo('')
            const delete_uploaded_video={
              'video_url':removevideourl
            }
            await axios.post(`${BaseUrl}removevideo`,delete_uploaded_video, {
              headers: {
                "auth": localStorage.getItem("LMS_Token")
              }
           
            })
          
            
          
          }
          
return(<>
<div class='section p-4'> 
    <div class="tab-from-content">
      <div class="title-icon">
        <h3 class="title"><i class="uil uil-film"></i>Lesson Content</h3>
      </div>
      <div class="course__form">
        <div class="row">
          <div class="col-lg-12">		
            <div class="extra_info">		
              <h4 class="part__title">Edit Lesson  Content</h4>
            </div>
            <div class="view_info10">
              <div class="row">
                <div class="col-lg-12 col-md-12">															
                  <div class="ui search focus mt-30 lbel25">
                    <label>Course Content Title*</label>
                    <div class="ui left icon input swdh19">
                      <input class="prompt srch_explore" type="text" placeholder="Insert your course content title." name="coursetitle" data-purpose="edit-course-title" maxlength="60" id="Content[title]" 
                       type="text"
                       name="title"
                    
                       value={SectionTitle.title}
                       onChange={change}
                      />		
                       <button class="badge_mb border-0" onClick={addSection}>Add</button>													
                    </div>
                    <p className="errorMsg animate__animated animate__headShake"> {sectionerror}</p>
                  </div>	
                							
                </div>
                <div class="col-lg-12 col-md-12">	
                  <div class="lecture_title">
                    <h4>Edit Lecture</h4>
                  </div>
                </div>
                <div class="col-lg-4 col-md-12">															
                  <div class="ui search focus mt-30 lbel25">
                    <label>Lecture Title*</label>
                    <div class="ui left icon input swdh19">
                      <input class="prompt srch_explore" type="text" placeholder="Insert your lecture title." name="title" value={LessonDetail.title} onChange={lessonchnage} data-purpose="edit-course-title" maxlength="60" id="lecture[title]" 
                        
                      />															
                    </div>
                    {
                      lessonError.title && (<p className='text-danger'>{lessonError.title }</p>)
                    }
                  </div>									
                </div>
                <div class="col-lg-4 col-md-6">	
                  <div class="ui search focus mt-30 lbel25">
                    <label>Section*</label>
                    <div class="ui left icon input swdh19">
                     <select class="ui hj145 dropdown cntry152 prompt srch_explore" onChange={lessonchnage} name='section_id' value={LessonDetail.section_id} >
                     <option  value={''}>please select</option>
                     {
                                      SectionData.map((cv, i) => <option key={i} value={cv.id}>{cv.title}</option>)
                                    }
                            </select>															
                    </div>
                    {
                      lessonError.section_id && (<p className='text-danger'>{lessonError.section_id }</p>)
                    }
                  </div>										
                            
                            
                </div>
                <div class="col-lg-4 col-md-6">	
                  <div class="ui search focus mt-30 lbel25">
                    <label>Lesson type*</label>
                    <div class="ui left icon input swdh19">
                     <select class="ui hj145 dropdown cntry152 prompt srch_explore" name='lesson_type'  value={Lesson_Type_Option.lesson_type} onChange={onlessonchange}>
                     <option value="0">please select</option>
                                    <option value="YouTube_Video">YouTube Video</option>
                                    <option value="Video_url[.mp4]">Video url [ .mp4 ]</option>
                                    <option value="Vimeo_Video">Vimeo Video</option>
                                    <option value="Video_file">Video file</option>
                                    <option value="PDF">PDF</option>
                                    <option value="PPT">PPT</option>
                            </select>															
                    </div>
                  </div>										
                            
                            
                </div>
               { Lesson_Type_Option.lesson_type === "Video_file"?
      
        <>
          <div class="col-lg-6 col-md-6">
                  <div class="part_input mt-30 lbel25">
                    <label>Video file*</label>
                    <div class="input-group">
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile06" onChange={Lessonfile}/>
                        <label class="custom-file-label" for="inputGroupFile06">{lessonVideo.name?lessonVideo.name:filePreviw.slice(57,)}</label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mt-2 mr-2">{videoUploadbar >1?<CTooltip content="Cancel uploading">
  <CButton onClick={LessonCancleFileUpladReaquest} color="primary" variant="outline" >X
      </CButton></CTooltip>:''}{<CTooltip content="Remove uploaded video"><CButton color="danger" variant="outline"  onClick={()=>removeUpload(lessonVideo?lessonVideo:filePreviw)}><CIcon size={'sm'} name={'cilTrash'} /> </CButton></CTooltip>}</div>
                                  <p className="error_message animate__animated animate__headShake" >{LessonVideoError}</p>
                                  <p className="videouplpad animate__animated animate__headShake" >{videoUploadbar?`video is uploading ${videoUploadbar} %`:""}</p>
                                  {filePreviw?<div className="d-flex mt-2"><p className="p-2 w-100 bg-light"><a href={filePreviw} target='_blank'>{filePreviw.slice(57,)}</a></p></div>:''}
                  { lessonVideo &&(
                                    <video
                                      controls={true}
                                      width="100%"
                                      className='mt-3'
                                      onLoadedMetadata={e => {
                                        setMetadata({
                                  
                                          duration: e.target.duration
                                        });
                                      }}
                                    >
                                      <source src={lessonVideo}
                                        type="video/mp4" />
                                    </video>
                                  )}   
                </div>
              
                <div class="col-lg-6 col-md-6">
                  <div class="part_input mt-30 lbel25">
                    <label>material*</label>
                    <div class="input-group">
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile06"  onChange={OnMeterilChange} accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint"/>
                        <label class="custom-file-label" for="inputGroupFile06">{material?material.name:'No Choose file - (Pdf, Video)'} </label>
                      </div>
                      
                    </div>
                    
                  </div>
                  <br></br>
                  {meterialuploadbar >1?<div className="d-flex justify-content-end mt-6 mr-2"><CTooltip content="Cancel uploading">
  <CButton onClick={MaterialRequestCancle} color="primary" variant="outline" >X
      </CButton></CTooltip></div>:''}
    <p className="error_message animate__animated animate__headShake" >{materialError}</p>  
           <p className="videouplpad" >{meterialuploadbar?`File is uploading ${meterialuploadbar} %`:""}</p>
           {
  materialArray.map((cv,i)=>{
    return <div className="d-flex" key={i}><p className="p-2 w-100 ">{i+1}{"."}  {" "}<a href={cv}target='_blank'>{cv.slice(57,)}</a> </p>  <CButton color="danger" onClick={()=>deletemeterial(cv,i)} className="p-2 flex-shrink-2   border-0" variant="outline" shape="square" size="sm" > <CIcon size={'sm'} name={'cilTrash'} /></CButton></div>
  })
}
                </div>
                
        </>
      :''
    }
    {Lesson_Type_Option.lesson_type === "Video_url[.mp4]"?
        <>
        <div class="col-lg-6 col-md-6">
        <div class="ui search focus mt-30 lbel25">
                    <label>Video URL*</label>
                    <div class="ui left icon input swdh19">
                      <input class="prompt srch_explore" type="text" onChange={LessonvideoURL} placeholder="Enter video .mp4 URL." name="mp4_url" value={lessonvideomp4.mp4_url?lessonvideomp4.mp4_url:filePreviw}data-purpose="edit-course-title"  id="lecture[title]" 
                        
                      />															
                    </div>
                  </div>
                  {filePreviw?<div className="d-flex mt-2"><p className="p-2 w-100 bg-light"><a href={filePreviw} target='_blank'>{filePreviw}</a></p> <CTooltip content="Remove uploaded video"><CButton color="danger" variant="outline"  onClick={()=>removeUpload(filePreviw)}><CIcon size={'sm'} name={'cilTrash'} /> </CButton></CTooltip></div>:''}
                  { lessonvideomp4.mp4_url &&(
                                    <video
                                      controls={true}
                                      width="100%"
                                      className='mt-3'
                                      onLoadedMetadata={e => {
                                        setMetadata({
                                  
                                          duration: e.target.duration
                                        });
                                      }}
                                    >
                                      <source src={lessonvideomp4.mp4_url}
                                        type="video/mp4" />
                                    </video>
                                  )}  
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="part_input mt-30 lbel25">
                    <label>material*</label>
                    <div class="input-group">
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile06"  onChange={OnMeterilChange} accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
                        <label class="custom-file-label" for="inputGroupFile06">{material?material.name:'No Choose file - (Pdf, Video)'} </label>
                      </div>
                      
                    </div>
                    
                  </div>
                  <br></br>
                  {meterialuploadbar >1?<div className="d-flex justify-content-end mt-6 mr-2"><CTooltip content="Cancel uploading">
  <CButton onClick={MaterialRequestCancle} color="primary" variant="outline" >X
      </CButton></CTooltip></div>:''}
    <p className="error_message animate__animated animate__headShake" >{materialError}</p>  
           <p className="videouplpad" >{meterialuploadbar?`File is uploading ${meterialuploadbar} %`:""}</p>
           {
  materialArray.map((cv,i)=>{
    return <div className="d-flex" key={i}><p className="p-2 w-100 ">{i+1}{"."}  {" "}<a href={cv}target='_blank'>{cv.slice(57,)}</a> </p>  <CButton color="danger" onClick={()=>deletemeterial(cv,i)} className="p-2 flex-shrink-2   border-0" variant="outline" shape="square" size="sm" > <CIcon size={'sm'} name={'cilTrash'} /></CButton></div>
  })
}
                </div>
                
                
        </>
      :''
    }
   
                <UploadileComponent/>
                  <div class="col-lg-12 col-md-12">	
                  <div class="course_des_textarea mt-30 lbel25">
                    <label>Description*</label>
                    <div class="course_des_bg">
                      <ul class="course_des_ttle">
                        <li><a href="#"><i class="uil uil-bold"></i></a></li>
                        <li><a href="#"><i class="uil uil-italic"></i></a></li>
                        <li><a href="#"><i class="uil uil-list-ul"></i></a></li>
                        <li><a href="#"><i class="uil uil-left-to-right-text-direction"></i></a></li>
                        <li><a href="#"><i class="uil uil-right-to-left-text-direction"></i></a></li>
                        <li><a href="#"><i class="uil uil-list-ui-alt"></i></a></li>
                        <li><a href="#"><i class="uil uil-link"></i></a></li>
                        <li><a href="#"><i class="uil uil-text-size"></i></a></li>
                        <li><a href="#"><i class="uil uil-text"></i></a></li>
                      </ul>
                      <div class="textarea_dt">															
                        <div class="ui form swdh339">
                          <div class="field">
                            <textarea rows="5" name="lessondescription" id="id_part_description" placeholder="Insert your course part description"
     onChange={lessonchnage} name='summary' value={LessonDetail.summary}
                            ></textarea>
                          </div>
                        </div>		
                        {
                      lessonError.summary && (<p className='text-danger'>{lessonError.summary }</p>)
                    }								
                      </div>
                    </div>
                  </div>
                </div>
                 
                
                {
                  lessonvideomp4.mp4_url || lessonVideo || vimeovideo.vimeo_url || youtuveUrl.youtube_url?  <div class="col-lg-5 col-md-6">															
                  <div class="ui search focus mt-30 lbel25">
                    <label>Duration*</label>
                    <div class="ui left icon input swdh19 swdh55">
                    
                      <input class="prompt srch_explore" type="text" min="0" value={metadata.duration ? new Date(metadata.duration * 1000).toISOString().substr(11, 8) : "00:00:00"} name="duration"  required="" placeholder="0"/>															
                      <div class="badge_min">Minutes</div>
                    </div>
                  </div>									
                </div>:''
                }
                 
                <div class="col-lg-2 col-md-12">
                  <button class="part_btn_save prt-sv" type="submit"  onClick={()=>LessonValeEdit(LessonDetail.id)}>Update</button>
                </div>
</div>
</div>
</div></div></div></div></div>
</>)
}
export default InstructorLessonEdit;