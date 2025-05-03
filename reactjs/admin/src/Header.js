import React, { Component } from "react";
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
               {/*begin::Header*/}
               <div id="kt_header" className="header " data-kt-sticky="true" data-kt-sticky-name="header"
                                data-kt-sticky-offset="{default: '200px', lg: '300px'}">

                                {/*begin::Container*/}
                                <div className=" container-fluid  d-flex align-items-stretch justify-content-between">
                                    {/*begin::Logo bar*/}
                                    <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                                        {/*begin::Aside Toggle*/}
                                        <div className="d-flex align-items-center d-lg-none">
                                            <div className="btn btn-icon btn-active-color-primary ms-n2 me-1 " id="kt_aside_toggle">
                                                <i className="ki-duotone ki-abstract-14 fs-1"><span className="path1"></span><span
                                                    className="path2"></span></i>
                                            </div>
                                        </div>
                                        {/*end::Aside Toggle*/}

                                        {/*begin::Logo*/}

                                        {/*end::Logo*/}
                                    </div>
                                    {/*end::Logo bar*/}

                                    {/*begin::Topbar*/}
                                    <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
                                        {/*begin::Search*/}
                                        <div className="d-flex align-items-stretch flex-grow-1 me-1">
                                            {/*begin::Search*/}
                                            <div id="kt_header_search" className="header-search d-flex align-items-center flex-grow-1"
                                                data-kt-search-keypress="true" data-kt-search-min-length="2" data-kt-search-enter="enter"
                                                data-kt-search-layout="menu" data-kt-search-responsive="lg" data-kt-menu-trigger="auto"
                                                data-kt-menu-permanent="true" data-kt-menu-placement="bottom-start">

                                                {/*begin::Tablet and mobile search toggle*/}
                                                
                                                {/*end::Tablet and mobile search toggle*/}

                                                {/*begin::Form*/}
                                                <form data-kt-search-element="form" className="w-100 position-relative mb-5 mb-lg-0" autoComplete="off">
                                                    <input type="hidden" />

                                                    {/*begin::Icon*/}
                                                    <i className="ki-duotone ki-magnifier search-icon fs-2 text-gray-500 position-absolute top-50 translate-middle-y ms-5">
                                                        <span className="path1"></span><span className="path2"></span>
                                                    </i>
                                                    {/*end::Icon*/}

                                                    {/*begin::Input*/}
                                                    <input type="text" className="search-input form-control form-control-solid ps-13 w-100" name="search"
                                                        placeholder="Search..." data-kt-search-element="input" />
                                                    {/*end::Input*/}

                                                    {/*begin::Spinner*/}
                                                    <span className="search-spinner position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-5"
                                                        data-kt-search-element="spinner">
                                                        <span className="spinner-border h-15px w-15px align-middle text-gray-400"></span>
                                                    </span>
                                                    {/*end::Spinner*/}

                                                    {/*begin::Reset*/}
                                                    <span className="search-reset btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-4"
                                                        data-kt-search-element="clear">
                                                        <i className="ki-duotone ki-cross fs-2 fs-lg-1 me-0"><span className="path1"></span><span className="path2"></span></i>
                                                    </span>
                                                    {/*end::Reset*/}
                                                </form>
                                                {/*end::Form*/}
                                            </div>
                                            {/*end::Search*/}
                                        </div>
                                       {/*end::Search*/}
                                        {/*begin::Toolbar wrapper*/}
                                        <div className="d-flex align-items-stretch flex-shrink-0">
                                            {/*begin::Activities*/}
                                            <div className="d-flex align-items-center ms-1 ms-lg-2">
                                                {/*begin::Drawer toggle*/}

                                            </div>
                                            {/*end::Activities*/}
                                        </div>
                                        {/*end::Toolbar wrapper*/}
                                    </div>
                                    {/*end::Topbar*/}
                                </div>
                                {/*end::Container*/}
                            </div>
                            {/*end::Header*/}
            </>

        );
    }
}