

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons'

export default function Book() {

    return (
        <div>
            {/*{recetaResponse &&*/}
                <div className="receta-container">
                    <div className="icons">
                        <FontAwesomeIcon icon={faArrowLeft} color="#FE4A49" onClick={e => {
                            e.preventDefault();
                            // navigate(-1)
                        }}/>
                        <FontAwesomeIcon icon={faHome} color="#FE4A49" onClick={e => {
                            e.preventDefault();
                            // navigate("..")
                        }}/>
                    </div>
                    {/*<h1>{recetaResponse.hits.hits[0]._source.titulo}</h1>*/}
                    {/*<img alt="Imagen de la receta" src={recetaResponse.hits.hits[0]._source.imagen}/>*/}
                    <h2> INGREDIENTES </h2>
                    <div className="ingredientes">
                        {/*{recetaResponse.hits.hits[0]._source.ingredientes.map(ingrediente => {*/}
                            return (
                                {/*<div key={ingrediente} className="ingrediente">*/}
                                {/*    · {ingrediente}*/}
                                {/*</div>*/}
                            )
                        })}
                    </div>
                    <h2> PREPARACION </h2>
                    <div className="preparacion">
                        {/*{recetaResponse.hits.hits[0]._source.pasosPreparacion.map(preparacion => {*/}
                        {/*    return (<div dangerouslySetInnerHTML={{__html: preparacion}}/>)*/}
                        {/*})}*/}
                    </div>
                </div>
            {/*}*/}

        </div>
    );
}