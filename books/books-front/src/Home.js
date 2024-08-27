import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function Home() {


    return (
        <div>
            <div className="s004-img">
                <img src="../logo.png" alt="logo"/>
                <p style={{color:"brown"}}>COFFEE&BOOKS</p>
            </div>
            <div className="s004">
                <form>
                    <fieldset>
                        <legend>¿QUÉ HAY EN TU NEVERA?</legend>
                        <div className="inner-form">
                            <div className="input-field">
                                <ReactSearchAutocomplete className="form-control"
                                                         // items={resultAutocomplete}
                                                         inputDebounce={1}
                                                         // onSearch={handleSearchAutocomplete}
                                                         // onSelect={handleOnSelect}
                                                         resultStringKeyName="titulo"
                                                         fuseOptions={{ keys: ["titulo"] }}
                                                         autoFocus />
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}


