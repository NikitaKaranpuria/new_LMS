import React from "react";

function Step4() {
  return (
    <>
      <div className="tab-from-content">
        <div className="title-icon">
          <h3 className="title">
            <i className="uil uil-file-copy-alt"></i>Extra Information
          </h3>
        </div>
        <div className="course__form">
          <div className="row">
            <div className="col-lg-12">
              <div className="extra_info">
                <h4 className="part__title">Subtitles</h4>
              </div>
              <div className="view_info10">
                <div className="row">
                  <div className="col-md-4">
                    <div className="caption__check mt-30">
                      <div className="ui form">
                        <div className="grouped fields">
                          <div className="ui form checkbox_sign cp_458">
                            <div className="inline field">
                              <div className="ui checkbox mncheck">
                                <input
                                  type="checkbox"
                                  tabindex="0"
                                  className="hidden"
                                />
                                <label>English</label>
                              </div>
                            </div>
                          </div>
                          <div className="ui form checkbox_sign cp_458">
                            <div className="inline field">
                              <div className="ui checkbox mncheck">
                                <input
                                  type="checkbox"
                                  tabindex="0"
                                  className="hidden"
                                />
                                <label>Spanish</label>
                              </div>
                            </div>
                          </div>
                          <div className="ui form checkbox_sign cp_458">
                            <div className="inline field">
                              <div className="ui checkbox mncheck">
                                <input
                                  type="checkbox"
                                  tabindex="0"
                                  className="hidden"
                                />
                                <label>French</label>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Step4;
