import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../student/studentstyle.css";
import coverimage from "../../images/courses/add_img.jpg";
import coursevalidation from "./courseEditValidatio";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import BaseUrl from "../BaseUrl/BaseUrl";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import validations from "./LessonValidation";
import {
  CModalFooter,
  CTooltip,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import CIcon from "@coreui/icons-react";
function InstructorNewCourse(params) {
  const [formStep, SetFormStep] = useState(0);
  const editorConfiguration = { toolbar: ["bold", "italic"] };

  const [requrementiInputList, setRequrementiInputList] = useState([
    { requreinput: "" },
  ]);
  const [outcomeInputList, setOutcomesInputList] = useState([{ outcomes: "" }]);
  const [getLessonData, setLessonData] = useState([]);
  const [imges, Setimages] = useState("");
  const [video, Setvideo] = useState("");
  const [videoError, SetvideoEror] = useState("");
  const [imageError, SetImageError] = useState("");
  const [lessonVideo, setLessonVideo] = useState("");
  const [volume, setVolume] = useState(0);
  const [metadata, setMetadata] = useState({
    duration: 0,
  });
  const [sectionid, setsectionid] = useState(0);
  const [SectionTitle, SetSectionTitle] = useState({
    title: "",
    sortorder: 1,
    course_id: "",
  });
  const [meta, setMeta] = useState({
    meta_keywords: "",
    meta_description: "",
  });
  const LessonFilecanclefileupload = useRef(null);
  let histrory = useHistory();
  const [pptturl, SetPPTturl] = useState();
  const [uploadvideocomplate, Setuploadvideocomplate] = useState(false);
  //get category option
  const [Categoryops, Setcategoryops] = useState([]);
  //get level option
  const [Levelops, Setlevelops] = useState([]);
  //get languge option
  const [Language, Setlanguage] = useState([]);
  //get topic option
  const [TopicOption, SetTopicOption] = useState([]);
  //get price option
  const [PriceOption, SetPriceOption] = useState([]);
  //get duration option
  const [Duration, SetDuration] = useState([]);
  //get fearture option
  const [Fetures, SetFetures] = useState([]);
  const [Amount, setAmount] = useState(false);
  //get subtitle option
  const [CorurseAdd, SetCourseAdd] = useState({
    title: "",
    description: "",
    id_category: "",
    id_topic: "",
    id_level: "",
    id_price: "",
    id_language: "",
    id_duration: "",
    id_features: "",
    id_subtitles: "",
    price: "0",
  });
  const [CourseError, setCourseError] = useState({});
  const changeCourse = (e) => {
    setCourseError((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
    const { name, value } = e.target;
    SetCourseAdd((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    if (e.target.value == 2) {
      setAmount(true);
    } else {
      setAmount(false);
    }
  };
  const changeAmount = (e) => {
    setCourseError((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
    const { name, value } = e.target;
    SetCourseAdd((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const metachange = (e) => {
    const { name, value } = e.target;
    setMeta((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const [Subtitle, SetSubtitle] = useState([]);
  const [sectionerror, SetSectioError] = useState("");
  const [lessonError, setLessonError] = useState({});
  const canclefileupload = useRef(null);
  const [videoUploadbar, SetvideoUploadbar] = useState();
  const [uploadcomplate, setuploadCoursecomplte] = useState(false);
  const [SectionData, SetSectionData] = useState([]);
  const meterialuploadcancle = useRef(null);
  const [Lesson_Type_Option, SetLessonTypeOption] = useState({
    lesson_type: "",
  });
  const [LessonDetail, setLessondata] = useState({
    title: "",
    description: "",
    section_title: "",
  });
  const [uploaPDF, SetUpladPDF] = useState();
  const [meterialuploadbar, Setmeterialuploadbar] = useState();
  const [materialArray, SetmaterialArray] = useState([]);
  const [materialError, SetmaterialError] = useState("");
  const [meterialpreview, SetMeterialpreview] = useState([]);
  const [lessonvideomp4, setlessonvideomp4] = useState({
    mp4_url: "",
  });
  const [pffppturl, SetPfPpturl] = useState();
  const [pdfuploadbar, Setpdfuploadbar] = useState();
  const [material, Setmaterial] = useState();
  const [LessonVideoError, SetLessonVideoError] = useState("");
  const [youtuveUrl, SetYoutubeurl] = useState({
    youtube_url: "",
  });
  const [vimeovideo, SetVimeovideo] = useState({
    vimeo_url: "",
  });
  const [PPTuploadbar, SetPPtuploadbar] = useState();
  const [uploaPPT, SetUpladPPT] = useState();
  const [videoduration, Setvimeoduration] = useState();
  const [videoVideocheck, SetvideoVideocheck] = useState(false);
  const [titlelenght, setTitleLenght] = useState("");
  const [Descriptionlenght, setdisctiptionenght] = useState("");
  const [myduration, setduration] = useState({
    duration: 0,
  });
  const {
    watch,
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({ mode: "onChange" });
  const { append, remove, fields } = useFieldArray({
    control,
    name: "user",
  });
  const onlessonchange = (e) => {
    SetPPTturl();
    SetPfPpturl();
    setlessonvideomp4({
      mp4_url: "",
    });
    SetVimeovideo({
      vimeo_url: "",
    });
    SetYoutubeurl({
      youtube_url: "",
    });
    SetLessonTypeOption({
      lesson_type: "",
    });
    SetmaterialArray([]);

    SetvideoVideocheck(false);
    const { name, value } = e.target;
    SetLessonTypeOption((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  ClassicEditor.defaultConfig = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "|",
        "bulletedList",
        "numberedList",
        "|",
        "insertTable",
        "|",
        "undo",
        "redo",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    language: "en",
  };
  const OnPdfChange = async (e) => {
    SetUpladPDF(e.target.files[0]);
    const PDFformdata = new FormData();

    PDFformdata.append(
      "course_vido",
      e.target.files[0],
      e.target.files[0].name.split(" ").join("")
    );
    await axios
      .post(`${BaseUrl}uplodevideo`, PDFformdata, {
        headers: {
          "content-type": "multipart/form-data",
          auth: localStorage.getItem("LMS_Token"),
        },
        onUploadProgress: (progressEvent) => {
          //Set the progress value to show the progress bar

          let persentge = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          if (persentge < 100) {
            Setpdfuploadbar(persentge);
          }
        },
      })
      .then((response) => {
        SetPfPpturl(response.data.video_url);
        Setpdfuploadbar(100);

        setTimeout(() => {
          Setpdfuploadbar(0);
        }, 1000);
      })
      .catch((error) => {
        // //console.log(error);
      });
  };
  const handleRequreChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...requrementiInputList];
    list[index][name] = value;
    setRequrementiInputList(list);
  };

  // handle click event of the Remove button
  const handleRequreRemoveClick = (index) => {
    const list = [...requrementiInputList];
    list.splice(index, 1);
    setRequrementiInputList(list);
  };

  // handle click event of the Add button
  const handlerequreAddClick = () => {
    setRequrementiInputList([...requrementiInputList, { requreinput: "" }]);
  };

  const handleOutcomeChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...outcomeInputList];
    list[index][name] = value;
    setOutcomesInputList(list);
  };

  // handle click event of the Remove button
  const handleOutcomeRemoveClick = (index) => {
    const list = [...outcomeInputList];
    list.splice(index, 1);
    setOutcomesInputList(list);
  };

  // handle click event of the Add button
  const handleOutcomeAddClick = () => {
    setOutcomesInputList([...outcomeInputList, { outcomes: "" }]);
  };

  const LessonvideoURL = (e) => {
    const { name, value } = e.target;
    setlessonvideomp4((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onChangeImage = (e) => {
    SetImageError("");
    try {
      if (e.target.files[0].size > 5242880) {
        SetImageError("image size is above 5mb");
      } else {
        Setimages(e.target.files[0]);
      }
    } catch (error) {
      // //console.log(error);
    }
  };
  const OnMeterilChange = async (e) => {
    try {
      SetmaterialError("");
      if (e.target.files[0].size > 10485760) {
        SetmaterialError("Meterial size is above 10Mb");
      } else {
        Setmeterialuploadbar(0);
        Setmaterial(e.target.files[0]);

        const Meterialformdata = new FormData();

        Meterialformdata.append(
          "course_vido",
          e.target.files[0],
          e.target.files[0].name.split(" ").join("")
        );
        await axios
          .post(`${BaseUrl}uplodevideo`, Meterialformdata, {
            headers: {
              "content-type": "multipart/form-data",
              auth: localStorage.getItem("LMS_Token"),
            },
            onUploadProgress: (progressEvent) => {
              //Set the progress value to show the progress bar

              let persentge = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              if (persentge < 100) {
                Setmeterialuploadbar(persentge);
              }
            },
            cancelToken: new axios.CancelToken(
              (cancle) => (meterialuploadcancle.current = cancle)
            ),
          })
          .then((response) => {
            SetmaterialArray((prev) => [...prev, response.data.video_url]);
            SetMeterialpreview((prev) => [...prev, response.data.video_url]);
            Setmeterialuploadbar(100);

            setTimeout(() => {
              Setmeterialuploadbar(0);
            }, 1000);
          })
          .catch((error) => {
            //console.log(error);
          });
      }
    } catch (error) {
      //console.log(error);
    }
  };
  //cancle upload file request
  const LessonCancleFileUpladReaquest = () => {
    if (LessonFilecanclefileupload.current) {
      LessonFilecanclefileupload.current("user has canclled the file upload");
    }
  };
  const onchangeYoutubevideo = (e) => {
    const { name, value } = e.target;
    SetYoutubeurl((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const vimeovideourl = async (e) => {
    const { name, value } = e.target;
    SetVimeovideo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    try {
      const vimeoid = e.target.value.substr(31);
      await axios
        .get(`https://vimeo.com/api/v2/video/${vimeoid}.json`)
        .then(function (response) {
          Setvimeoduration(response.data[0].duration);
        });
      SetvideoVideocheck(true);
    } catch (error) {}
  };
  const lessonchnage = (e) => {
    setLessonError((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
    const { name, value } = e.target;
    setLessondata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const change = (e) => {
    SetSectioError("");
    const { name, value } = e.target;
    SetSectionTitle((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onPPTchange = async (e) => {
    SetUpladPPT(e.target.files[0]);
    const PPTformdata = new FormData();

    PPTformdata.append(
      "course_vido",
      e.target.files[0],
      e.target.files[0].name.split(" ").join("")
    );
    await axios
      .post(`${BaseUrl}uplodevideo`, PPTformdata, {
        headers: {
          "content-type": "multipart/form-data",
          auth: localStorage.getItem("LMS_Token"),
        },
        onUploadProgress: (progressEvent) => {
          //Set the progress value to show the progress bar
          let persentge = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          if (persentge < 100) {
            SetPPtuploadbar(persentge);
          }
        },
      })
      .then((response) => {
        SetPPTturl(response.data.video_url);
        SetPPtuploadbar(100);

        setTimeout(() => {
          SetPPtuploadbar(0);
        }, 1000);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const PDF_delete = async (document_url) => {
    const delete_document_url = {
      video_url: document_url,
    };
    Setpdfuploadbar(0);
    SetPfPpturl("");
    await axios.post(`${BaseUrl}removevideo`, delete_document_url, {
      headers: {
        auth: localStorage.getItem("LMS_Token"),
      },
    });
  };
  const PPT_delete = async (ppt_url) => {
    const delete_document_url = {
      video_url: ppt_url,
    };
    SetPPtuploadbar(0);
    SetPPTturl("");
    await axios.post(`${BaseUrl}removevideo`, delete_document_url, {
      headers: {
        auth: localStorage.getItem("LMS_Token"),
      },
    });
  };

  const GetSectionData = async () => {
    await axios
      .get(
        `${BaseUrl}forentend/section/all/${localStorage.getItem("courseId")}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
            auth: localStorage.getItem("LMS_Token"),
          },
        }
      )
      .then(function (response) {
        SetSectionData(response.data);
      });
  };
  const RecieveLessondata = async () => {
    await axios
      .get(`${BaseUrl}forentend/mylesson/${localStorage.getItem("courseId")}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        setLessonData(response.data);
      });
  };
  const ReciveCategoryOptions = async () => {
    await axios
      .get(`${BaseUrl}category`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        Setcategoryops(response.data);
      });
  };
  // recive level option
  const ReciveLeveloption = async () => {
    await axios
      .get(`${BaseUrl}level`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        Setlevelops(response.data);
      });
  };
  // recive launguge option
  const ReciveLanguageoption = async () => {
    await axios
      .get(`${BaseUrl}language`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        Setlanguage(response.data);
      });
  };
  // recive topic option
  const ReciveTopicoption = async () => {
    const GetTopicData = await axios
      .get(`${BaseUrl}topic`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        SetTopicOption(response.data);
      });
  };
  // recive price option
  const RecivePriceoption = async () => {
    const GetPriceData = await axios
      .get(`${BaseUrl}price`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        SetPriceOption(response.data);
      });
  };
  // recive duration option
  const ReciveDuretionoption = async () => {
    await axios
      .get(`${BaseUrl}duration`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        SetDuration(response.data);
      });
  };
  // recive feture option
  const ReciveFeturesoption = async () => {
    await axios
      .get(`${BaseUrl}features`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        SetFetures(response.data);
      });
  };
  // recive subtitle option
  const ReciveSubtitleoption = async () => {
    await axios
      .get(`${BaseUrl}subtitles`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        SetSubtitle(response.data);
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [formStep]);
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`);
    }

    ReciveCategoryOptions();
    ReciveLeveloption();
    ReciveLanguageoption();
    ReciveTopicoption();
    RecivePriceoption();
    ReciveDuretionoption();
    ReciveFeturesoption();
    ReciveSubtitleoption();
    RecieveLessondata();
    GetSectionData();
  }, []);

  const onChangeVideo = async (e) => {
    SetvideoEror("");

    try {
      if (e.target.files[0].size > 262144000) {
        SetvideoEror("video size is above 250mb");
      } else {
        const uploadvideo = new FormData();

        uploadvideo.append(
          "course_vido",
          e.target.files[0],
          e.target.files[0].name.split(" ").join("")
        );

        await axios
          .post(`${BaseUrl}uplodevideo`, uploadvideo, {
            headers: {
              "content-type": "multipart/form-data",
              auth: localStorage.getItem("LMS_Token"),
            },
            onUploadProgress: (progressEvent) => {
              //Set the progress value to show the progress bar
              let persentge = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              if (persentge < 100) {
                SetvideoUploadbar(persentge);
              }
            },
            cancelToken: new axios.CancelToken(
              (cancel) => (canclefileupload.current = cancel)
            ),
          })
          .then((response) => {
            SetvideoUploadbar(100);
            setuploadCoursecomplte(!uploadcomplate);

            setTimeout(() => {
              SetvideoUploadbar(0);
            }, 1000);
            Setvideo(response.data.video_url);
            e.target.value = null;
          })
          .catch((error) => {
            //console.log(error);
            if (canclefileupload.current) {
              SetvideoEror("video uploading request cancle");
            }
            SetvideoUploadbar(0);
          });
      }
    } catch (error) {
      //console.log(error);
    }
    e.target.value = null;
  };
  //cancle upload file request
  const CancleFileUpladReaquest = () => {
    if (canclefileupload.current) {
      canclefileupload.current("user has canclled the file upload");
    }
  };
  const removeUpload = async (Remove_Uploaded_vieo) => {
    Setvideo("");
    const delete_uploaded_video = {
      video_url: Remove_Uploaded_vieo,
    };
    await axios.post(`${BaseUrl}removevideo`, delete_uploaded_video, {
      headers: {
        auth: localStorage.getItem("LMS_Token"),
      },
    });
  };
  const secondSetp = () => {
    SetFormStep((step) => step + 1);
  };
  const nextButton = () => {
    if (Object.keys(coursevalidation(CorurseAdd)).length > 0) {
      setCourseError(coursevalidation(CorurseAdd));
    }
    if (Object.keys(coursevalidation(CorurseAdd)).length === 0) {
      SetFormStep((step) => step + 1);
      localStorage.removeItem("courseId");
    }
  };
  const previousButton = () => {
    SetFormStep((step) => step - 1);
  };
  const Lessonfile = async (e) => {
    setVolume(e.target.files[0].size);
    try {
      SetvideoUploadbar(0);
      if (e.target.files[0].size > 267386880) {
        SetLessonVideoError("Video size is above 250Mb");
      } else {
        const uploadvideo = new FormData();

        uploadvideo.append(
          "course_vido",
          e.target.files[0],
          e.target.files[0].name.split(" ").join("")
        );

        await axios
          .post(`${BaseUrl}uplodevideo`, uploadvideo, {
            headers: {
              "content-type": "multipart/form-data",
              auth: localStorage.getItem("LMS_Token"),
            },
            onUploadProgress: (progressEvent) => {
              //Set the progress value to show the progress bar
              let persentge = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              if (persentge < 100) {
                SetvideoUploadbar(persentge);
              }
            },
            cancelToken: new axios.CancelToken(
              (cancel) => (LessonFilecanclefileupload.current = cancel)
            ),
          })
          .then((response) => {
            SetvideoUploadbar(100);
            setuploadCoursecomplte(!uploadcomplate);
            Setuploadvideocomplate(!uploadvideocomplate);
            setTimeout(() => {
              SetvideoUploadbar(0);
            }, 1000);
            setLessonVideo(response.data.video_url);
            e.target.value = null;
          })
          .catch((error) => {
            //console.log(error);
            if (LessonFilecanclefileupload.current) {
              // console.log("user has cancle request");
            }
            SetvideoUploadbar(0);
          });
      }
    } catch (error) {
      // console.log("can not upoad file");
    }
  };
  const MaterialRequestCancle = () => {
    if (meterialuploadcancle.current) {
      meterialuploadcancle.current("material upload request is cancled");
      Setmeterialuploadbar(0);
    }
  };
  const deletemeterial = async (metrial_url, index) => {
    const delete_mererial_url = {
      video_url: metrial_url,
    };
    materialArray.splice(index, 1);
    const items = materialArray.filter((item) => item !== index);
    SetmaterialArray(items);

    await axios.post(`${BaseUrl}removevideo`, delete_mererial_url, {
      headers: {
        auth: localStorage.getItem("LMS_Token"),
      },
    });
  };

  const onSubmit = async () => {
    const RequiremenyArray = [];
    const OutComesArray = [];
    requrementiInputList.map((requireValue) => {
      RequiremenyArray.push(requireValue.requreinput);
    });
    outcomeInputList.map((outcomesValue) => {
      OutComesArray.push(outcomesValue.outcomes);
    });
    const coursedata = {
      ...CorurseAdd,
      requirements: RequiremenyArray.toString(),
      outcomes: OutComesArray.toString(),
      video_url: video,
      course_img: imges,
      meta_keywords: meta.meta_keywords,
      meta_description: meta.meta_description,
    };
    const {
      title,
      description,
      id_category,
      id_topic,
      id_level,
      id_price,
      id_language,
      id_duration,
      id_features,
      id_subtitles,
      price,
      requirements,
      outcomes,
      video_url,
      course_img,
      meta_description,
      meta_keywords,
    } = coursedata;

    let Formdata = new FormData();
    Formdata.append("course_img", course_img, course_img.name);
    Formdata.append("title", title);
    Formdata.append("requirements", requirements);
    Formdata.append("outcomes", outcomes);
    Formdata.append("meta_description", meta_description);
    Formdata.append("meta_keywords", meta_keywords);
    Formdata.append("description", description || 0);
    Formdata.append("id_category", id_category || 0);
    Formdata.append("id_topic", id_topic || 0);
    Formdata.append("id_level", id_level || 0);
    Formdata.append("id_price", id_price || 0);
    Formdata.append("id_language", id_language || 0);
    Formdata.append("id_duration", id_duration || 0);
    Formdata.append("id_features", id_features || 0);
    Formdata.append("id_subtitles", id_subtitles || 0);
    Formdata.append("price", price || 0);
    Formdata.append("video_url", video_url);
    Formdata.append("status", "0");
    await axios
      .post(`${BaseUrl}forentend/createcourse/`, Formdata, {
        headers: {
          "content-type": "multipart/form-data",
          auth: localStorage.getItem("LMS_Token"),
        },
      })

      .then((response) => {
        setsectionid(response.data.id);
        localStorage.setItem("courseId", response.data.id);
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <CModal show={true} centered={true} onClose={onClose}>
                <div className="p-3" closeButton>
                  {" "}
                  <h3>{window.location.host} Says</h3>
                </div>
                <hr className="hr hr-success"></hr>
                <CModalBody>
                  <h4>Course Created Successfully</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    style={{
                      backgroundColor: "rgb(155, 61, 53)",
                      color: "white",
                    }}
                    className="btn"
                    onClick={onClose}
                  >
                    Ok
                  </CButton>
                </CModalFooter>
              </CModal>
            );
          },
        });
      })
      .catch((error) => {
        //console.log(error);
      });
    SetFormStep((step) => step + 1);
  };
  const DeleteLessonData = async (lessonId) => {
    await axios
      .delete(`${BaseUrl}forentend/lessondelete/${lessonId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then((responce) => {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <CModal show={true} centered={true} onClose={onClose}>
                <div className="p-3" closeButton>
                  {" "}
                  <h3>{window.location.host} Says</h3>
                </div>
                <hr className="hr hr-success"></hr>
                <CModalBody>
                  <h4>{responce.data.message}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    style={{
                      backgroundColor: "rgb(155, 61, 53)",
                      color: "white",
                    }}
                    className="btn"
                    onClick={onClose}
                  >
                    Ok
                  </CButton>
                </CModalFooter>
              </CModal>
            );
          },
        });
        RecieveLessondata();
      })
      .catch((error) => {
        if (error.response) {
          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <CModal show={true} centered={true} onClose={onClose}>
                  <div className="p-3" closeButton>
                    {" "}
                    <h3>{window.location.host} Says</h3>
                  </div>
                  <hr className="hr hr-success"></hr>
                  <CModalBody>
                    {" "}
                    <h4>{error.response.data.message}</h4>
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                      style={{
                        backgroundColor: "rgb(155, 61, 53)",
                        color: "white",
                      }}
                      className="btn"
                      onClick={onClose}
                    >
                      Ok
                    </CButton>
                  </CModalFooter>
                </CModal>
              );
            },
          });
        }
      });
  };
  const EditLesson = (lessonEditId) => {
    histrory.push(`/instructor/instructor_lesson_edit/${lessonEditId}`);
  };
  const deleteLessonConfirm = (lessonDeleteId) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CModal show={true} centered={true} onClose={onClose}>
            <div className="p-3" closeButton>
              {" "}
              <h3>{window.location.host} Says</h3>
            </div>
            <hr className="hr hr-success"></hr>
            <CModalBody>
              <h4>Are you sure you want to delete it?</h4>
            </CModalBody>
            <CModalFooter>
              <CButton
                style={{ backgroundColor: "rgb(155, 61, 53)", color: "white" }}
                className="btn "
                onClick={() => {
                  DeleteLessonData(lessonDeleteId);
                  onClose();
                }}
              >
                Yes
              </CButton>{" "}
              <CButton
                onClick={onClose}
                style={{ backgroundColor: "rgb(155, 61, 53)", color: "white" }}
                className="btn"
              >
                No
              </CButton>
            </CModalFooter>
          </CModal>
        );
      },
    });
  };
  const RenderButton = () => {
    if (formStep === 0) {
      return (
        <div class="step-footer step-tab-pager">
          {/* <button onClick={previousButton} class="btn btn-default steps_btn">PREVIOUS</button> */}
          <button onClick={nextButton} class="btn btn-default steps_btn">
            Next
          </button>
          {/* <button data-direction="finish" class="btn btn-default steps_btn">Submit for Review</button> */}
        </div>
      );
    } else if (formStep === 1) {
      return (
        <div class="step-footer step-tab-pager">
          <button onClick={previousButton} class="btn btn-default steps_btn">
            PREVIOUS
          </button>
          <button
            style={{ float: "right" }}
            onClick={secondSetp}
            class="btn btn-default steps_btn"
          >
            Next
          </button>
          {/* <button data-direction="finish" class="btn btn-default steps_btn">Submit for Review</button> */}
        </div>
      );
    } else if (formStep == 2) {
      return (
        <div class="step-footer step-tab-pager">
          <button onClick={previousButton} class="btn btn-default steps_btn">
            PREVIOUS
          </button>
          <button
            style={{ float: "right" }}
            onClick={handleSubmit(onSubmit)}
            disabled={imges && video ? "" : "disabled"}
            class="btn btn-default steps_btn"
          >
            Next
          </button>
          {/* <button data-direction="finish" class="btn btn-default steps_btn">Submit for Review</button> */}
        </div>
      );
    } else if (formStep == 3) {
      return (
        <div class="step-footer step-tab-pager">
          <button onClick={previousButton} class="btn btn-default steps_btn">
            PREVIOUS
          </button>

          {/* <button data-direction="finish" class="btn btn-default steps_btn">Submit for Review</button> */}
        </div>
      );
    } else if (formStep == 3) {
      return (
        <div class="step-footer step-tab-pager">
          <button onClick={previousButton} class="btn btn-default steps_btn">
            PREVIOUS
          </button>

          <button data-direction="finish" class="btn btn-default steps_btn">
            Submit for Review
          </button>
        </div>
      );
    } else {
      return undefined;
    }
  };
  const lessonadd = async () => {
    if (Object.keys(validations(LessonDetail)).length > 0) {
      setLessonError(validations(LessonDetail));
    }
    if (Object.keys(validations(LessonDetail)).length === 0) {
      const LessonAddData = new FormData();
      if (lessonVideo) {
        LessonAddData.append("video_url", lessonVideo);
        LessonAddData.append("meterial_url", materialArray.toString());
      }
      if (pffppturl) {
        LessonAddData.append("video_url", pffppturl.split(" ").join(""));
        LessonAddData.append("meterial_url", materialArray.toString());
      }
      if (pptturl) {
        LessonAddData.append("video_url", pptturl.split(" ").join(""));
        LessonAddData.append("meterial_url", materialArray.toString());
      }

      if (lessonvideomp4.mp4_url) {
        LessonAddData.append("video_url", lessonvideomp4.mp4_url);
        LessonAddData.append("meterial_url", materialArray.toString());
      }
      if (vimeovideo.vimeo_url) {
        LessonAddData.append("video_url", vimeovideo.vimeo_url);
        LessonAddData.append("meterial_url", materialArray.toString());
      }
      if (youtuveUrl.youtube_url) {
        LessonAddData.append("video_url", youtuveUrl.youtube_url);
        LessonAddData.append("meterial_url", materialArray.toString());
      }
      if (metadata.duration) {
        LessonAddData.append(
          "duration",
          new Date(metadata.duration * 1000).toISOString().substr(11, 8)
        );
      }
      if (videoduration) {
        LessonAddData.append(
          "duration",
          new Date(videoduration * 1000).toISOString().substr(11, 8)
        );
      }
      if (!videoduration && !metadata.duration) {
        LessonAddData.append("duration", "00:00:00");
      }

      LessonAddData.append("order", 1);
      LessonAddData.append("id_group", 1);
      LessonAddData.append("course_id", localStorage.getItem("courseId"));
      LessonAddData.append("summary", LessonDetail.description);
      LessonAddData.append("lesson_type", Lesson_Type_Option.lesson_type);
      LessonAddData.append("title", LessonDetail.title);
      LessonAddData.append("section_id", LessonDetail.section_title);
      await axios
        .post(`${BaseUrl}forentend/addlesson`, LessonAddData, {
          headers: {
            auth: localStorage.getItem("LMS_Token"),
          },
        })
        .then((responce) => {
          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <CModal show={true} centered={true} onClose={onClose}>
                  <div className="p-3" closeButton>
                    {" "}
                    <h3>{window.location.host} Says</h3>
                  </div>
                  <hr className="hr hr-success"></hr>
                  <CModalBody>
                    <h4>Lesson Created Successfully</h4>
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                      style={{
                        backgroundColor: "rgb(155, 61, 53)",
                        color: "white",
                      }}
                      className="btn btn-block"
                      onClick={onClose}
                    >
                      Ok
                    </CButton>
                  </CModalFooter>
                </CModal>
              );
            },
          });
        })
        .catch((error) => {});
      RecieveLessondata();
      setLessondata({
        title: "",
        description: "",
        section_title: 0,
      });
      setVolume("");
      setMetadata({ duration: "" });
      setlessonvideomp4({
        mp4_url: "",
      });
      setLessonVideo("");
      SetPfPpturl("");
      Setvimeoduration();
      SetPPTturl("");
      SetVimeovideo({
        vimeo_url: "",
      });
      SetYoutubeurl({
        youtube_url: "",
      });
      SetLessonTypeOption({
        lesson_type: "",
      });
      SetmaterialArray([]);

      SetvideoVideocheck(false);
    }
  };
  const SecndActivationRequest = async () => {
    await axios
      .get(
        `${BaseUrl}forentend/sendactivation/${localStorage.getItem(
          "courseId"
        )}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
            auth: localStorage.getItem("LMS_Token"),
          },
        }
      )
      .then(function (response) {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <CModal show={true} centered={true} onClose={onClose}>
                <div className="p-3" closeButton>
                  {" "}
                  <h3>{window.location.host} Says</h3>
                </div>
                <hr className="hr hr-success"></hr>
                <CModalBody>
                  <h4>{response.data[0].message}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    style={{
                      backgroundColor: "rgb(155, 61, 53)",
                      color: "white",
                    }}
                    className="btn"
                    onClick={onClose}
                  >
                    Ok
                  </CButton>
                </CModalFooter>
              </CModal>
            );
          },
        });
        // console.log("SecndActivationRequest", response.data);
      });
    localStorage.setItem("upcommingtab", "upcommingcourse");
    histrory.push("/instructor/instructor_courses");
  };
  const addSection = async () => {
    const reWhiteSpace = new RegExp(/^\s+$/);
    const sectiondata = {
      course_id: localStorage.getItem("courseId"),
      title: SectionTitle.title,
      sortorder: 1,
    };
    if (SectionTitle.title === "") {
      SetSectioError("Title is Required");
    }
    if (reWhiteSpace.test(SectionTitle.title)) {
      SetSectioError("Please Check Your Fields For Spaces");
    } else {
      await axios
        .post(`${BaseUrl}forentend/createsection`, sectiondata, {
          headers: {
            auth: localStorage.getItem("LMS_Token"),
          },
        })
        .then((responce) => {
          // console.log(responce);

          GetSectionData();
        })
        .catch((error) => {
          // console.log("error", error);
        });
    }
    GetSectionData();
    SetSectionTitle({
      title: "",
    });
  };
  const UploadileComponent = () => {
    if (Lesson_Type_Option.lesson_type === "YouTube_Video") {
      return (
        <>
          <div class="col-lg-6 col-md-6">
            <div class="ui search focus mt-30 lbel25">
              <label>Youtube URL*</label>
              <div class="ui left icon input swdh19">
                <input
                  class="prompt srch_explore"
                  type="text"
                  placeholder="Enter youtube URL."
                  name="youtube_url"
                  value={youtuveUrl.youtube_url}
                  onChange={onchangeYoutubevideo}
                  data-purpose="edit-course-title"
                  maxlength="60"
                  id="lecture[title]"
                />
              </div>
            </div>
            {youtuveUrl.youtube_url && (
              <>
                <iframe
                  src={youtuveUrl.youtube_url}
                  className="mt-2"
                  width="100%"
                  frameborder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowfullscreen
                ></iframe>{" "}
              </>
            )}
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="part_input mt-30 lbel25">
              <label>Supporting Material*</label>
              <div class="input-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile06"
                    onChange={OnMeterilChange}
                    accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  />
                  <label class="custom-file-label" for="inputGroupFile06">
                    {material ? material.name : "Choose file - (Pdf, PPT)"}{" "}
                  </label>
                </div>
              </div>
            </div>
            <br></br>
            {meterialuploadbar > 1 ? (
              <div className="d-flex justify-content-end mt-6 mr-2">
                <CTooltip content="Cancel uploading">
                  <CButton
                    onClick={MaterialRequestCancle}
                    color="primary"
                    variant="outline"
                  >
                    X
                  </CButton>
                </CTooltip>
              </div>
            ) : (
              ""
            )}
            <p className="error_message animate__animated animate__headShake">
              {materialError}
            </p>
            <p className="videouplpad">
              {meterialuploadbar
                ? `File is uploading ${meterialuploadbar} %`
                : ""}
            </p>
            {materialArray.map((cv, i) => {
              return (
                <div className="d-flex" key={i}>
                  <p className="p-2 w-100 ">
                    {i + 1}
                    {"."}{" "}
                    <a href={cv} target="_blank">
                      {cv.slice(57)}
                    </a>{" "}
                  </p>{" "}
                  <CButton
                    color="danger"
                    onClick={() => deletemeterial(cv, i)}
                    className="p-2 flex-shrink-2   border-0"
                    variant="outline"
                    shape="square"
                    size="sm"
                  >
                    {" "}
                    <CIcon size={"sm"} name={"cilTrash"} />
                  </CButton>
                </div>
              );
            })}
          </div>
        </>
      );
    }
    if (Lesson_Type_Option.lesson_type === "Vimeo_Video") {
      return (
        <>
          <div class="col-lg-6 col-md-6">
            <div class="ui search focus mt-30 lbel25">
              <label>Vimeo URL*</label>
              <div class="ui left icon input swdh19">
                <input
                  class="prompt srch_explore"
                  placeholder="Enter vimoe video URL."
                  onChange={vimeovideourl}
                  name="vimeo_url"
                  value={vimeovideo.vimeo_url}
                  data-purpose="edit-course-title"
                  maxlength="60"
                  id="lecture[title]"
                />
              </div>
            </div>
            {videoVideocheck && (
              <>
                <iframe
                  src={vimeovideo.vimeo_url}
                  width="420"
                  height="360"
                  frameborder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </>
            )}
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="part_input mt-30 lbel25">
              <label>Supporting Material*</label>
              <div class="input-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile06"
                    onChange={OnMeterilChange}
                    accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  />
                  <label class="custom-file-label" for="inputGroupFile06">
                    {material ? material.name : "Choose file - (Pdf, PPT)"}{" "}
                  </label>
                </div>
              </div>
            </div>
            <br></br>
            {meterialuploadbar > 1 ? (
              <div className="d-flex justify-content-end mt-6 mr-2">
                <CTooltip content="Cancel uploading">
                  <CButton
                    onClick={MaterialRequestCancle}
                    color="primary"
                    variant="outline"
                  >
                    X
                  </CButton>
                </CTooltip>
              </div>
            ) : (
              ""
            )}
            <p className="error_message animate__animated animate__headShake">
              {materialError}
            </p>
            <p className="videouplpad">
              {meterialuploadbar
                ? `File is uploading ${meterialuploadbar} %`
                : ""}
            </p>
            {materialArray.map((cv, i) => {
              return (
                <div className="d-flex" key={i}>
                  <p className="p-2 w-100 ">
                    {i + 1}
                    {"."}{" "}
                    <a href={cv} target="_blank">
                      {cv.slice(57)}
                    </a>{" "}
                  </p>{" "}
                  <CButton
                    color="danger"
                    onClick={() => deletemeterial(cv, i)}
                    className="p-2 flex-shrink-2   border-0"
                    variant="outline"
                    shape="square"
                    size="sm"
                  >
                    {" "}
                    <CIcon size={"sm"} name={"cilTrash"} />
                  </CButton>
                </div>
              );
            })}
          </div>
        </>
      );
    }
    if (Lesson_Type_Option.lesson_type === "PPT") {
      return (
        <>
          <div class="col-lg-6 col-md-6">
            <div class="part_input mt-30 lbel25">
              <label>PPT*</label>
              <div class="input-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile06"
                    name="pdf"
                    onChange={onPPTchange}
                    accept="application/vnd.ms-powerpoint"
                  />
                  <label class="custom-file-label" for="inputGroupFile06">
                    {pptturl ? pptturl.slice(57) : "Choose file"}
                  </label>
                </div>
              </div>
            </div>
            <p className="videouplpad mt-2">
              {PPTuploadbar ? `File is uploading ${PPTuploadbar} %` : ""}
            </p>

            <p className="videouplpad">
              {pdfuploadbar ? `File is uploading ${pdfuploadbar} %` : ""}
            </p>
            {pptturl ? (
              <div className="d-flex">
                <p className="p-2 w-100 mt-2 ml-4">
                  <a href={pptturl} target="_blank">
                    {pptturl.slice(57)}
                  </a>
                </p>{" "}
                <CButton
                  color="danger"
                  onClick={() => PPT_delete(pptturl)}
                  variant="outline"
                  className="p-2 flex-shrink-2   border-0"
                  shape="square"
                  size="sm"
                >
                  {" "}
                  <CIcon size={"sm"} name={"cilTrash"} />
                </CButton>
              </div>
            ) : (
              ""
            )}
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="part_input mt-30 lbel25">
              <label>Supporting Material*</label>
              <div class="input-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile06"
                    onChange={OnMeterilChange}
                    accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  />
                  <label class="custom-file-label" for="inputGroupFile06">
                    {material ? material.name : "Choose file - (Pdf, PPT)"}{" "}
                  </label>
                </div>
              </div>
            </div>
            <br></br>
            {meterialuploadbar > 1 ? (
              <div className="d-flex justify-content-end mt-6 mr-2">
                <CTooltip content="Cancel uploading">
                  <CButton
                    onClick={MaterialRequestCancle}
                    color="primary"
                    variant="outline"
                  >
                    X
                  </CButton>
                </CTooltip>
              </div>
            ) : (
              ""
            )}
            <p className="error_message animate__animated animate__headShake">
              {materialError}
            </p>
            <p className="videouplpad">
              {meterialuploadbar
                ? `File is uploading ${meterialuploadbar} %`
                : ""}
            </p>
            {materialArray.map((cv, i) => {
              return (
                <div className="d-flex" key={i}>
                  <p className="p-2 w-100 ">
                    {i + 1}
                    {"."}{" "}
                    <a href={cv} target="_blank">
                      {cv.slice(57)}
                    </a>{" "}
                  </p>{" "}
                  <CButton
                    color="danger"
                    onClick={() => deletemeterial(cv, i)}
                    className="p-2 flex-shrink-2   border-0"
                    variant="outline"
                    shape="square"
                    size="sm"
                  >
                    {" "}
                    <CIcon size={"sm"} name={"cilTrash"} />
                  </CButton>
                </div>
              );
            })}
          </div>
        </>
      );
    }
    if (Lesson_Type_Option.lesson_type === "PDF") {
      return (
        <>
          <div class="col-lg-6 col-md-6">
            <div class="part_input mt-30 lbel25">
              <label>PDF*</label>
              <div class="input-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile06"
                    name="pdf"
                    onChange={OnPdfChange}
                    accept="application/pdf"
                  />
                  <label class="custom-file-label" for="inputGroupFile06">
                    {pffppturl ? pffppturl.slice(57) : "Choose file"}{" "}
                  </label>
                </div>
              </div>
            </div>
            <p className="videouplpad">
              {pdfuploadbar ? `File is uploading ${pdfuploadbar} %` : ""}
            </p>
            {pffppturl ? (
              <div className="d-flex">
                <p className="p-2 w-100 mt-2 ml-4">
                  <a href={pffppturl} target="_blank">
                    {pffppturl.slice(57)}
                  </a>
                </p>{" "}
                <CButton
                  color="danger"
                  onClick={() => PDF_delete(pffppturl)}
                  variant="outline"
                  className="p-2 flex-shrink-2  w-100 border-0"
                  shape="square"
                  size="sm"
                >
                  {" "}
                  <CIcon size={"sm"} name={"cilTrash"} />
                </CButton>
              </div>
            ) : (
              ""
            )}
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="part_input mt-30 lbel25">
              <label>Supporting Material*</label>
              <div class="input-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile06"
                    onChange={OnMeterilChange}
                    accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint"
                  />
                  <label class="custom-file-label" for="inputGroupFile06">
                    {material ? material.name : "Choose file - (Pdf, PPT)"}{" "}
                  </label>
                </div>
              </div>
            </div>
            <br></br>
            {meterialuploadbar > 1 ? (
              <div className="d-flex justify-content-end mt-6 mr-2">
                <CTooltip content="Cancel uploading">
                  <CButton
                    onClick={MaterialRequestCancle}
                    color="primary"
                    variant="outline"
                  >
                    X
                  </CButton>
                </CTooltip>
              </div>
            ) : (
              ""
            )}
            <p className="error_message animate__animated animate__headShake">
              {materialError}
            </p>
            <p className="videouplpad">
              {meterialuploadbar
                ? `File is uploading ${meterialuploadbar} %`
                : ""}
            </p>
            {materialArray.map((cv, i) => {
              return (
                <div className="d-flex" key={i}>
                  <p className="p-2 w-100 ">
                    {i + 1}
                    {"."}{" "}
                    <a href={cv} target="_blank">
                      {cv.slice(57)}
                    </a>{" "}
                  </p>{" "}
                  <CButton
                    color="danger"
                    onClick={() => deletemeterial(cv, i)}
                    className="p-2 flex-shrink-2   border-0"
                    variant="outline"
                    shape="square"
                    size="sm"
                  >
                    {" "}
                    <CIcon size={"sm"} name={"cilTrash"} />
                  </CButton>
                </div>
              );
            })}
          </div>
        </>
      );
    } else {
      return "";
    }
  };

  return (
    <div class="sa4d25">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h2 class="st_title">
              <i class="uil uil-analysis"></i> Create New Course
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="course_tabs_1">
              <div id="add-course-tab" class="step-app">
                <ul class="step-steps">
                  <li class={formStep >= 0 ? "active" : ""}>
                    <a>
                      <span class="number"></span>
                      <span class="step-name">General Information</span>
                    </a>
                  </li>
                  <li class={formStep >= 1 ? "active" : ""}>
                    <a>
                      <span class="number"></span>
                      <span class="step-name"> Extra Information</span>
                    </a>
                  </li>
                  <li class={formStep >= 2 ? "active" : ""}>
                    <a>
                      <span class="number"></span>
                      <span class="step-name">Media</span>
                    </a>
                  </li>
                  <li class={formStep >= 3 ? "active" : ""}>
                    <a>
                      <span class="number"></span>
                      <span class="step-name">Course Content</span>
                    </a>
                  </li>
                </ul>
                <div class="step-content">
                  {formStep >= 0 && (
                    <div
                      class="section"
                      style={{ display: formStep == 0 ? "block" : "none" }}
                    >
                      <div class="tab-from-content">
                        <div class="title-icon">
                          <h3 class="title">
                            <i class="uil uil-info-circle"></i>General
                            Information
                          </h3>
                        </div>
                        <div class="course__form">
                          <div class="general_info10">
                            <div class="row">
                              <div class="col-lg-12 col-md-12">
                                <div class="ui search focus mt-30 lbel25">
                                  <label>Course Title*</label>
                                  <div class="ui left icon input swdh19">
                                    <input
                                      class="prompt srch_explore"
                                      type="text"
                                      placeholder="Insert your course title."
                                      name="title"
                                      value={CorurseAdd.title}
                                      data-purpose="edit-course-title"
                                      maxlength="60"
                                      id="main[title]"
                                      onChange={changeCourse}
                                      autoComplete="off"
                                    />
                                    <div class="badge_num">
                                      {60 - CorurseAdd.title.length}
                                    </div>
                                  </div>

                                  {CourseError.title && (
                                    <p className="text-danger">
                                      {CourseError.title}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div class="col-lg-12 col-md-12">
                                <div class="course_des_textarea mt-30 lbel25">
                                  <label>Course Description*</label>
                                  <div class="course_des_bg">
                                    <CKEditor
                                      name="description"
                                      value={""}
                                      required
                                      type="text"
                                      editor={ClassicEditor}
                                      data=""
                                      style={{ minHheight: "400px!important" }}
                                      onReady={(editor) => {
                                        // You can store the "editor" and use when it is needed.
                                      }}
                                      onChange={(event, editor) => {
                                        const data = editor.getData();
                                        SetCourseAdd((prev) => {
                                          return {
                                            ...prev,
                                            description: data,
                                          };
                                        });
                                      }}
                                    />

                                    {CourseError.description && (
                                      <p className="text-danger">
                                        {CourseError.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-12">
                                <div class="mt-30 lbel25">
                                  <label>Language*</label>
                                </div>
                                <select
                                  class="ui hj145 dropdown cntry152 prompt srch_explore"
                                  name="id_language"
                                  onChange={changeCourse}
                                  value={CorurseAdd.id_language}
                                >
                                  <option value="">Select Language</option>
                                  {Language.map((cv, id) => {
                                    return (
                                      <option value={cv.id} key={id}>
                                        {cv.name}
                                      </option>
                                    );
                                  })}
                                </select>
                                <br></br>
                                {CourseError.id_language && (
                                  <p className="text-danger">
                                    {CourseError.id_language}
                                  </p>
                                )}
                              </div>
                              <div class="col-lg-4 col-md-6">
                                <div class="mt-30 lbel25">
                                  <label>Course Category*</label>
                                </div>
                                <select
                                  class="ui hj145 dropdown cntry152 prompt srch_explore"
                                  name="id_category"
                                  onChange={changeCourse}
                                  value={CorurseAdd.id_category}
                                >
                                  <option value="">Select Category</option>
                                  {Categoryops.map((cv, id) => {
                                    return (
                                      <option value={cv.id} key={id}>
                                        {cv.name}
                                      </option>
                                    );
                                  })}{" "}
                                </select>
                                <br></br>
                                {CourseError.id_category && (
                                  <p className="text-danger">
                                    {CourseError.id_category}
                                  </p>
                                )}
                              </div>
                              <div class="col-lg-4 col-md-6">
                                <div class="mt-30 lbel25">
                                  <label>Select Topic*</label>
                                </div>
                                <select
                                  class="ui hj145 dropdown cntry152 prompt srch_explore"
                                  name="id_topic"
                                  onChange={changeCourse}
                                  value={CorurseAdd.id_topic}
                                >
                                  <option value="">Select Topic</option>
                                  {TopicOption.map((cv, id) => {
                                    return (
                                      <option value={cv.id} key={id}>
                                        {cv.name}
                                      </option>
                                    );
                                  })}
                                </select>
                                <br></br>
                                {CourseError.id_topic && (
                                  <p className="text-danger">
                                    {CourseError.id_topic}
                                  </p>
                                )}
                              </div>
                              <div class="col-lg-4 col-md-12">
                                <div class="mt-30 lbel25">
                                  <label>Total Course Duration*</label>
                                </div>
                                <select
                                  class="ui hj145 dropdown cntry152 prompt srch_explore"
                                  name="id_duration"
                                  onChange={changeCourse}
                                  value={CorurseAdd.id_duration}
                                >
                                  <option value="">Select Duration</option>
                                  {Duration.map((cv, id) => {
                                    return (
                                      <option value={cv.id} key={id}>
                                        {cv.name}
                                      </option>
                                    );
                                  })}
                                </select>
                                <br></br>
                                {CourseError.id_duration && (
                                  <p className="text-danger">
                                    {CourseError.id_duration}
                                  </p>
                                )}
                              </div>
                              <div class="col-lg-4 col-md-6">
                                <div class="mt-30 lbel25">
                                  <label>Features*</label>
                                </div>
                                <select
                                  class="ui hj145 dropdown cntry152 prompt srch_explore"
                                  name="id_features"
                                  onChange={changeCourse}
                                  value={CorurseAdd.id_features}
                                >
                                  <option value="">Select Features</option>
                                  {Fetures.map((cv, id) => {
                                    return (
                                      <option value={cv.id} key={id}>
                                        {cv.name}
                                      </option>
                                    );
                                  })}
                                </select>
                                <br></br>
                                {CourseError.id_features && (
                                  <p className="text-danger">
                                    {CourseError.id_features}
                                  </p>
                                )}
                              </div>
                              <div class="col-lg-4 col-md-6">
                                <div class="mt-30 lbel25">
                                  <label>Level*</label>
                                </div>
                                <select
                                  class="ui hj145 dropdown cntry152 prompt srch_explore"
                                  name="id_level"
                                  onChange={changeCourse}
                                  value={CorurseAdd.id_level}
                                >
                                  <option value="">Select Level</option>
                                  {Levelops.map((cv, id) => {
                                    return (
                                      <option value={cv.id} key={id}>
                                        {cv.name}
                                      </option>
                                    );
                                  })}
                                </select>
                                <br></br>
                                {CourseError.id_level && (
                                  <p className="text-danger">
                                    {CourseError.id_level}
                                  </p>
                                )}
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <div class="mt-30 lbel25">
                                  <label>Subtitles*</label>
                                </div>
                                <select
                                  class="ui hj145 dropdown cntry152 prompt srch_explore"
                                  name="id_subtitles"
                                  onChange={changeCourse}
                                  value={CorurseAdd.id_subtitles}
                                >
                                  <option value="">Select Subtitles</option>
                                  {Subtitle.map((cv, id) => {
                                    return (
                                      <option value={cv.id} key={id}>
                                        {cv.name}
                                      </option>
                                    );
                                  })}
                                </select>
                                <br></br>
                                {CourseError.id_subtitles && (
                                  <p className="text-danger">
                                    {CourseError.id_subtitles}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div class="price_course">
                            <div class="row">
                              <div class="col-lg-12">
                                <div class="price_title">
                                  <h4>
                                    <i class="uil uil-dollar-sign-alt"></i>
                                    Pricing
                                  </h4>
                                </div>
                              </div>
                              <div class="col-lg-2 col-md-3 col-sm-6">
                                <div class="mt-30 lbel25">
                                  <label>Course Type*</label>
                                </div>
                                <select
                                  class="ui hj145 dropdown cntry152 prompt srch_explore"
                                  name="id_price"
                                  onChange={changeCourse}
                                  value={CorurseAdd.id_price}
                                >
                                  <option value="">Select Course Type</option>
                                  {PriceOption.map((cv, id) => {
                                    return (
                                      <option value={cv.id} key={id}>
                                        {cv.name}
                                      </option>
                                    );
                                  })}
                                </select>
                                <br></br>
                                {CourseError.id_price && (
                                  <p className="text-danger">
                                    {CourseError.id_price}
                                  </p>
                                )}
                              </div>
                              {Amount == true ? (
                                <>
                                  <div class="col-lg-3 col-md-4 col-sm-6">
                                    <div class="mt-30 lbel25">
                                      <label>Amount</label>
                                    </div>
                                    <div class="ui left icon input swdh19">
                                      <input
                                        class="prompt srch_explore"
                                        type="number"
                                        placeholder="Insert amount"
                                        name="price"
                                        value={CorurseAdd.price}
                                        data-purpose="enter-amount-here"
                                        maxlength="60"
                                        id="amount"
                                        onChange={changeAmount}
                                      />
                                    </div>
                                    <br></br>
                                    {CourseError.price && (
                                      <p className="text-danger">
                                        {CourseError.price}
                                      </p>
                                    )}
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formStep >= 1 && (
                    <div
                      class="section"
                      style={{ display: formStep === 1 ? "block" : "none" }}
                    >
                      <div class="tab-from-content">
                        <div class="title-icon">
                          <h3 class="title">
                            <i class="uil uil-info-circle"></i> Extra
                            Information
                          </h3>
                        </div>
                        <div class="course__form">
                          <div class="general_info10">
                            <div class="row">
                              {requrementiInputList.map((x, i) => {
                                return (
                                  <div class="col-lg-12 col-md-12">
                                    <div class="ui search focus mt-30 lbel25">
                                      <label>Requirements</label>
                                      <div class="ui left icon input swdh19">
                                        <input
                                          class="prompt srch_explore"
                                          type="text"
                                          placeholder="Enter requirements of course."
                                          name="requreinput"
                                          data-purpose="edit-course-title"
                                          maxlength="60"
                                          id="main[title]"
                                          value={x.requreinput}
                                          onChange={(e) =>
                                            handleRequreChange(e, i)
                                          }
                                        />

                                        {requrementiInputList.length !== 1 && (
                                          <div
                                            class="badge_num text-center cursor-pointer"
                                            style={{ cursor: "pointer" }}
                                            title="remove requirement"
                                            onClick={() =>
                                              handleRequreRemoveClick(i)
                                            }
                                          >
                                            <span className="font-weight-bold">
                                              &#x2212;
                                            </span>
                                          </div>
                                        )}
                                        {requrementiInputList.length - 1 ===
                                          i && (
                                          <div
                                            class="badge_num text-center cursor-pointer"
                                            onClick={handlerequreAddClick}
                                            style={{ cursor: "pointer" }}
                                            title="add requirement"
                                          >
                                            <span className="font-weight-bold">
                                              &#43;
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                              {outcomeInputList.map((x, i) => {
                                return (
                                  <div class="col-lg-12 col-md-12">
                                    <div class="ui search focus mt-30 lbel25">
                                      <label>Outcomes</label>
                                      <div class="ui left icon input swdh19">
                                        <input
                                          class="prompt srch_explore"
                                          type="text"
                                          placeholder="Enter outcomes of course."
                                          name="outcomes"
                                          data-purpose="edit-course-title"
                                          maxlength="60"
                                          id="main[title]"
                                          value={x.requreinput}
                                          onChange={(e) =>
                                            handleOutcomeChange(e, i)
                                          }
                                        />

                                        {outcomeInputList.length !== 1 && (
                                          <div
                                            class="badge_num text-center cursor-pointer"
                                            style={{ cursor: "pointer" }}
                                            title="remove outcomes"
                                            onClick={() =>
                                              handleOutcomeRemoveClick(i)
                                            }
                                          >
                                            <span className="font-weight-bold">
                                              &#x2212;
                                            </span>
                                          </div>
                                        )}
                                        {outcomeInputList.length - 1 === i && (
                                          <div
                                            class="badge_num text-center cursor-pointer"
                                            onClick={handleOutcomeAddClick}
                                            style={{ cursor: "pointer" }}
                                            title="add outcome"
                                          >
                                            <span className="font-weight-bold">
                                              &#43;
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                              <div class="col-lg-6 col-md-6">
                                <div class="ui search focus mt-30 lbel25">
                                  <label>Meta Keywords</label>
                                  <div class="ui left icon input swdh19">
                                    <input
                                      class="prompt srch_explore"
                                      type="text"
                                      placeholder="Enter meta keywords of course."
                                      name="meta_keywords"
                                      data-purpose="edit-course-title"
                                      maxlength="60"
                                      id="main[title]"
                                      value={meta.meta_keywords}
                                      onChange={metachange}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <div class="ui search focus mt-30 lbel25">
                                  <label>Meta Description</label>
                                  <div class="ui left icon input swdh19">
                                    <input
                                      type="text"
                                      name="meta_description"
                                      class="prompt p-3"
                                      type="text"
                                      placeholder="Enter meta description of course."
                                      data-purpose="edit-course-title"
                                      id="main[title]"
                                      value={meta.meta_description}
                                      onChange={metachange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formStep >= 2 && (
                    <div
                      class="section"
                      style={{ display: formStep === 2 ? "block" : "none" }}
                    >
                      <div class="tab-from-content">
                        <div class="title-icon">
                          <h3 class="title">
                            <i class="uil uil-image-upload"></i>Media
                          </h3>
                        </div>
                        <div class="course__form">
                          <div class="view_info10">
                            <div class="row">
                              <div class="col-lg-12">
                                <div class="view_all_dt">
                                  <div class="view_img_left">
                                    <div
                                      class="view__img"
                                      style={{
                                        width: "400px",
                                        height: "200px",
                                      }}
                                    >
                                      <img
                                        src={
                                          imges
                                            ? URL.createObjectURL(imges)
                                            : coverimage
                                        }
                                        style={{
                                          objectFit: "cover",
                                          width: "400px",
                                          height: "200px",
                                        }}
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div class="view_img_right">
                                    <h4>Cover Image</h4>
                                    <p>
                                      Upload your course image here. It must
                                      meet our course image quality standards to
                                      be accepted. Important guidelines: 750x422
                                      pixels; .jpg, .jpeg,. gif, or .png. no
                                      text on the image.
                                    </p>
                                    <div class="upload__input">
                                      <div class="input-group">
                                        <div class="custom-file">
                                          <input
                                            type="file"
                                            class="custom-file-input"
                                            id="inputGroupFile04"
                                            name="image"
                                            accept="image/png, image/gif, image/jpeg"
                                            onChange={onChangeImage}
                                          />
                                          <label
                                            class="custom-file-label"
                                            for="inputGroupFile04"
                                          >
                                            {imges.name}
                                          </label>
                                        </div>

                                        <p className="text-danger">
                                          {imageError}
                                        </p>

                                        {errors.image && (
                                          <p className="text-danger">
                                            {errors.image.message}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="view_all_dt">
                                  <div class="view_img_left">
                                    <div
                                      class="view__img"
                                      style={{
                                        width: "400px",
                                        height: "400px",
                                      }}
                                    >
                                      {video ? (
                                        <video controls={true} width="100%">
                                          <source
                                            src={video}
                                            type="video/mp4"
                                          />
                                        </video>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                  <div class="view_img_right">
                                    <h4>Promotional Video</h4>
                                    <p>
                                      Students who watch a well-made promo video
                                      are 5X more likely to enroll in your
                                      course. We've seen that statistic go up to
                                      10X for exceptionally awesome videos.
                                      Learn how to make yours awesome!
                                    </p>
                                    <div class="upload__input">
                                      <div class="input-group">
                                        <div class="custom-file">
                                          <input
                                            type="file"
                                            name="video"
                                            accept="video/mp4,video/x-m4v,video/*"
                                            class="custom-file-input"
                                            id="inputGroupFile05"
                                            onChange={onChangeVideo}
                                          />
                                          <label
                                            class="custom-file-label"
                                            for="inputGroupFile05"
                                          >
                                            {video.slice(57)}
                                          </label>
                                        </div>
                                      </div>
                                      <p className="text-danger">
                                        {videoError}
                                      </p>
                                      <p className="videouplpad text-success animate__animated animate__headShake">
                                        {videoUploadbar
                                          ? `video is uploading ${videoUploadbar} %`
                                          : ""}
                                      </p>
                                      <div className="d-flex justify-content-end mt-2 mr-2">
                                        {videoUploadbar > 1 ? (
                                          <CTooltip content="Cancel uploading">
                                            <CButton
                                              color="primary"
                                              onClick={CancleFileUpladReaquest}
                                              variant="outline"
                                              s
                                            >
                                              X
                                            </CButton>
                                          </CTooltip>
                                        ) : (
                                          ""
                                        )}
                                        {uploadcomplate ? (
                                          <CTooltip content="Remove uploaded video">
                                            <CButton
                                              color="danger"
                                              variant="outline"
                                              onClick={() =>
                                                removeUpload(video)
                                              }
                                            >
                                              <CIcon
                                                size={"sm"}
                                                name={"cilTrash"}
                                              />{" "}
                                            </CButton>
                                          </CTooltip>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {formStep >= 3 && (
                    <div
                      class="section"
                      style={{ display: formStep === 3 ? "block" : "none" }}
                    >
                      <div class="tab-from-content">
                        <div class="title-icon">
                          <h3 class="title">
                            <i class="uil uil-film"></i>Course Content
                          </h3>
                        </div>
                        <div class="course__form">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="extra_info">
                                <h4 class="part__title">New Course Content</h4>
                              </div>
                              <div class="view_info10">
                                <div class="row">
                                  <div class="col-lg-12 col-md-12">
                                    <div class="ui search focus mt-30 lbel25">
                                      <label>Section Name*</label>
                                      <div class="ui left icon input swdh19">
                                        <input
                                          class="prompt srch_explore"
                                          type="text"
                                          placeholder="Insert your course content title."
                                          name="coursetitle"
                                          data-purpose="edit-course-title"
                                          maxlength="60"
                                          id="Content[title]"
                                          type="text"
                                          name="title"
                                          value={SectionTitle.title}
                                          onChange={change}
                                        />
                                        <button
                                          class="badge_mb border-0"
                                          onClick={addSection}
                                        >
                                          Add
                                        </button>
                                      </div>
                                      <p className="text-danger">
                                        {" "}
                                        {sectionerror}
                                      </p>
                                    </div>
                                    {errors.coursetitle && (
                                      <p className="text-danger">
                                        {errors.coursetitle.message}
                                      </p>
                                    )}
                                  </div>
                                  <div class="col-lg-12 col-md-12">
                                    <div class="lecture_title">
                                      <h4>Add Lecture</h4>
                                    </div>
                                  </div>
                                  <div class="col-lg-4 col-md-12">
                                    <div class="ui search focus mt-30 lbel25">
                                      <label>Lecture Title*</label>
                                      <div class="ui left icon input swdh19">
                                        <input
                                          class="prompt srch_explore"
                                          type="text"
                                          placeholder="Insert your lecture title."
                                          name="title"
                                          value={LessonDetail.title}
                                          onChange={lessonchnage}
                                          data-purpose="edit-course-title"
                                          maxlength="60"
                                          id="lecture[title]"
                                        />
                                      </div>
                                      {lessonError.title && (
                                        <p className="text-danger">
                                          {lessonError.title}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div class="col-lg-4 col-md-6">
                                    <div class="ui search focus mt-30 lbel25">
                                      <label>Section*</label>
                                      <div class="ui left icon input swdh19">
                                        <select
                                          class="ui hj145 dropdown cntry152 prompt srch_explore"
                                          onChange={lessonchnage}
                                          name="section_title"
                                          value={LessonDetail.section_title}
                                        >
                                          <option value="">
                                            Select Section
                                          </option>
                                          {SectionData.map((cv, i) => (
                                            <option key={i} value={cv.id}>
                                              {cv.title}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                      {lessonError.section_title && (
                                        <p className="text-danger">
                                          {lessonError.section_title}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div class="col-lg-4 col-md-6">
                                    <div class="ui search focus mt-30 lbel25">
                                      <label>Lesson Type*</label>
                                      <div class="ui left icon input swdh19">
                                        <select
                                          class="ui hj145 dropdown cntry152 prompt srch_explore"
                                          name="lesson_type"
                                          value={Lesson_Type_Option.lesson_type}
                                          onChange={onlessonchange}
                                        >
                                          <option value="0">
                                            Select Lesson Type
                                          </option>
                                          {/* <option value="YouTube_Video">
                                            YouTube Video
                                          </option> */}
                                          {/* <option value="Video_url[.mp4]">
                                            Video url [ .mp4 ]
                                          </option>
                                          <option value="Vimeo_Video">
                                            Vimeo Video
                                          </option> */}
                                          <option value="Video_file">
                                            Video file
                                          </option>
                                          <option value="PDF">PDF</option>
                                          <option value="PPT">PPT</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  {Lesson_Type_Option.lesson_type ===
                                  "Video_file" ? (
                                    <>
                                      <div class="col-lg-6 col-md-6">
                                        <div class="part_input mt-30 lbel25">
                                          <label>Video file*</label>
                                          <div class="input-group">
                                            <div class="custom-file">
                                              <input
                                                type="file"
                                                class="custom-file-input"
                                                id="inputGroupFile06"
                                                onChange={Lessonfile}
                                              />
                                              <label
                                                class="custom-file-label"
                                                for="inputGroupFile06"
                                              >
                                                {lessonVideo.name
                                                  ? lessonVideo.name
                                                  : "Choose file"}
                                                {/* - (Pdf, Video) */}
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="d-flex justify-content-end mt-2 mr-2">
                                          {videoUploadbar > 1 ? (
                                            <CTooltip content="Cancel uploading">
                                              <CButton
                                                onClick={
                                                  LessonCancleFileUpladReaquest
                                                }
                                                color="primary"
                                                variant="outline"
                                              >
                                                X
                                              </CButton>
                                            </CTooltip>
                                          ) : (
                                            ""
                                          )}
                                          {uploadvideocomplate ? (
                                            <CTooltip content="Remove uploaded video">
                                              <CButton
                                                color="danger"
                                                variant="outline"
                                                s
                                                onClick={() =>
                                                  removeUpload(lessonVideo)
                                                }
                                              >
                                                <CIcon
                                                  size={"sm"}
                                                  name={"cilTrash"}
                                                />{" "}
                                              </CButton>
                                            </CTooltip>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                        <p className="error_message animate__animated animate__headShake">
                                          {LessonVideoError}
                                        </p>
                                        <p className="videouplpad animate__animated animate__headShake">
                                          {videoUploadbar
                                            ? `video is uploading ${videoUploadbar} %`
                                            : ""}
                                        </p>
                                        {lessonVideo && (
                                          <video
                                            controls={true}
                                            width="100%"
                                            className="mt-3"
                                            onLoadedMetadata={(e) => {
                                              setMetadata({
                                                duration: e.target.duration,
                                              });
                                            }}
                                          >
                                            <source
                                              src={lessonVideo}
                                              type="video/mp4"
                                            />
                                          </video>
                                        )}
                                      </div>

                                      <div class="col-lg-6 col-md-6">
                                        <div class="part_input mt-30 lbel25">
                                          <label>Supporting Material*</label>
                                          <div class="input-group">
                                            <div class="custom-file">
                                              <input
                                                type="file"
                                                class="custom-file-input"
                                                id="inputGroupFile06"
                                                onChange={OnMeterilChange}
                                                accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint"
                                              />
                                              <label
                                                class="custom-file-label"
                                                for="inputGroupFile06"
                                              >
                                                {material
                                                  ? material.name
                                                  : "Choose file - (Pdf, PPT)"}
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                        <br></br>
                                        {meterialuploadbar > 1 ? (
                                          <div className="d-flex justify-content-end mt-6 mr-2">
                                            <CTooltip content="Cancel uploading">
                                              <CButton
                                                onClick={MaterialRequestCancle}
                                                color="primary"
                                                variant="outline"
                                              >
                                                X
                                              </CButton>
                                            </CTooltip>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        <p className="error_message animate__animated animate__headShake">
                                          {materialError}
                                        </p>
                                        <p className="videouplpad">
                                          {meterialuploadbar
                                            ? `File is uploading ${meterialuploadbar} %`
                                            : ""}
                                        </p>
                                        {materialArray.map((cv, i) => {
                                          return (
                                            <div className="d-flex" key={i}>
                                              <p className="p-2 w-100 ">
                                                {i + 1}
                                                {"."}{" "}
                                                <a href={cv} target="_blank">
                                                  {cv.slice(57)}
                                                </a>{" "}
                                              </p>{" "}
                                              <CButton
                                                color="danger"
                                                onClick={() =>
                                                  deletemeterial(cv, i)
                                                }
                                                className="p-2 flex-shrink-2   border-0"
                                                variant="outline"
                                                shape="square"
                                                size="sm"
                                              >
                                                {" "}
                                                <CIcon
                                                  size={"sm"}
                                                  name={"cilTrash"}
                                                />
                                              </CButton>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                  {Lesson_Type_Option.lesson_type ===
                                  "Video_url[.mp4]" ? (
                                    <>
                                      <div class="col-lg-6 col-md-6">
                                        <div class="ui search focus mt-30 lbel25">
                                          <label>Video URL*</label>
                                          <div class="ui left icon input swdh19">
                                            <input
                                              class="prompt srch_explore"
                                              type="text"
                                              onChange={LessonvideoURL}
                                              placeholder="Enter video .mp4 URL."
                                              name="mp4_url"
                                              value={lessonvideomp4.mp4_url}
                                              data-purpose="edit-course-title"
                                              id="lecture[title]"
                                            />
                                          </div>
                                        </div>
                                        {lessonvideomp4.mp4_url && (
                                          <video
                                            controls={true}
                                            width="100%"
                                            className="mt-3"
                                            onLoadedMetadata={(e) => {
                                              setMetadata({
                                                duration: e.target.duration,
                                              });
                                            }}
                                          >
                                            <source
                                              src={lessonvideomp4.mp4_url}
                                              type="video/mp4"
                                            />
                                          </video>
                                        )}
                                      </div>
                                      <div class="col-lg-6 col-md-6">
                                        <div class="part_input mt-30 lbel25">
                                          <label>Supporting Material*</label>
                                          <div class="input-group">
                                            <div class="custom-file">
                                              <input
                                                type="file"
                                                class="custom-file-input"
                                                id="inputGroupFile06"
                                                onChange={OnMeterilChange}
                                                accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                              />
                                              <label
                                                class="custom-file-label"
                                                for="inputGroupFile06"
                                              >
                                                {material
                                                  ? material.name
                                                  : "Choose file - (Pdf, PPT)"}{" "}
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                        <br></br>
                                        {meterialuploadbar > 1 ? (
                                          <div className="d-flex justify-content-end mt-6 mr-2">
                                            <CTooltip content="Cancel uploading">
                                              <CButton
                                                onClick={MaterialRequestCancle}
                                                color="primary"
                                                variant="outline"
                                              >
                                                X
                                              </CButton>
                                            </CTooltip>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        <p className="error_message animate__animated animate__headShake">
                                          {materialError}
                                        </p>
                                        <p className="videouplpad">
                                          {meterialuploadbar
                                            ? `File is uploading ${meterialuploadbar} %`
                                            : ""}
                                        </p>
                                        {materialArray.map((cv, i) => {
                                          return (
                                            <div className="d-flex" key={i}>
                                              <p className="p-2 w-100 ">
                                                {i + 1}
                                                {"."}{" "}
                                                <a href={cv} target="_blank">
                                                  {cv.slice(57)}
                                                </a>{" "}
                                              </p>{" "}
                                              <CButton
                                                color="danger"
                                                onClick={() =>
                                                  deletemeterial(cv, i)
                                                }
                                                className="p-2 flex-shrink-2   border-0"
                                                variant="outline"
                                                shape="square"
                                                size="sm"
                                              >
                                                {" "}
                                                <CIcon
                                                  size={"sm"}
                                                  name={"cilTrash"}
                                                />
                                              </CButton>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}

                                  <UploadileComponent />
                                  <div class="col-lg-12 col-md-12">
                                    <div class="course_des_textarea mt-30 lbel25">
                                      <label>Description*</label>
                                      <div class="course_des_bg">
                                        <ul class="course_des_ttle">
                                          <li>
                                            <a href="#">
                                              <i class="uil uil-bold"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <i class="uil uil-italic"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <i class="uil uil-list-ul"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <i class="uil uil-left-to-right-text-direction"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <i class="uil uil-right-to-left-text-direction"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <i class="uil uil-list-ui-alt"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <i class="uil uil-link"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <i class="uil uil-text-size"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <i class="uil uil-text"></i>
                                            </a>
                                          </li>
                                        </ul>
                                        <div class="textarea_dt">
                                          <div class="ui form swdh339">
                                            <div class="field">
                                              <textarea
                                                rows="5"
                                                my
                                                course
                                                name="lessondescription"
                                                id="id_part_description"
                                                placeholder="Insert your course part description"
                                                onChange={lessonchnage}
                                                name="description"
                                                value={LessonDetail.description}
                                              ></textarea>
                                            </div>
                                            {lessonError.description && (
                                              <p className="text-danger">
                                                {lessonError.description}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {lessonVideo ? (
                                    <div class="col-lg-5 col-md-6">
                                      <div class="ui search focus mt-30 lbel25">
                                        <label>Volume*</label>
                                        <div class="ui left icon input swdh19 swdh95">
                                          <input
                                            class="prompt srch_explore"
                                            type="number"
                                            min="0"
                                            name="size"
                                            value={(volume / 1048576).toFixed(
                                              2
                                            )}
                                            placeholder="0"
                                          />
                                          <div class="badge_mb">MB</div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {vimeovideo.vimeo_url ? (
                                    <div class="col-lg-5 col-md-6">
                                      <div class="ui search focus mt-30 lbel25">
                                        <label>Duration*</label>
                                        <div class="ui left icon input swdh19 swdh55">
                                          <input
                                            class="prompt srch_explore"
                                            type="text"
                                            min="0"
                                            value={
                                              videoduration
                                                ? new Date(videoduration * 1000)
                                                    .toISOString()
                                                    .substr(11, 8)
                                                : "00:00:00"
                                            }
                                            name="duration"
                                            required=""
                                            placeholder="0"
                                          />
                                          <div class="badge_min">Minutes</div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {lessonvideomp4.mp4_url || lessonVideo ? (
                                    <div class="col-lg-5 col-md-6">
                                      <div class="ui search focus mt-30 lbel25">
                                        <label>Duration*</label>
                                        <div class="ui left icon input swdh19 swdh55">
                                          <input
                                            class="prompt srch_explore"
                                            type="text"
                                            min="0"
                                            value={
                                              metadata.duration
                                                ? new Date(
                                                    metadata.duration * 1000
                                                  )
                                                    .toISOString()
                                                    .substr(11, 8)
                                                : "00:00:00"
                                            }
                                            name="duration"
                                            required=""
                                            placeholder="0"
                                          />
                                          <div class="badge_min">Minutes</div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {/* {
                                      youtuveUrl.youtube_url ? <div class="col-lg-5 col-md-6">
                                        <div class="ui search focus mt-30 lbel25">
                                          <label>Duration*</label>
                                          <div class="ui left icon input swdh19 swdh55">

                                            <input class="prompt srch_explore" type="text" min="0" value={'ff4'} name="duration" required="" placeholder="0" />
                                            <div class="badge_min">Minutes</div>
                                          </div>
                                        </div>
                                      </div> : ''
                                    } */}

                                  <div class="col-lg-2 col-md-12">
                                    <button
                                      class="part_btn_save prt-sv"
                                      type="submit"
                                      onClick={lessonadd}
                                    >
                                      Save Lecture
                                    </button>
                                  </div>
                                  <div class="col-lg-12 col-md-12">
                                    <div class="table-responsive mt-50 mb-0">
                                      <table class="table ucp-table">
                                        <thead class="thead-s">
                                          <tr>
                                            <th class="text-center" scope="col">
                                              Lecture
                                            </th>
                                            <th class="cell-ta">Title</th>
                                            <th class="text-center" scope="col">
                                              Summary
                                            </th>
                                            <th class="text-center" scope="col">
                                              Duration
                                            </th>
                                            {/* <th class="text-center" scope="col">Page</th> */}
                                            <th class="text-center" scope="col">
                                              File
                                            </th>
                                            <th class="text-center" scope="col">
                                              Controls
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {getLessonData.map((cv, i) => {
                                            return (
                                              <tr>
                                                <td class="text-center">
                                                  {i + 1}
                                                </td>
                                                <td class="cell-ta">
                                                  {cv.title}
                                                </td>
                                                <td class="text-center">
                                                  {cv.summary}
                                                </td>
                                                <td class="text-center">
                                                  {cv.duration ===
                                                    "undefined" ||
                                                  cv.duration === "null"
                                                    ? "-"
                                                    : cv.duration}
                                                </td>
                                                <td class="text-center">
                                                  <a
                                                    href={cv.video_url}
                                                    target="_blank"
                                                  >
                                                    {cv.lesson_type
                                                      ? cv.lesson_type
                                                          .split("_")
                                                          .join(" ")
                                                      : ""}
                                                  </a>
                                                </td>

                                                <td class="text-center">
                                                  <span
                                                    onClick={() =>
                                                      EditLesson(cv.id)
                                                    }
                                                    title="Edit"
                                                    class="gray-s"
                                                  >
                                                    <i class="uil uil-edit-alt"></i>
                                                  </span>
                                                  <span
                                                    onClick={() =>
                                                      deleteLessonConfirm(cv.id)
                                                    }
                                                    title="Delete"
                                                    class="gray-s"
                                                  >
                                                    <i class="uil uil-trash-alt"></i>
                                                  </span>
                                                </td>
                                              </tr>
                                            );
                                          })}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div class="col-lg-12 col-md-12">
                                    <div class="save_content">
                                      <button
                                        class="save_content_btn"
                                        onClick={SecndActivationRequest}
                                      >
                                        Send Activation Request
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div class="table-responsive mt-30">
        {/* <table class="table ucp-table" id="content-table">
          <thead class="thead-s">
            <tr>
              <th class="text-center" scope="col">Content</th>
              <th class="cell-ta">Title</th>
              <th class="text-center" scope="col">lectures</th>
              <th class="text-center" scope="col">Volume</th>
              <th class="text-center" scope="col">Duration</th>
              <th class="text-center" scope="col">Upload Date</th>
              <th class="text-center" scope="col">Files</th>
              <th class="text-center" scope="col">Controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">1</td>
              <td class="cell-ta">Course Content Title</td>
              <td class="text-center">5</td>
              <td class="text-center">50</td>
              <td class="text-center">15</td>
              <td class="text-center">6 April 2019</td>
              <td class="text-center"><a href="#">View</a></td>
              <td class="text-center">
                <a href="#" title="Edit" class="gray-s"><i class="uil uil-edit-alt"></i></a>
                <a href="#" title="Delete" class="gray-s"><i class="uil uil-trash-alt"></i></a>
              </td>
            </tr> 
          </tbody>
        </table>
      </div> */}
                      </div>
                    </div>
                  )}

                  {RenderButton()}
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorNewCourse;
