import './App.css';

import React from "react";
import {
    ReactiveBase,
    DataSearch,
    MultiList,
    ReactiveList,
    ResultCard,
    RangeSlider,
    DynamicRangeSlider, DateRange
} from "@appbaseio/reactivesearch";
import logo from './books-logo-brown.png';

function App() {
    return (
        <>
            <ReactiveBase
                app="book"
                credentials="null"
                url="http://localhost:9200"
                // analytics={false}
                // searchStateHeader
                theme={{
                    typography: {
                        fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif',
                        fontSize: "16px",
                    },
                    colors: {
                        textColor: "#212121",
                        backgroundColor: "#B49286",
                        // primaryTextColor: "#593F62",
                        primaryColor: "#C78283",
                        // titleColor: "#212121",
                        // alertColor: "#d9534f",
                        // borderColor: "#666",
                    },
                }}
            >
                <div className="logo-container">
                    <div>
                        <img
                            className="app-logo"
                            src={logo}
                            alt="Coffee & Books"
                        />
                    </div>
                </div>

                <div className="backgroundApp">
                    <div className="searchBar">
                        <DataSearch
                            className=""
                            componentId="searchbox"
                            dataField={[
                                {
                                    "field": "author",
                                    "weight": 3
                                },
                                {
                                    "field": "author.autosuggest",
                                    "weight": 1
                                },
                                {
                                    "field": "name",
                                    "weight": 5
                                },
                                {
                                    "field": "name.autosuggest",
                                    "weight": 1
                                },
                            ]}
                            showCount={true}
                            showSearch={true}
                            placeholder="Search for books or authors"
                        />
                    </div>

                    <div className="container">
                        <div className="left">
                            <div>
                                <div className="searchBoxStyle">
                                    <MultiList
                                        componentId="author-list"
                                        className="authorSearch"
                                        dataField="author"
                                        size={20}
                                        placeholder="Search for an Author"
                                        showCheckbox={true}
                                    />
                                </div>

                                <div className="searchBoxStyle">
                                    <DataSearch
                                        componentId="categorySearch"
                                        dataField="category"
                                        placeholder="Search for categories"
                                    />
                                </div>

                                <div className="searchBoxStyle">
                                    <DateRange
                                        componentId="rangeDates"
                                        dataField="date"
                                        title="Filter by Publication Day Range"
                                    />
                                </div>




                                {/*<DynamicRangeSlider*/}
                                {/*    componentId="rangePages"*/}
                                {/*    dataField="pages"*/}
                                {/*    title="pages"*/}
                                {/*    rangeLabels={(min, max) => (*/}
                                {/*        {*/}
                                {/*            "start": min + " pages",*/}
                                {/*            "end": max + " pages"*/}
                                {/*        }*/}
                                {/*    )}*/}
                                {/*    stepValue={1}*/}
                                {/*/>*/}
                            </div>
                        </div>

                        <div className="right">
                            <ReactiveList
                                componentId="results"
                                dataField="name"
                                size={10}
                                pagination={true}
                                react={{
                                    and: ["searchbox", "categorySearch", "rangeDates", "author-list"]
                                }}
                                style={{textAlign: "center"}}
                                render={({data}) => (
                                    <ReactiveList.ResultCardsWrapper>
                                        {data.map((item) => (
                                            <ResultCard key={item._id}>
                                                <ResultCard.Image
                                                    style={{
                                                        backgroundSize: "cover",
                                                        backgroundImage: `url(${item.linkImage})`
                                                    }}
                                                />
                                                <ResultCard.Title
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.name
                                                    }}
                                                />
                                                <ResultCard.Description>
                                                    <div>
                                                        by {item.author +
                                                        " "}
                                                    </div>
                                                    <div>
                                                        Publicado: {item.date}
                                                    </div>
                                                </ResultCard.Description>

                                                {/*<ResultCard.Categories>*/}
                                                {/*    {item.category.map((i) => i + " ")}*/}
                                                {/*</ResultCard.Categories>*/}

                                                {/*<ResultCard.Author>*/}
                                                {/*    dangerouslySetInnerHTML={{*/}
                                                {/*    __html: item.description*/}
                                                {/*}}*/}
                                                {/*</ResultCard.Author>*/}


                                            </ResultCard>
                                        ))}
                                    </ReactiveList.ResultCardsWrapper>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </ReactiveBase>
        </>
    );
}

export default App;